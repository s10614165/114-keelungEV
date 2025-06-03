import React from "react";
import { useButtonStore } from "./SubsidyNavBar";

const KeelungSubsidyInfo = () => {
  const { activeButton, setActiveButton } = useButtonStore();
  
  return (
    <div className="max-w-4xl mx-auto font-bold p-4 md:p-8 bg-white">
      {/* 主要內容段落 */}
      <div className="mb-8">
        <p className="text-gray-800 leading-relaxed text-sm md:text-base mb-6">
          本府為響應聯合國永續發展目標（SDGs）及中央推動的「2050淨零排放」政策，將透過本補助計畫補助多項與電動機車業務相關的項目，包含轉型輔導金、軟硬體設備工具、店面改造及系統營運租賃等營業所需設備，協助本市傳統機車業者轉型為油電合一店，為基隆市打造低碳友善的交通環境，並奠定永續城市建設的堅實基礎。
        </p>

        <p className="text-gray-800 leading-relaxed text-sm md:text-base mb-8">
          依照上開規定，欲提出補捐助申請者，請配合下列事項辦理：
        </p>
      </div>

      {/* 申請資訊 */}
      <ul className="space-y-6 list-none">
        {/* 申請日期 */}
        <li>
          <p className="text-[#198DA1] font-bold text-base md:text-[20px] mb-2">
            • <strong>申請日期</strong>：
          </p>
          <p className="text-gray-800 text-sm md:text-base">
            即日起至114年
            <span className="text-red-600 font-bold">12月15日</span>止。
          </p>
        </li>

        {/* 申請方式 */}
        <li>
          <p className="text-[#198DA1] font-bold text-base md:text-[20px] mb-2">
            • <strong>申請方式</strong>：
          </p>
          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            應於申請期限內完成「線上申請」或「寄送紙本文件」（以郵戳為憑，親自送達者以本府收文登錄日期為憑）。
          </p>
        </li>

        {/* 線上申請 */}
        <li>
          <p className="text-[#198DA1] font-bold text-base md:text-[20px] mb-2">
            • <strong>線上申請</strong>：
          </p>
          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            請於申請截止日內備齊所有應繳付文件，完成下方表單填寫並上傳所有應檢附資料。送出申請後請於平日上班期間來電確認，收件後將會由專人進行審核，待審查通過後將會進行核發撥款作業。
          </p>
        </li>

        {/* 寄送紙本文件 */}
        <li>
          <p className="text-[#198DA1] font-bold text-base md:text-[20px] mb-2">
            • <strong>寄送紙本文件</strong>：
          </p>

          <div className="space-y-4 text-gray-800 text-sm md:text-base leading-relaxed">
            <p>
              <span className="font-medium">1.郵寄：</span>
              (202)基隆市中正區信二路 299 號 4
              樓；「基隆市政府產業發展處產業服務科」收（信封請註明「申請「114
              年度基隆市機車產業輔導綠能轉型產業補助計畫」」）並請於平日上班期間來電確認。(連絡電話：基隆市產業發展處產業服務科
              02-2428-9225)
            </p>

            <p>
              <span className="font-medium">2.自行遞送：</span>於上班日上午 9
              時至下午 5 時遞送至基隆市中正區信二路 299 號4
              樓「基隆市政府產業發展處產業服務科」。
            </p>
          </div>
        </li>
      </ul>

      {/* 更多資訊 */}
      <div className="mt-12">
        <p className="text-gray-800 text-sm md:text-base font-medium mb-4">
          更多詳細資料請上官方公告網站查詢
        </p>

        <div className="space-y-2">
          <div className="flex items-start">
            <span className="text-gray-600 mr-2">🔗</span>
            <div>
              <span className="text-gray-800 text-sm md:text-base">
                詳細補助辦法：
              </span>
              <a
                href="https://www.klcg.gov.tw/tw/economy/2627-296943.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base break-all ml-1"
              >
                https://www.klcg.gov.tw/tw/economy/2627-296943.html
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <span className="text-gray-600 mr-2">🔗</span>
            <div>
              <span className="text-gray-800 text-sm md:text-base">
                友善車行名單：
              </span>
              <a
                href="https://www.klcg.gov.tw/tw/economy/2627-296111.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm md:text-base break-all ml-1"
              >
                https://www.klcg.gov.tw/tw/economy/2627-296111.html
              </a>
            </div>
          </div>

          <div className="flex justify-center my-8">
            <button
              className="bg-[#E69B06] text-white font-bold text-[20px] rounded-full px-8 py-3 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg"
              style={{ width: "220px", height: "50px" }}
              onClick={() => setActiveButton("progressSearch")}
            >
              立即申請補助
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeelungSubsidyInfo;
