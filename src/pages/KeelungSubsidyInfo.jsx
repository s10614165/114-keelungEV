import React from "react";
import { useButtonStore } from "./SubsidyNavBar";
import LinkButton from "@/components/LinkButton";
import LineContact from "../components/LineContact";

const KeelungSubsidyInfo = () => {
  const { setActiveButton } = useButtonStore();

  return (
    <div className="max-w-4xl mx-auto font-bold p-4 md:p-8 bg-white">
      {/* 主要內容段落 */}
      <div className="mb-8">
        <p className="text-gray-800 leading-relaxed text-sm md:text-base mb-6">
          本府為落實聯合國永續發展目標（SDGs）及中央推動的「2050淨零轉型」政策，推動本市傳統機車產業升級轉型，透過本補助計畫補助多項與電動機車產業轉型相關項目，包括：綠能轉型補助、留才獎勵補助及設備補助，協助本市車行業者升級店面、改善服務，打造低碳友善的交通環境，提升城市整體營運品質。
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
            • <strong>申請時程</strong>：
          </p>
          <p className="text-gray-800 text-sm md:text-base">
            申請日期：即日起至民國
            <span className="text-red-600 font-bold">114年12月15日</span>止。
          </p>
          <p className="text-gray-800 text-sm md:text-base">
            受理順序：補助經費有限，依申請順序審核通過為準，建議儘早提出申請。
          </p>
        </li>

        {/* 申請方式 */}
        <li>
          <p className="text-[#198DA1] font-bold text-base md:text-[20px] mb-2">
            📝 <strong>申請方式</strong>：
          </p>
          <div className="text-gray-800 text-sm md:text-base leading-relaxed">
            <div className="space-y-4">
              <div>
                <p className="font-bold mb-2">一、線上申請</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>請於申請截止日前，備齊線上應繳附件文件(車行設立登記證明文件、稅額申報書)，完成本網站表單填寫並上傳應繳資料。</li>
                  <li>
                  線上申請後，請於平日上班時間電話聯繫市府窗口確認申請進度。
                  </li>
                  <li>收件後由專人進行審核，審查通過後通知辦理核銷作業，核銷作業須親自至市府現場辦理。</li>
                </ol>
              </div>

              <div>
                <p className="font-bold mb-2">二、紙本申請</p>
                <p className="mb-2">
                  申請人亦可選擇寄送紙本文件，郵寄地址如下：
                </p>
                <p className="mb-2">
                  📬 (202)基隆市中正區信二路299號4樓
                  基隆市政府產業發展處產業服務科
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    信封請註明「申請『114年度基隆市電動機車產業轉型綠能轉型補助計畫』」。
                  </li>
                  <li>郵寄以郵戳為憑，自行送達者以本府收文登錄日期為準。</li>
                  <li>自行送達時間：上午9時至下午5時，送達至上址窗口辦理。</li>
                </ol>
              </div>
            </div>
          </div>
        </li>
        <li>
          <p className="text-[#198DA1] font-bold text-base md:text-[20px] mb-2">
            ⚠️ <strong>後續核銷提醒</strong>：
          </p>
          <div className="text-gray-800 text-sm md:text-base leading-relaxed">
            <div className="space-y-4">
              <div>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                  本網站僅供線上單次申請作業，確認申請資格使用。
                  </li>
                  <li>
                  完成線上申請後，須待市府審核通過，後續核銷流程須由申請人親自攜帶紙本正本文件至市府窗口辦理現場核銷，線上平台不提供核銷作業功能。
                  </li>
                  <li>
                  核銷進度請留意市府通知，或可至進度查詢專區追蹤進度。
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* 更多資訊 */}
      <div className="mt-12">
        <p className="text-gray-800 text-sm md:text-base font-medium mb-4">
          🔗 更多詳細申請資訊請參閱官方公告頁面
        </p>

        <div className="space-y-2">
          <div className="flex items-start">
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
        </div>
      </div>

      <div className="mt-12">
        <p className="text-gray-800 text-sm md:text-base font-medium mb-4">
          📞 聯絡窗口
        </p>
        <div className="space-y-1">
          <p>
            <span className="font-bold">主辦單位</span>
            ｜基隆市政府－產業發展處
          </p>
          <p>
            <span className="font-bold">服務電話</span>
            ｜02-2428-9225 廖小姐
          </p>
         <LineContact/>

       
        </div>
        <div className="mt-12">
          <p className="text-gray-800 text-sm md:text-base font-medium mb-4">
            ⚠️ 重要提醒
          </p>

          <div className="space-y-2">
            本網站僅供「線上單次申請」作業，確認申請資格使用。
            完成線上申請後，須待市府審核通過，後續所有核銷作業（包含文件檢附、現場核銷程序），皆需由申請人親自至市府窗口辦理，線上平台不提供核銷作業功能。
            請申請人務必知悉並配合相關辦理程序。
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center my-8">
            <button
              className="bg-[#E69B06] text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg"
              style={{ width: "220px", height: "50px" }}
              onClick={() => setActiveButton("verify")}
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
