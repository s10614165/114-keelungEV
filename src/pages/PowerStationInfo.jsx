import React, { useEffect } from "react";
import useGoogleSheet from "@/hooks/useGoogleSheet";
const sheetId = import.meta.env.VITE_PowerStation_GogleSheet__ID;
import External_Link from "@/assets/icon/External_Link.png";
import PowerStaionBackround from "@/assets/img/powerStaionBackround.png";
// 摩托車品牌 Logo imports
import AeonmotorLogo from "@/assets/MotorLogo/Aeonmotor.png";
import EmovingLogo from "@/assets/MotorLogo/emoving.jpg";
import EReadyLogo from "@/assets/MotorLogo/eReady.jpg";
import GogoroLogo from "@/assets/MotorLogo/gogoro.png";
import IonexLogo from "@/assets/MotorLogo/ionex.jpg";
import KYMCOLogo from "@/assets/MotorLogo/KYMCO.png";
import PGOLogo from "@/assets/MotorLogo/PGO.png";
import SYMLogo from "@/assets/MotorLogo/SYM.png";
import YAMAHALogo from "@/assets/MotorLogo/YAMAHA.png";
import ZauLogo from "@/assets/MotorLogo/Zau.png";

// Logo 對照表
const logoMap = {
  Aeonmotor: AeonmotorLogo,
  emoving: EmovingLogo,
  eReady: EReadyLogo,
  Gogoro: GogoroLogo,
  ionex: IonexLogo,
  KYMCO: KYMCOLogo,
  PGO: PGOLogo,
  SYM: SYMLogo,
  YAMAHA: YAMAHALogo,
  Zau: ZauLogo,
};

const PowerStationInfo = () => {
  const { data, loading, error } = useGoogleSheet({
    range: "1-2充換電站資訊",
    sheetId,
  });

  useEffect(() => {
    if (loading !== false) {
      return;
    }
    console.log(data);
  }, [data, loading, error]);

  // 處理載入中狀態
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 p-4 md:p-8 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600">載入中...</div>
      </div>
    );
  }

  // 處理錯誤狀態
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 p-4 md:p-8 flex items-center justify-center">
        <div className="text-xl font-medium text-red-600">
          載入失敗：{error.message}
        </div>
      </div>
    );
  }

  // 處理無資料狀態
  if (!data?.values || data.values.length <= 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 p-4 md:p-8 flex items-center justify-center">
        <div className="text-xl font-medium text-gray-600">沒有可用的資料</div>
      </div>
    );
  }

  // 從原始數據中提取品牌資訊（排除標題行）
  const brands = data.values.slice(1).map((row) => ({
    brand: row[1],
    link: row[2],
    id: row[3],
  }));

  return (
    <div className="min-h-screen bg-[#e4fbfb] relative">
      <div className="p-4 md:p-8 pb-0 flex flex-col items-center justify-center ">
        <h1 className="border-t-[8px] pt-[20px] w-[150px] border-[#1b7183] text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
          品牌總覽
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {brands.map((brand) => {
            const logo = logoMap[brand.id];
            const bgColor = "bg-[#36cbda]";

            return (
              <div
                key={brand.id}
                className="relative max-w-[344px]  max-h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {/* 卡片內容 */}
                <div className=" min-h-[244px] flex flex-col items-center justify-center ">
                  {/* Logo 圖片 */}
                  <div className="w-full h-24 md:h-32 flex items-center justify-center">
                    {logo ? (
                      <img
                        src={logo}
                        alt={brand.brand}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        無圖片
                      </div>
                    )}
                  </div>
                </div>

                {/* 底部品牌標籤 */}
                <div
                  className={`${bgColor} relative px-4 py-3 text-white text-sm font-medium`}
                >
                  <span className="block text-center truncate">
                    {brand.brand}
                  </span>
                  <a
                    href={brand.link}
                    rel="blank"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <img
                      src={External_Link}
                      alt="External_Link"
                      className="w-[32px] h-[32px]"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 背景圖片 - 固定在底部 */}
      <div className="relative w-full">
        <img
          src={PowerStaionBackround}
          alt="Power Station Background"
          className="w-full md:h-auto md:object-contain h-40 sm:h-48 object-cover object-top"
        />
      </div>
    </div>
  );
};

export default PowerStationInfo;
