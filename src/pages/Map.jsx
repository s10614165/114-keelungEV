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
// 摩托車品牌 Logo imports

import AeonmotorLogo from "@/assets/MotorLogo/icon/Aeonmotor.png";
import EmovingLogo from "@/assets/MotorLogo/icon/emoving.jpg";
import EReadyLogo from "@/assets/MotorLogo/icon/eReady.jpg";
import GogoroLogo from "@/assets/MotorLogo/icon/gogoro.png";
import IonexLogo from "@/assets/MotorLogo/icon/ionex.jpg";
import PGOLogo from "@/assets/MotorLogo/icon/PGO.jpg";
import SYMLogo from "@/assets/MotorLogo/icon/SYM.jpg";
import YAMAHALogo from "@/assets/MotorLogo/icon/YAMAHA.png";
import ZauLogo from "@/assets/MotorLogo/icon/Zau.png";
import IconGoto from "@/assets/icon/icon-goto.svg";
import Iconclock from "@/assets/icon/icon-clock.svg";
import IconCall from "@/assets/icon/icon-call.svg";
import IconLocation from "@/assets/icon/icon-location.svg";
import "@/styles/map.css";

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
        background-color: #75f462;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 3px solid #147e0d;
      ">
        <span style="
          color: #147e0d;
          font-size: ${size * 0.4}px;
          font-weight: bold;
          font-family: Arial, sans-serif;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        ">${count}</span>
      
        </div>
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

  // 車廠品牌選項
  const brandImg = {
    "SYM三陽": SYMLogo,
    "YAMAHA 山葉": YAMAHALogo,
    "eMOVING中華電動二輪": EmovingLogo,
    "eReady台鈴": EReadyLogo,
    "Ionex光陽電動車": IonexLogo,
    "AeonMOTOR宏佳騰": AeonmotorLogo,
    "Zau泓創綠能": ZauLogo,
    "Gogoro睿能": GogoroLogo,
    "PGO 摩特動力": PGOLogo
  };


