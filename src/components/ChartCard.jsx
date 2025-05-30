import React from "react";

const ChartCard = ({ title = "申請進度總覽", chartComponent = null }) => {
  return (
    <div className="w-full   bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 標題區域 */}
      <div className="px-6 py-4 text-center bg-[#76E2EA]">
        <h2 className="text-[#1E4E5B] font-bold text-[15px] md:text-[22px]">
          {title}
        </h2>
      </div>

      {/* 內容區域 */}
      <div className=" bg-white">
        {chartComponent ? (
          <div className="w-full h-full">{chartComponent}</div>
        ) : (
          <div className="text-gray-500 text-center mt-8">申請進度內容區域</div>
        )}
      </div>
    </div>
  );
};

export default ChartCard;
