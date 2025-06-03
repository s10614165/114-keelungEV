import React, { useEffect } from "react";
import useGoogleSheet from "@/hooks/useGoogleSheet";
const sheetId = import.meta.env.VITE_PowerStation_GogleSheet__ID;
import External_Link from "@/assets/icon/External_Link.png";
import FooterBgcImg from "@/components/FooterBgcImg";
// 摩托車品牌 Logo imports
import AeonmotorLogo from "@/assets/MotorLogo/Aeonmotor.svg";
import EmovingLogo from "@/assets/MotorLogo/emoving.svg";
import EReadyLogo from "@/assets/MotorLogo/eReady.svg";
import GogoroLogo from "@/assets/MotorLogo/gogoro.svg";
import IonexLogo from "@/assets/MotorLogo/ionex.svg";
import KYMCOLogo from "@/assets/MotorLogo/KYMCO.svg";
import PGOLogo from "@/assets/MotorLogo/PGO.svg";
import SYMLogo from "@/assets/MotorLogo/SYM.svg";
import YAMAHALogo from "@/assets/MotorLogo/YAMAHA.svg";
import ZauLogo from "@/assets/MotorLogo/Zau.svg";
import PageTitle from "@/components/PageTitle";
import Loading from "../components/Loading";
import PageError from "../components/PageError";
import BrandIcon from "@/assets/icon/icon-brand.svg";

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
    return <Loading />;
  }

  // 處理錯誤狀態
  if (error) {
    return <PageError />;
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
    <div className=" bg-[#e4fbfb] relative">
      {/* 主要內容區塊 */}
      <div className="flex w-full min-h-screen">
        {/* 左側紅色背景 */}
        <div className="hidden md:block w-1/12 "></div>
        {/* 中間內容 */}
        <div className="flex-1 flex flex-col items-center pt-[52px]">
         
          <PageTitle title="品牌總覽" icon={BrandIcon} iconClassName="w-[32px] h-[32px]" />
          <div className="w-full max-w-6xl px-2 md:px-0 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {brands.map((brand) => {
              const logo = logoMap[brand.id];
              const bgColor = "bg-[#36cbda]";
              return (
                <div
                  key={brand.id}
                  className="relative w-full max-w-[344px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group flex flex-col justify-between"
                  onClick={() => {
                    window.open(brand.link, "_blank");
                  }}
                >
                  {/* Logo 圖片 */}
                  <div className="flex items-center justify-center h-[112px] md:h-[244px] w-full bg-white">
                    {logo ? (
                      <img
                        src={logo}
                        alt={brand.brand}
                        className="object-contain max-h-full "
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        無圖片
                      </div>
                    )}
                  </div>
                  {/* 底部品牌標籤 */}
                  <div
                    className={`${bgColor} group-hover:bg-[#26CF13] relative px-4 py-3 text-white  font-medium`}
                  >
                    <span className="block  text-[10px] md:text-[22px] font-bold text-center truncate">
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
                        className="w-[14px] h-[14px] md:w-[32px] md:h-[32px]"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* 右側紅色背景 */}
        <div className="hidden md:block w-1/12 "></div>
      </div>

      {/* 背景圖片 - 固定在底部 */}
      <FooterBgcImg />
    </div>
  );
};

export default PowerStationInfo;
