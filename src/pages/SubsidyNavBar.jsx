import React from "react";
import RiderStep from "@/pages/RiderStep";
import { create } from "zustand";

// Zustand store 管理按鈕狀態
export const useButtonStore = create((set) => ({
  activeButton: "helper", // 'helper' 或 'partner'
  setActiveButton: (button) => set({ activeButton: button }),
}));

const SubsidyNavBar = () => {
  const { activeButton, setActiveButton } = useButtonStore();

  return (
    <>
      {activeButton === "subsiding" ? (
        <RiderStep />
      ) : (
        <div className="flex items-center justify-center ">
          <div className="flex gap-4 mt-[20px] md:mt-[48px]">
            {/* 補助申請按鈕 */}
            <button
              onClick={() => setActiveButton("helper")}
              className={`
             w-[84px] h-[84px] md:h-full md:w-[180px] md:py-[10px] rounded-full font-medium text-sm transition-all duration-200 ease-in-out
            border-2 md:aspect-auto
            ${
              activeButton === "helper"
                ? "bg-cyan-500 text-white text-base font-bold md:text-xl border-cyan-500 shadow-lg "
                : "bg-white text-[#19A4B4] text-base font-bold md:text-xl border-[#19A4B4] shadow-lg "
            }
          `}
            >
              補助申請
            </button>
            <button
              onClick={() => setActiveButton("progressSearch")}
              className={`
             w-[84px] h-[84px] md:h-full md:w-[180px] md:py-[10px] rounded-full font-medium text-sm transition-all duration-200 ease-in-out
            border-2 md:aspect-auto
            ${
              activeButton === "progressSearch"
                ? "bg-cyan-500 text-white text-base font-bold md:text-xl border-cyan-500 shadow-lg "
                : "bg-white text-[#19A4B4] text-base font-bold md:text-xl border-[#19A4B4] shadow-lg "
            }
          `}
            >
              進度查詢
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubsidyNavBar;