// 解析基隆市機車行資料
function parseMotorcycleShops(data) {
  const values = data.values;
  // 標題行在 values[1]
  const headers = values[0];
  const rowsData = values.slice(2); // 從第3行開始是資料
  // 找出各欄位的索引
  const indexes = {
    shopName: headers.indexOf("申請單位全名*(I欄)"),
    district: headers.indexOf("所屬行政區*(K欄)"),
    manufacturer: headers.indexOf("車廠品牌*(M欄)"),
    businessHours: headers.indexOf("營業時間"),
    phone: headers.indexOf("連絡電話"),
    address: headers.indexOf("車行登記地址*(N欄)"),
    lat:headers.indexOf("lat"),
    lng:headers.indexOf("lng"),
  };
  console.log(indexes)
  const shops = [];
  const processedShops = new Set(); // 用來追蹤已處理的店家，避免重複

  for (const row of rowsData) {
    // 跳過空資料或明顯是重複標示的資料
    if (
      !row[indexes.shopName] ||// 跳過沒有全名的資料
      !row[indexes.businessHours] || // 跳過沒有營業時間的資料
      !row[indexes.lat] || // 跳過沒有lat的資料
      !row[indexes.lng]  // 跳過沒有lng的資料
    ) {
      continue;
    }

    const shopName = row[indexes.shopName].trim();
    const district = row[indexes.district];
    const businessHours = row[indexes.businessHours];
    const phone = row[indexes.phone] || "";
    const address = row[indexes.address] || "";
    const lat = row[indexes.lat] || "";
    const lng = row[indexes.lng] || "";

    // 製造商處理 - 可能有多個品牌用 \n 分隔
    let manufacturers = [];
    if (row[indexes.manufacturer]) {
      const manufacturerStr = row[indexes.manufacturer];
      if (manufacturerStr.includes(",")) {
        manufacturers = manufacturerStr
          .split(",")
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
        是否顯示營業時間: businessHours !== "N/A",
        lat,
        lng
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

  return shops;
}

// 地圖內容組件
const MapContent = ({ markers, setSelectedShop }) => {
  const map = useMap();
  const [markerClusterer, setMarkerClusterer] = useState(null);
  const markerRefs = useRef([]);

  useEffect(() => {
    if (!map || !window.google) return;


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
        markerContent.style.width = "60px";
        markerContent.style.height = "60px";
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


      // 手動處理叢集點擊事件
      clusterer.addListener("click", (cluster) => {

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
    range: "1.友善車行地圖",
    sheetId,
  });
  const [s_isloading, set_s_isLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [originalMarkers, setOriginalMarkers] = useState([]); // 儲存原始標記數據

  // 使用 shallow 比較訂閱 store
  const { selectedDistricts, selectedBrands } = useStore();

  // 完整的過濾邏輯，處理所有可能的篩選條件組合
  useEffect(() => {
    if (loading !== false) {
      return;
    }

    const shopData = parseMotorcycleShops(data);

    if (shopData && shopData.length > 0) {
      // 直接用 lat/lng 產生 position
      const shopsWithPosition = shopData
        .filter(shop => shop.lat && shop.lng)
        .map(shop => ({
          ...shop,
          position: { lat: parseFloat(shop.lat), lng: parseFloat(shop.lng) }
        }));
      setOriginalMarkers(shopsWithPosition);
      setMarkers(shopsWithPosition);
    }
  }, [data, loading]);

  // 完整的過濾邏輯，處理所有可能的篩選條件組合
  useEffect(() => {
    if (!originalMarkers.length) {
      return;
    }

    // 如果沒有選擇任何過濾條件，顯示所有標記
    if (selectedDistricts.length === 0 && selectedBrands.length === 0) {
      setMarkers(originalMarkers);
      return;
    }

    // 根據選定的條件進行過濾
    const filtered = originalMarkers.filter((marker) => {
      // 檢查地區匹配
      const districtMatch =
        selectedDistricts.length === 0 ||
        selectedDistricts.includes(marker.行政區);

      // 檢查品牌匹配 (如果標記有車廠屬性且是數組)
      const brandMatch =
        selectedBrands.length === 0 ||
        (marker.車廠 &&
          Array.isArray(marker.車廠) &&
          marker.車廠.some((brand) => selectedBrands.includes(brand)));

      // 同時符合地區和品牌條件
      return districtMatch && brandMatch;
    });

    setMarkers(filtered);
  }, [selectedDistricts, selectedBrands, originalMarkers]);

  if (loading || s_isloading) {
    return <Loading extraText="首次加載，會需要較長時間" />;
  }

  if (error) {
    return <PageError />;
  }

  // 按照 Figma 設定的樣式物件 - React 最佳實踐方式
  const containerStyle = {
    width: "98%",
    position: "relative",
    padding: "10px", // 模擬邊框厚度
    background: "linear-gradient(to right, #42E82C 0%, #19A4B4 100%)",
    borderRadius: "20px", // 外層圓角稍大一些
    overflow: "hidden",
  };

  const innerStyle = {
    width: "100%",
    // Inner shadow: X:0, Y:10, Blur:8, Spread:0, Green/400
    boxShadow: "inset 0 2px 8px 0 #42E82C",
    borderRadius: "12px", // 內層圓角
    background: "white",
    overflow: "hidden",
  };
  return (
    <div className="flex justify-center p-4">
      <div style={containerStyle}>
        <div style={innerStyle}>
          <APIProvider apiKey={apiKey} libraries={["marker"]}>
            <Map
              key={`map-${selectedDistricts.join(",")}-${selectedBrands.join(
                ","
              )}`} // 只在篩選條件變化時更新
              mapId="a63bdf028cc2027a683b81f6"
              style={{ height: "70vh", borderRadius: "20px" }}
              defaultCenter={{ lat: 25.13, lng: 121.73 }} // 基隆市中心
              defaultZoom={10} // 合理的初始縮放級別
              gestureHandling={"greedy"}
              disableDefaultUI={false}
              options={{
                minZoom: 7, // 設定最小縮放級別
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
                mapTypeControl: false, // 關閉地圖類型控制項
                
                restriction: {
                  latLngBounds: {
                    north: 25.219,
                    south: 25.076621,
                    east: 121.95,
                    west: 121.602331,
                  },
                  strictBounds: true
                },
              }}
            >
              <MapContent markers={markers} setSelectedShop={setSelectedShop} />

              {/* 資訊視窗 */}
              {selectedShop && (
                <InfoWindow
                  disableAutoPan={false}
                  position={selectedShop.position}
                  pixelOffset={[0, -70]} // 向上偏移 50 像素
                  onCloseClick={() => setSelectedShop(null)}
                  className=" px-4  mb-4 md:px-10   md:pb-4 z-10"
                >
                  <div className=" ">
                    <div>
                    <p>
                        
                        {selectedShop.車廠 && selectedShop.車廠.map((brand, index) => (
                          <img
                            key={index}
                            src={brandImg[brand]}
                            alt={brand}
                            className="object-contain w-[52px] h-[52px] inline-block mr-2"
                          />
                        ))}
                      </p>
                    </div>
                    <h3 className="font-semibold text-[#4F4F4F] text-lg mb-2 mt-2  border-b border-[#E7E7E7] pb-6">
                      {selectedShop.店名}
                    </h3>
                    <div className="space-y-1 text-sm text-[#6D6D6D] mt-6">
                    
                    
                      {selectedShop.是否顯示營業時間 && (
                        <div className="mb-3 text-sm  font-normal text-[#6D6D6D] flex items-center">
                         <img src={Iconclock} alt="營業時間" className="w-5 h-5 mr-2" />
                          {selectedShop.營業時間}
                        </div>
                      )}
                       {selectedShop.地址 && (
                        <div  className="mb-3 text-sm  font-normal text-[#6D6D6D] flex items-center">
                          <img src={IconLocation} alt="地址" className="w-5 h-5 mr-2" />
                          {selectedShop.地址}
                        </div>
                      )}
                      {selectedShop.連絡電話 && (
                        <div className="flex text-sm  font-normal text-[#6D6D6D] items-center">
                          <img src={IconCall} alt="電話" className="w-5 h-5 mr-2" />
                          {selectedShop.連絡電話}
                        </div>
                      )}
                    <div className="flex justify-center mt-6">
                      <a
                        href={selectedShop?.position
                          ? `https://www.google.com/maps/dir/?api=1&destination=${selectedShop.position.lat},${selectedShop.position.lng}`
                          : "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#19A4B4] w-full  justify-center text-base hover:bg-[#2be0e6] transition-colors duration-200 text-white font-bold rounded-full px-4 md:px-10 py-2 flex items-center  shadow-md"
                        style={{
                          letterSpacing: "0.3em",
                          fontFamily: "inherit",
                        }}
                      >
                        立即前往
                        <img src={IconGoto} alt="前往" className="w-3 h-3 ml-2" />
                      </a>
                    </div>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default KLVMap;
