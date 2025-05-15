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

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const sheetId = import.meta.env.VITE_MotorcycleShops_GogleSheet__ID;

// 自定義聚類渲染器
const customRenderer = {
  render: ({ count, position }) => {
    // 根據不同的標記數量設定不同的大小
    const size = count > 50 ? 60 : count > 20 ? 50 : 40;

    // 創建自定義的聚類標記元素
    const div = document.createElement("div");
    div.className = "cluster-marker";
    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.position = "relative";
    div.style.cursor = "pointer";

    // 設定圖標 1 的樣式
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
        <div style="
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        "></div>
        <div style="
          position: absolute;
          top: 5px;
          right: 5px;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
        "></div>
      </div>
    `;

    return new window.google.maps.marker.AdvancedMarkerElement({
      position,
      content: div,
      zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + count,
    });
  },
};

// 解析基隆市機車行資料
function parseMotorcycleShops(data) {
  console.log(data);
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
      row[indexes.address] === "重覆"
    ) {
      continue;
    }

    const shopName = row[indexes.shopName].trim();
    const district = row[indexes.district];
    const businessHours = row[indexes.businessHours] || "";
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
    if (!map || !markers.length || !window.google) return;

    // 清理之前的標記
    markerRefs.current.forEach((marker) => {
      if (marker) {
        marker.map = null;
      }
    });
    markerRefs.current = [];

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
      });

      // 添加點擊事件
      marker.addListener("click", () => {
        setSelectedShop(shop);
      });

      return marker;
    });

    markerRefs.current = newMarkers;

    // 創建或更新聚類器
    if (markerClusterer) {
      markerClusterer.clearMarkers();
      markerClusterer.addMarkers(newMarkers);
    } else {
      const clusterer = new MarkerClusterer({
        markers: newMarkers,
        map: map,
        renderer: customRenderer,
        gridSize: 60,
        maxZoom: 15,
      });
      setMarkerClusterer(clusterer);
    }

    return () => {
      // 清理
      markerRefs.current.forEach((marker) => {
        if (marker) {
          marker.map = null;
        }
      });
      if (markerClusterer) {
        markerClusterer.clearMarkers();
      }
    };
  }, [map, markers, setSelectedShop, markerClusterer]);

  return null;
};

const KLVMap = () => {
  const { data, loading, error } = useGoogleSheet({
    range: "★大表(主要版本)勿動!",
    sheetId,
  });
  const [selectedShop, setSelectedShop] = useState(null);
  const [markers, setMarkers] = useState([]);

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

    if (shopData && shopData.length > 0) {
      // 可以先從本地儲存載入已編碼的數據
      const cachedData = localStorage.getItem("keelungMotorcycleShopsGeodata");

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setMarkers(parsedData);
      } else {
        // 執行地理編碼
        batchGeocode(shopData).then((geocodedShops) => {
          setMarkers(geocodedShops);
          // 儲存到本地以便下次使用
          localStorage.setItem(
            "keelungMotorcycleShopsGeodata",
            JSON.stringify(geocodedShops)
          );
        });
      }
    }
  }, [data, batchGeocode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">載入資料中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-500">載入失敗: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-red-300">
      <APIProvider apiKey={apiKey} libraries={["marker"]}>
        <Map
          mapId="a63bdf028cc2027a683b81f6"
          style={{ height: "50vh" }}
          defaultCenter={{ lat: 25.1283, lng: 121.7415 }} // 基隆市中心
          defaultZoom={1}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
          options={{
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
              strictBounds: true,
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
                  {selectedShop.營業時間 && (
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
