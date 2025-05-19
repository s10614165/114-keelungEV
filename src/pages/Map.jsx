import React, { useEffect, useState, useCallback, useRef } from "react";
import useGoogleSheet from "@/hooks/useGoogleSheet";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import powerPinImg from "@/assets/img/powerpin.png";
import { useStore } from "@/pages/MapStepSelect";
import Loading from "../components/Loading";
import PageError from "../components/PageError";
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const sheetId = import.meta.env.VITE_MotorcycleShops_GogleSheet__ID;

// 自定義聚類渲染器
const customRenderer = {
  render: ({ count, position, cluster }) => {
    // 根據不同的標記數量設定不同的大小
    const size = count > 50 ? 60 : count > 20 ? 50 : 40;

    // 創建自定義的聚類標記元素
    const div = document.createElement("div");
    div.className = "cluster-marker";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.position = "relative";
    div.style.cursor = "pointer";

    // 設定圖標樣式
    div.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #00E676 0%, #00BFA5 100%);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 3px solid #003D3A;
      ">
        <span style="
          color: #003D3A;
          font-size: ${size * 0.4}px;
          font-weight: bold;
          font-family: Arial, sans-serif;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        ">${count}</span>
      
      </div>
    `;

    const advancedMarker = new window.google.maps.marker.AdvancedMarkerElement({
      position,
      content: div,
      zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count,
    });

    return advancedMarker;
  },
};

// 解析基隆市機車行資料
function parseMotorcycleShops(data) {
  const values = data.values;

  // 標題行在 values[1]
  const headers = values[1];
  const rowsData = values.slice(2); // 從第3行開始是資料

  // 找出各欄位的索引
  const indexes = {
    shopName: headers.indexOf("店名"),
    district: headers.indexOf("行政區"),
    manufacturer: headers.indexOf("車廠"),
    businessHours: headers.indexOf("營業時間"),
    phone: headers.indexOf("連絡電話"),
    address: headers.indexOf("地址"),
  };

  const shops = [];
  const processedShops = new Set(); // 用來追蹤已處理的店家，避免重複

  for (const row of rowsData) {
    // 跳過空資料或明顯是重複標示的資料
    if (
      !row[indexes.shopName] ||
      row[indexes.shopName].includes("重複") ||
      row[indexes.shopName].includes("與") ||
      row[indexes.address] === "重複" ||
      row[indexes.address] === "重覆" ||
      !row[indexes.businessHours] // 跳過沒有營業時間的資料
    ) {
      continue;
    }

    const shopName = row[indexes.shopName].trim();
    const district = row[indexes.district];
    const businessHours = row[indexes.businessHours];
    const phone = row[indexes.phone] || "";
    const address = row[indexes.address] || "";

    // 製造商處理 - 可能有多個品牌用 \n 分隔
    let manufacturers = [];
    if (row[indexes.manufacturer]) {
      const manufacturerStr = row[indexes.manufacturer];
      if (manufacturerStr.includes("\n")) {
        manufacturers = manufacturerStr
          .split("\n")
          .map((m) => m.trim())
          .filter((m) => m);
      } else {
        manufacturers = [manufacturerStr.trim()];
      }
    }

    // 建立唯一識別碼來避免重複（使用店名+地址）
    const uniqueId = `${shopName}_${address}`;

    if (!processedShops.has(uniqueId) && shopName && district) {
      shops.push({
        店名: shopName,
        行政區: district,
        車廠: manufacturers,
        營業時間: businessHours,
        連絡電話: phone,
        地址: address,
        是否顯示營業時間: businessHours !== "N/A"
      });

      processedShops.add(uniqueId);
    }
  }

  // 按照行政區排序
  shops.sort((a, b) => {
    if (a.行政區 === b.行政區) {
      return a.店名.localeCompare(b.店名);
    }
    return a.行政區.localeCompare(b.行政區);
  });
  console.log(shops)
  return shops;
}

// 地圖內容組件
const MapContent = ({ markers, setSelectedShop }) => {
  const map = useMap();
  const [markerClusterer, setMarkerClusterer] = useState(null);
  const markerRefs = useRef([]);

  useEffect(() => {
    if (!map || !window.google) return;

    console.log("MapContent接收到的標記數量:", markers.length);

    // 1. 先移除所有相關元素 (更徹底的清理)
    // 尋找並移除所有標記相關的DOM元素
    const overlays = document.querySelectorAll(
      ".gm-style > div:nth-child(1) > div:nth-child(3) > div"
    );
    overlays.forEach((overlay) => {
      if (overlay) {
        try {
          // 嘗試清除可能的標記元素
          const possibleMarkers = overlay.querySelectorAll(
            "img, div.cluster-marker, gmp-advanced-marker"
          );
          possibleMarkers.forEach((el) => {
            if (el && el.parentNode) {
              el.parentNode.removeChild(el);
            }
          });
        } catch (e) {
          console.error("清理DOM元素時出錯:", e);
        }
      }
    });

    // 2. 清理之前的標記引用
    markerRefs.current.forEach((marker) => {
      if (marker) {
        try {
          marker.map = null;
        } catch (e) {
          console.error("清理標記引用時出錯:", e);
        }
      }
    });
    markerRefs.current = [];

    // 3. 清理聚類器
    if (markerClusterer) {
      try {
        markerClusterer.clearMarkers();
        markerClusterer.setMap(null);
      } catch (e) {
        console.error("清理聚類器時出錯:", e);
      }
      setMarkerClusterer(null);
    }

    // 如果沒有標記，則不創建新的標記
    if (!markers.length) return;

    // 延遲一下再創建新標記，確保清理完成
    setTimeout(() => {
      // 創建新的標記
      const newMarkers = markers.map((shop) => {
        const markerContent = document.createElement("img");
        markerContent.src = powerPinImg;
        markerContent.style.width = "40px";
        markerContent.style.height = "40px";
        markerContent.style.cursor = "pointer";

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          position: shop.position,
          content: markerContent,
          map: map,
          id: shop.店名,
        });

        marker.addListener("gmp-click", () => {
          // 注意這裡改用 gmp-click
          setSelectedShop(shop);
        });

        return marker;
      });

      console.log("創建的新標記數量:", newMarkers.length);
      markerRefs.current = newMarkers;

      // 創建新的聚類器
      const clusterer = new MarkerClusterer({
        markers: [...newMarkers],
        map: map,
        renderer: customRenderer,
        gridSize: 60,
        maxZoom: 15,
        zoomOnClick: false,
      });

      console.log("聚類器創建完成，包含標記數量:", newMarkers.length);

      // 手動處理叢集點擊事件
      clusterer.addListener("click", (cluster) => {
        console.log("Cluster clicked:", cluster);

        const markers = cluster.markers;
        if (!markers || markers.length === 0) return;

        const bounds = new google.maps.LatLngBounds();

        // 計算所有標記的邊界
        markers.forEach((marker) => {
          if (marker.position) {
            bounds.extend(marker.position);
          }
        });

        // 檢查邊界是否有效
        if (bounds.isEmpty()) {
          console.error("Bounds is empty");
          return;
        }

        // 獲取邊界的東北和西南點
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();

        // 計算邊界的大小
        const latDiff = Math.abs(ne.lat() - sw.lat());
        const lngDiff = Math.abs(ne.lng() - sw.lng());

        // 如果邊界太小，手動擴展
        if (latDiff < 0.002 || lngDiff < 0.002) {
          const padding = 0.002;
          bounds.extend(
            new google.maps.LatLng(ne.lat() + padding, ne.lng() + padding)
          );
          bounds.extend(
            new google.maps.LatLng(sw.lat() - padding, sw.lng() - padding)
          );
        }

        // 調整地圖視角
        map.fitBounds(bounds);

        // 確保縮放級別合適
        setTimeout(() => {
          const currentZoom = map.getZoom();
          console.log("Current zoom after fitBounds:", currentZoom);

          // 如果縮放過度，調整到合適的級別
          if (currentZoom > 17) {
            map.setZoom(17);
          } else if (currentZoom < 13 && markers.length < 5) {
            // 如果標記較少且縮放太小，稍微放大
            map.setZoom(15);
          }
        }, 300);
      });

      setMarkerClusterer(clusterer);
    }, 100); // 100毫秒延遲確保DOM更新

    return () => {
      console.log("MapContent清理函數執行");
      markerRefs.current.forEach((marker) => {
        if (marker) {
          try {
            marker.map = null;
          } catch (e) {
            console.error("清理標記時出錯:", e);
          }
        }
      });
      markerRefs.current = [];

      if (markerClusterer) {
        try {
          markerClusterer.clearMarkers();
          markerClusterer.setMap(null);
        } catch (e) {
          console.error("清理聚類器時出錯:", e);
        }
      }
    };
  }, [map, markers]);

  return null;
};

const KLVMap = () => {
  const { data, loading, error } = useGoogleSheet({
    range: "★大表(主要版本)勿動!",
    sheetId,
  });
  const [s_isloading, set_s_isLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [originalMarkers, setOriginalMarkers] = useState([]); // 儲存原始標記數據

  // 使用 shallow 比較訂閱 store
  const { selectedDistricts, selectedBrands } = useStore();

  // 地理編碼函數：將地址轉換為座標
  const geocodeAddress = useCallback(async (address) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      return null;
    } catch (error) {
      console.error("地理編碼錯誤:", error);
      return null;
    }
  }, []);

  // 完整的過濾邏輯，處理所有可能的篩選條件組合
  useEffect(() => {
    console.log(
      "篩選條件變更 - 地區:",
      selectedDistricts,
      "品牌:",
      selectedBrands
    );
    console.log(data);
    if (!originalMarkers.length) {
      console.log("原始標記為空，不執行篩選");
      return;
    }

    // 如果沒有選擇任何過濾條件，顯示所有標記
    if (selectedDistricts.length === 0 && selectedBrands.length === 0) {
      console.log("沒有選擇過濾條件，顯示所有標記");
      setMarkers(originalMarkers);
      return;
    }

    // 根據選定的條件進行過濾
    const filtered = originalMarkers.filter((marker) => {
      // 檢查地區匹配
      const districtMatch =
        selectedDistricts.length === 0 ||
        selectedDistricts.includes(marker.行政區);

        console.log(selectedBrands)
      // 檢查品牌匹配 (如果標記有車廠屬性且是數組)
      const brandMatch =
        selectedBrands.length === 0 ||
        (marker.車廠 &&
          Array.isArray(marker.車廠) &&
          marker.車廠.some((brand) => selectedBrands.includes(brand)));

      // 同時符合地區和品牌條件
      console.log(brandMatch)
      return districtMatch && brandMatch;
    });
    console.log(filtered)
    console.log("篩選前標記數量:", originalMarkers.length);
    console.log("篩選後標記數量:", filtered.length);

    setMarkers(filtered);
  }, [selectedDistricts, selectedBrands, originalMarkers]);

  // 批次處理地理編碼（避免超過 API 限制）
  const batchGeocode = useCallback(
    async (shops) => {
      const geocodedShops = [];
      const batchSize = 5; // 每批處理5個
      const delay = 1000; // 每批之間延遲1秒

      for (let i = 0; i < shops.length; i += batchSize) {
        const batch = shops.slice(i, i + batchSize);

        const promises = batch.map(async (shop) => {
          if (!shop.地址) return null;

          const coordinates = await geocodeAddress(shop.地址);
          if (coordinates) {
            return {
              ...shop,
              position: coordinates,
            };
          }
          return null;
        });

        const results = await Promise.all(promises);
        geocodedShops.push(...results.filter(Boolean));

        // 如果還有更多批次要處理，延遲一下
        if (i + batchSize < shops.length) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      return geocodedShops;
    },
    [geocodeAddress]
  );

  // 當數據載入完成時進行地理編碼
  useEffect(() => {
    if (loading !== false) {
      return;
    }

    const shopData = parseMotorcycleShops(data);
    console.log("解析後的商店數據數量:", shopData.length);

    if (shopData && shopData.length > 0) {
      // 可以先從本地儲存載入已編碼的數據
      const cachedData = localStorage.getItem("keelungMotorcycleShopsGeodata");

      if (cachedData) {
        const parsedCache = JSON.parse(cachedData);
        const now = new Date().getTime();

        // 檢查資料是否過期
        if (now < parsedCache.expiry) {
          // 資料未過期，使用快取資料
          console.log("從緩存加載的標記數量:", parsedCache.data.length);
          setOriginalMarkers(parsedCache.data);
          setMarkers(parsedCache.data);
        } else {
          // 資料已過期，重新獲取地理編碼
          console.log("快取資料已過期，重新獲取地理編碼");
          set_s_isLoading(true);
          batchGeocode(shopData).then((geocodedShops) => {
            console.log("地理編碼後的標記數量:", geocodedShops.length);
            setOriginalMarkers(geocodedShops);
            setMarkers(geocodedShops);

            // 更新快取資料和過期時間
            const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1小時後過期
            localStorage.setItem(
              "keelungMotorcycleShopsGeodata",
              JSON.stringify({
                data: geocodedShops,
                expiry: expirationTime,
              })
            );
            set_s_isLoading(false);
          });
        }
      } else {
        // 無快取資料，執行地理編碼
        set_s_isLoading(true);
        batchGeocode(shopData).then((geocodedShops) => {
          console.log("地理編碼後的標記數量:", geocodedShops.length);
          setOriginalMarkers(geocodedShops);
          setMarkers(geocodedShops);

          // 儲存到本地以便下次使用
          const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1小時後過期
          localStorage.setItem(
            "keelungMotorcycleShopsGeodata",
            JSON.stringify({
              data: geocodedShops,
              expiry: expirationTime,
            })
          );
          set_s_isLoading(false);
        });
      }
    }
  }, [data, batchGeocode, loading, s_isloading]);

  if (loading || s_isloading) {
    return <Loading extraText="首次加載，會需要較長時間" />;
  }

  if (error) {
    return <PageError />;
  }

  return (
    <div className="w-full bg-red-300">
      <div className="mb-2 px-4">
        {/* <p>
          目前顯示: {markers.length} 個標記點 (總共: {originalMarkers.length})
        </p> */}
      </div>
      <APIProvider apiKey={apiKey} libraries={["marker"]}>
        <Map
          key={`map-${selectedDistricts.join(",")}-${selectedBrands.join(",")}`} // 只在篩選條件變化時更新
          mapId="a63bdf028cc2027a683b81f6"
          style={{ height: "100vh" }}
          defaultCenter={{ lat: 25.1283, lng: 121.7415 }} // 基隆市中心
          defaultZoom={12} // 合理的初始縮放級別
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          options={{
            minZoom: 10, // 設定最小縮放級別
            maxZoom: 20, // 設定最大縮放級別
            styles: [
              {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
              {
                featureType: "business",
                elementType: "all",
                stylers: [{ visibility: "off" }],
              },
            ],
            restriction: {
              latLngBounds: {
                north: 25.3, // 最北緯度（上邊界）
                south: 25.0, // 最南緯度（下邊界）
                east: 122.0, // 最東經度（右邊界）
                west: 121.6, // 最西經度（左邊界）
              },
              strictBounds: false, // 改為 false 以允許更靈活的縮放
            },
          }}
        >
          <MapContent markers={markers} setSelectedShop={setSelectedShop} />

          {/* 資訊視窗 */}
          {selectedShop && (
            <InfoWindow
              position={selectedShop.position}
              onCloseClick={() => setSelectedShop(null)}
            >
              <div className="p-3 max-w-xs ">
                <h3 className="font-bold text-lg mb-2">{selectedShop.店名}</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>行政區：</strong>
                    {selectedShop.行政區}
                  </p>
                  <p>
                    <strong>車廠：</strong>
                    {selectedShop.車廠.join(", ")}
                  </p>
                  {selectedShop.是否顯示營業時間 && (
                    <p>
                      <strong>營業時間：</strong>
                      {selectedShop.營業時間}
                    </p>
                  )}
                  {selectedShop.連絡電話 && (
                    <p>
                      <strong>電話：</strong>
                      {selectedShop.連絡電話}
                    </p>
                  )}
                  {selectedShop.地址 && (
                    <p>
                      <strong>地址：</strong>
                      {selectedShop.地址}
                    </p>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default KLVMap;
