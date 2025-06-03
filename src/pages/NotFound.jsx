import React from "react";
import Notfound from "@/assets/img/notFound.svg";
const TeenSubsidyNotFound = ({ onClick,buttonText="回上一步" }) => {
  return (
    <div className="flex flex-col items-center mt-[40px]   ">
      <img src={Notfound} alt="找不到頁面" className="w-64 h-64 mb-8" />
      <h1 className="text-base font-medium text-[#888888]mb-4">
        目前尚無申請資料或資料尚未同步完成，請稍後再次查詢，或重新確認統編是否正確。
      </h1>

      <button
        onClick={onClick}
        className="bg-teal-500 mt-[60px] hover:bg-teal-600 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-50"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TeenSubsidyNotFound;
