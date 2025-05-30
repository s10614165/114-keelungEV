import React from "react";
import { Row, Col } from "antd";
import PageTitle from "../components/PageTitle";

export default function ApplicationProgress() {
  return (
    <div className="py-[42px] flex justify-center items-center w-full">
      <div className="w-[80vw] flex justify-center items-center">
        {/* 主要卡片容器 */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 標題區域 */}
          <PageTitle title="申請進度查詢" />
          {/* 業者名稱區域 */}
          <div className="mb-8">
            <div className="flex items-center ">
              <div className="bg-[#198da1] text-white px-10 py-8 border-1 border-solid rounded-l-lg font-medium shadow-2xl">
                業者名稱
              </div>
              <div className="text-[#198DA1] font-medium px-10 py-8 rounded-r-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
                00000000 雅微微一戶市(政治資金募集的有限公司)雅微分公司
              </div>
            </div>
          </div>

          <div className="max-w-full mx-auto mt-4 bg-white">
            <div className="bg-cyan-700 rounded-t-4xl text-white text-center py-3 text-lg font-semibold">
              114年6月
            </div>

            <div className="divide-y border-solid boder-[1px]  shadow-2xl divide-gray-200">
              <div className="flex">
                <div className="bg-[#D4F8F9] text-[#1B7183] px-6 py-8 flex items-center justify-center min-w-[120px]">
                  <h2 className="text-lg font-bold text-center">申請進度</h2>
                </div>
                <div className="flex-1 bg-white px-15 py-6">
                  <div className=" rounded-2xl bg-[#14C200] w-[168px] text-center text-white px-5 py-2.5">
                    已核准 (撥款中)
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="bg-[#D4F8F9] text-[#1B7183] px-6 py-8 flex items-center justify-center min-w-[120px]">
                  <h2 className="text-lg font-bold text-center">申請進度</h2>
                </div>
                <div className="flex-1 bg-white px-15 py-6">8</div>
              </div>
              <div className="flex">
                <div className="bg-[#D4F8F9] text-[#1B7183] px-6 py-8 flex items-center justify-center min-w-[120px]">
                  <h2 className="text-lg font-bold text-center">核准金額</h2>
                </div>
                <div className="flex-1 bg-white px-15 py-6">4800</div>
              </div>
              <div className="flex">
                <div className="bg-[#D4F8F9] text-[#1B7183] px-6 py-8 flex items-center justify-center min-w-[120px]">
                  <h2 className="text-lg font-bold text-center">核銷期限</h2>
                </div>
                <div className="flex-1 bg-white px-15 py-6">
                  請於114年6月、7月、8月之每月1~10日攜帶證明至產發處進行核銷，最晚需於8/10前核銷完畢
                </div>
              </div>
              <div className="flex">
                <div className="bg-[#D4F8F9] text-[#1B7183] px-6 py-8 flex items-center justify-center min-w-[120px]">
                  <h2 className="text-lg font-bold text-center">送件名單</h2>
                </div>
                <div className="flex-1 bg-white px-15 py-6">
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-800">
                      <span className="text-base font-medium">
                        1.仁愛區 陳Ｏ瑩
                      </span>
                    </li>
                    <li className="flex items-center text-gray-800">
                      <span className="text-base font-medium">
                        2.中正區 王Ｏ明
                      </span>
                    </li>
                    <li className="flex items-center text-gray-800">
                      <span className="text-base font-medium">
                        3.中山區 邱Ｏ妤
                      </span>
                    </li>
                    <li className="flex items-center text-gray-800">
                      <span className="text-base font-medium">
                        4.七堵區 張Ｏ威
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-[#d4f8f9] rounded-b-4xl text-white text-center py-1 text-lg font-semibold">
              <div className=" invisible">114年6月</div>
            </div>
          </div>

          {/* 回上一頁按鈕 */}
          <div className="text-center mt-12">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors">
              回上一頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
