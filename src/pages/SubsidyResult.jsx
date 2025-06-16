import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { PhoneFilled, SearchOutlined } from "@ant-design/icons";
import LinkButton from "@/components/LinkButton";

const SubsidyResult = ({ onBack, data }) => {
  const [activeTab, setActiveTab] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // 確保 currentData 是有效的陣列，並取得第一個元素
  const currentData = Array.isArray(data) && data.length > 0 ? data[0] : {};

  // Tab 配置
  const tabs = [
    { id: "綠能轉型", name: "綠能轉型", statusKey: "綠能補助 - 申請進度" },
    { id: "留才獎勵", name: "留才獎勵", statusKey: "留才獎勵 - 申請進度" },
    { id: "設備補助", name: "設備補助", statusKey: "設備補助 - 申請進度" },
  ];

  // 判斷 Tab 是否禁用
  const isTabDisabled = (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    return !tab || currentData[tab.statusKey] === "無申請";
  };

  // 判斷是否需要補件
  const needsDocument = (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    return tab && currentData[tab.statusKey] === "需補件";
  };

  // 轉換為民國年格式
  const convertToROCDate = (dateString) => {
    if (!dateString || dateString === "") return "";

    try {
      const date = new Date(dateString);
      const rocYear = date.getFullYear() - 1911;
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${rocYear}/${month}/${day}`;
    } catch {
      return "";
    }
  };

  // 計算核銷期限
  const getDeadlineText = (tabId) => {
    const approvalDate = currentData["函文核准日"];

    if (!approvalDate || approvalDate === "") {
      return "";
    }

    try {
      if (tabId === "留才獎勵") {
        return (
          <div>
            核銷時間為 <span className="text-red-500">114/12/01-114/12/15</span>
            ，請於期限內完成，逾期不予受理
          </div>
        );
      } else if (tabId === "綠能轉型" || tabId === "設備補助") {
        // 函文核准日加60天
        const date = new Date(approvalDate);
        const deadline = new Date(date);
        deadline.setDate(deadline.getDate() + 60);

        // 轉換為民國年
        const rocYear = deadline.getFullYear() - 1911;
        const month = String(deadline.getMonth() + 1).padStart(2, "0");
        const day = String(deadline.getDate()).padStart(2, "0");
        const dateStr = `${rocYear}/${month}/${day}`;

        if (tabId === "綠能轉型") {
          return (
            <div>
              請在<span className="text-red-500">{dateStr}</span>內完成核銷作業
            </div>
          );
        } else {
          // 設備補助
          return `請在${dateStr}內完成核銷作業`;
        }
      }
    } catch {
      return "";
    }

    return "";
  };

  // 取得目前狀態
  const getCurrentStatus = (tabId) => {
    const tab = tabs.find((t) => t.id === tabId);
    console.log(tabs)
    console.log(currentData)
    return tab ? currentData[tab.statusKey] || "" : "";
  };

  // 設定初始的 active tab（選擇第一個非禁用的 tab）
  useEffect(() => {
    if (!isInitialized) {
      const enabledTab = tabs.find((tab) => !isTabDisabled(tab.id));
      if (enabledTab) {
        setActiveTab(enabledTab.id);
        setIsInitialized(true);
      }
    } else {
      // 如果當前選中的 tab 變成禁用狀態，切換到第一個可用的 tab
      if (isTabDisabled(activeTab)) {
        const enabledTab = tabs.find((tab) => !isTabDisabled(tab.id));
        if (enabledTab) {
          setActiveTab(enabledTab.id);
        }
      }
    }
  }, [currentData, isInitialized, activeTab]);

  // 如果沒有資料，顯示提示訊息
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-[90%] md:w-[80%] text-center py-8">
        <div className="text-gray-500">目前沒有資料</div>
        <button
          onClick={onBack}
          className="bg-teal-600 mt-4 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
        >
          回上一頁
        </button>
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-[80%]">
      {/* 業者名稱區域 */}
      <div className="mb-8">
        <div className="text-[#888888] text-xs md:text-base text-center mb-[23px] md:mb-[40px]">
          查詢時間：
          {new Date().toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <div className="flex">
          <div className="bg-[#198da1] text-white flex justify-center items-center px-3  md:py-8 min-w-[78px] md:min-w-[130px] border-1 border-solid rounded-l-lg font-bold shadow-2xl text-[12px] md:text-base">
            <span className="hidden md:inline">業者名稱</span>
            <span className="md:hidden">
              業者
              <br />
              名稱
            </span>
          </div>
          <div className="text-[#198DA1] flex-1 font-bold text-xs md:text-base px-4 py-3 md:px-10 md:py-8 rounded-r-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            {currentData["營利事業統一編碼*"] || ""} {currentData["申請單位全名*"] || ""}
          </div>
        </div>
      </div>

      {/* Tab 區域 */}
      <div className="">
        <div className="flex border-gray-300 rounded-t-lg overflow-hidden">
          {tabs.map((tab) => {
            const isDisabled = isTabDisabled(tab.id);
            const isActive =
              activeTab === tab.id && !isDisabled && activeTab !== "";

            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && setActiveTab(tab.id)}
                disabled={isDisabled}
                className={`flex-1 py-5 px-4 text-center font-extrabold text-sm md:text-xl text-[#198DA1] relative transition-colors ${
                  isDisabled
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : isActive
                    ? "bg-[#F5FA9C] text-[#198DA1]"
                    : "bg-[#eefdfd] text-[#198DA1] "
                }`}
              >
                {tab.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#198DA1]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 內容區域 */}
      {activeTab && (
        <div className=" rounded-[16px] overflow-hidden shadow-xl bg-white">
          <div className="divide-y divide-[#d4f8f9] shadow-2xl ">
            <div className="flex ">
              <div className="bg-[#D4F8F9] text-[#1B7183] px-3 py-2 md:px-6 md:py-8 flex items-center justify-center min-w-[78px] md:min-w-[130px]">
                <h2 className="text-xs md:text-base font-bold text-center">
                  <span className="hidden md:inline">計劃名稱</span>
                  <span className="md:hidden">
                    計劃
                    <br />
                    名稱
                  </span>
                </h2>
              </div>
              <div className="flex-1 bg-white px-6 py-4 font-bold text-xs md:text-base md:px-15 md:py-6">
                產業轉型中請補助-{activeTab}
              </div>
            </div>
            <div className="flex">
              <div className="bg-[#D4F8F9] text-[#1B7183] py-2 md:px-6 md:py-8 flex items-center justify-center min-w-[78px] md:min-w-[130px]">
                <h2 className="text-xs md:text-base font-bold text-center">
                  <span className="hidden md:inline">申請進度</span>
                  <span className="md:hidden">
                    申請
                    <br />
                    進度
                  </span>
                </h2>
              </div>
              <div className="flex-1 flex justify-start items-center bg-white px-6 py-2.5 md:px-15 md:py-6">
                <div
                  className={`rounded-[4px] w-[90%] font-bold text-xs md:text-base md:w-[168px] text-center text-white px-5 py-1 md:py-2.5 ${
                    getCurrentStatus(activeTab) === "審核中"
                      ? "bg-[#2d67e5]"
                      : getCurrentStatus(activeTab) === "已核准(撥款中)"
                      ? "bg-[#14C200]"
                      : getCurrentStatus(activeTab) === "已結案"
                      ? "bg-[#19A4B4]"
                      : getCurrentStatus(activeTab) === "已逾期"
                      ? "bg-[#595959]"
                      : getCurrentStatus(activeTab) === "無申請"
                      ? "bg-[#888888]"
                      : getCurrentStatus(activeTab) === "需補件"
                      ? "bg-[#FFA500]"
                      : "bg-none"
                  }`}
                >
                  {getCurrentStatus(activeTab)}
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="bg-[#D4F8F9] border-solid border-t-[1px]  border-[#d4f8f9] text-[#1B7183] px-3 py-2 md:px-6 md:py-8 flex items-center justify-center min-w-[78px] md:min-w-[130px]">
                <h2 className="text-xs md:text-base font-bold text-left md:text-center">
                  <span className="hidden md:inline">函文核准日</span>
                  <span className="md:hidden">
                    函文
                    <br />
                    核准
                    <br />日
                  </span>
                </h2>
              </div>
              <div className="flex-1 bg-white px-6 py-4 font-bold text-xs md:text-base md:px-15 md:py-6">
                {convertToROCDate(currentData["函文核准日"])}
              </div>
            </div>

            <div className="flex">
              <div className="bg-[#D4F8F9] text-[#1B7183] px-3 py-2 md:px-6 md:py-8 flex items-center justify-center min-w-[78px] md:min-w-[130px]">
                <h2 className="text-xs md:text-base font-bold text-center">
                  <span className="hidden md:inline">核銷期限</span>
                  <span className="md:hidden">
                    核銷
                    <br />
                    期限
                  </span>
                </h2>
              </div>
              <div className="flex-1 bg-white px-6 py-4 flex items-center font-bold text-xs md:text-base md:px-15 md:py-6">
                {getDeadlineText(activeTab)}
              </div>
            </div>

            {/* 需補件時的備註區域 */}
            {needsDocument(activeTab) && (
              <div className="flex">
                <div className="bg-[#D4F8F9] text-[#1B7183]  md:px-6 md:py-8 flex items-center justify-center  min-w-[78px]  md:min-w-[130px]">
                  <h2 className="text-xs md:text-base  font-bold text-center">
                    <span className="hidden md:inline">備註</span>
                    <span className="md:hidden">備註</span>
                  </h2>
                </div>
                <div className="flex-1 bg-white px-6 py-4 md:px-15 md:py-6">
                  <div className="space-y-4">
                    {/* 主標題 */}
                    <h3 className="text-sm md:text-lg font-bold text-gray-800">
                      請依通知攜帶相關資料進行補件
                    </h3>

                    {/* 補件地點標題 */}
                    <h4 className="text-sm md:text-base font-bold text-gray-800 mt-6">
                      【補件地點】
                    </h4>

                    {/* 地點資訊 */}
                    <div className="flex items-start space-x-2">
                      <div className="w-4 h-4 md:w-5 md:h-5 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-full h-full text-[#1B7183]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-xs md:text-sm text-[#1B7183] font-medium">
                        基隆市政府-產業發展處產業服務科
                      </span>
                    </div>

                    {/* 諮詢方式標題 */}
                    <h4 className="text-sm md:text-base font-bold text-gray-800 mt-6">
                      【諮詢方式】
                    </h4>

                    {/* 聯絡方式 */}
                    <div className="space-y-3">
                      {/* 基隆綠能車行補助通 */}
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0">
                          <LinkButton
                            href="https://line.me/R/ti/p/@914kgwbz?oat_content=url&ts=04221721"
                            iconType="sider-line"
                            alt="ig"
                            linkClass="flex gap-4 text-[#1f90a3]"
                          ></LinkButton>
                        </div>
                        <a 
                          href="https://line.me/R/ti/p/@914kgwbz?oat_content=url&ts=04221721"
                          className="text-xs md:text-sm text-[#1B7183] hover:text-[#1f90a3]"
                        >
                          基隆綠能車行補助通
                        </a>
                      </div>

                      {/* 電話聯絡 */}
                      <div className="flex items-center space-x-2">
                        
                          <PhoneFilled rotate={90} style={{ color: '#198da1',fontSize:"16px" }} className="text-[#198da1]"/>
                        
                        <span className="text-xs md:text-sm text-[#1B7183]">
                          02-24289225 廖小姐
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 回上一頁按鈕 */}
      <div className="text-center mt-[17px] md:mt-12">
        <button
          onClick={onBack}
          className="bg-teal-600 mb-[72px] mt-[40px] text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
        >
          回上一頁
        </button>
      </div>
    </div>
  );
};

export default SubsidyResult;
