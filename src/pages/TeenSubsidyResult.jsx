import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const TeenSubsidyResult = ({ onBack, data }) => {
  const sortedData =
    [...data]?.sort((a, b) => parseInt(b["月份"]) - parseInt(a["月份"])) || [];

  const [selectedMonth, setSelectedMonth] = useState("");
  const [result, setResult] = useState(sortedData[0] || {});

  // 根據 selectedMonth 取得對應的資料
  const getResult = () => {
    if (!selectedMonth) {
      return sortedData[0] || {}; // 預設顯示第一筆資料
    }
    const [year, month] = selectedMonth.split("年");
    // 移除月份中的"月"字，並確保是數字格式
    const monthNumber = month.replace("月", "");
    console.log("搜尋條件:", { year, monthNumber });
    console.log("當前資料:", sortedData);
    
    const foundResult = sortedData.find(item => {
      const itemMonth = item["月份"].replace("月", "");
      const itemYear = item["年度"].toString();
      console.log("比較:", { 
        itemYear, 
        year, 
        itemMonth, 
        monthNumber,
        isMatch: itemYear === year && itemMonth === monthNumber 
      });
      return itemYear === year && itemMonth === monthNumber;
    });
    
    console.log("找到的結果:", foundResult);
    return foundResult || sortedData[0] || {};
  };

  useEffect(() => {
    const newResult = getResult();
    console.log("更新 result:", newResult);
    setResult(newResult);
  }, [selectedMonth]);

  useEffect(() => {
    if (result && result["月份"]) {
      const year = result["年度"] || "114";
      const month = result["月份"];
      setSelectedMonth(`${year}年${month}`);
    }
  }, [result]);
  console.log(result);
 console.log(sortedData)
  // 計算核銷期限相關日期
  const year = result?.["年度"];
  const month = parseInt(result?.["月份"]);
  const nextMonth1 = month + 1;
  const nextMonth2 = month + 2;
  const nextMonth3 = month + 3;

  // 生成月份選項
  const generateMonthOptions = () => {
    const months = [];

    // 根據 sortedData 生成月份選項
    sortedData.forEach((item) => {
      const year = item["年度"];
      const month = item["月份"];
      months.push({
        value: `${year}年${month}`,
        label: `${year}年${month}`,
      });
    });

    return months;
  };

  const monthOptions = generateMonthOptions();

  const handleChange = (value) => {
    setSelectedMonth(value);
  };

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
          <div className="bg-[#198da1]   text-white flex justify-center items-center py-2  md:py-8   min-w-[78px] md:min-w-[120px]   border-1 border-solid rounded-l-lg font-bold shadow-2xl text-[12px] md:text-base">
            <span className="hidden md:inline">業者名稱</span>
            <span className="md:hidden">
              業者
              <br />
              名稱
            </span>
          </div>
          <div className="text-[#198DA1] flex-1 font-bold text-xs md:text-base px-4 py-3 md:px-10 md:py-8 rounded-r-lg shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            {result?.["營利事業統一編碼*"]} {result?.["申請單位全名*"]}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl  py-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* 搜尋圖示 */}
          <div className="flex-shrink-0">
            <SearchOutlined
              className="text-[#198DA1] text-xl sm:text-2xl"
              style={{ fontSize: "clamp(18px, 4vw, 24px)" }}
            />
          </div>

          {/* 查詢月份文字 */}
          <div className="flex-shrink-0">
            <span className="text-[#198DA1] font-bold text-[14px] md:text-base whitespace-nowrap">
              查詢月份
            </span>
          </div>

          {/* Select 下拉選單 */}
          <div className="flex-grow min-w-0">
            <Select
              value={selectedMonth}
              onChange={handleChange}
              options={monthOptions}
              className="w-full"
              size="large"
              showSearch
              placeholder="請選擇月份"
              filterOption={(input, option) =>
                option?.label?.toLowerCase().includes(input.toLowerCase())
              }
              style={{
                minWidth: "120px",
              }}
              dropdownStyle={{
                maxHeight: 300,
                overflow: "auto",
              }}
            />
          </div>
        </div>
      </div>
      <div className="max-w-full mx-auto mt-4 bg-white">
        <div className="bg-cyan-700 rounded-t-4xl text-white text-center py-3 text-base md:text-xl  font-semibold">
          {result?.["年度"]}年{result?.["月份"]}
        </div>

        <div className="divide-y border-solid boder-[1px] shadow-2xl divide-gray-200">
          <div className="flex">
            <div className="bg-[#D4F8F9] text-[#1B7183]  py-2 md:px-6 md:py-8 flex items-center justify-center min-w-[78px]  md:min-w-[120px]  ">
              <h2 className="text-xs md:text-base  font-bold text-center">
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
                className={`rounded-[4px] w-[90%]  font-bold text-xs md:text-base  md:w-[168px] text-center text-white px-5 py-1 md:py-2.5 ${
                  result?.["申請進度"] === "審核中"
                    ? "bg-[#2d67e5]"
                    : result?.["申請進度"] === "已核准(撥款中)"
                    ? "bg-[#14C200]"
                    : result?.["申請進度"] === "已結案"
                    ? "bg-[#19A4B4]"
                    : result?.["申請進度"] === "已逾期"
                    ? "bg-[#595959]"
                    : "bg-[#14C200]"
                }`}
              >
                {result?.["申請進度"]}
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="bg-[#D4F8F9] text-[#1B7183] px-3 py-2 md:px-6 md:py-8 flex items-center justify-center  min-w-[78px]  md:min-w-[120px]">
              <h2 className="text-xs md:text-base  font-bold text-center">
                <span className="hidden md:inline">核准件數</span>
                <span className="md:hidden">
                  核准
                  <br />
                  件數
                </span>
              </h2>
            </div>
            <div className="flex-1 bg-white px-6 py-4 font-bold text-xs md:text-base md:px-15 md:py-6">
              {result?.["核准總數"]}
            </div>
          </div>
          <div className="flex">
            <div className="bg-[#D4F8F9] text-[#1B7183] px-3 py-2 md:px-6 md:py-8 flex items-center justify-center  min-w-[78px]  md:min-w-[120px]">
              <h2 className="text-xs md:text-base  font-bold text-center">
                <span className="hidden md:inline">核准金額</span>
                <span className="md:hidden">
                  核准
                  <br />
                  金額
                </span>
              </h2>
            </div>
            <div className="flex-1 bg-white px-6 py-4 flex items-center font-bold text-xs md:text-base md:px-15 md:py-6">
              {result?.["核准金額"]}
            </div>
          </div>
          <div className="flex">
            <div className="bg-[#D4F8F9] text-[#1B7183] px-3 py-2 md:px-6 md:py-8 flex items-center justify-center  min-w-[78px]  md:min-w-[120px]">
              <h2 className="text-xs md:text-base  font-bold text-center">
                <span className="hidden md:inline">核銷期限</span>
                <span className="md:hidden">
                  核銷
                  <br />
                  期限
                </span>
              </h2>
            </div>
            <div className="flex-1 text-xs md:text-base font-extrabold bg-white px-6 py-4 md:px-15 md:py-6">
              <div className="">
                請於
                <span className="text-[#198DA1] ">
                  {year}年{nextMonth1}月、{nextMonth2}月、{nextMonth3}
                  月之每月1~10日
                </span>
                攜帶證明至產發處進行核銷，最晚需於
                <span className="text-red-500 ">{nextMonth3}/10</span>
                前核銷完畢
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="bg-[#D4F8F9] text-[#1B7183]  md:px-6 md:py-8 flex items-center justify-center  min-w-[78px]  md:min-w-[120px]">
              <h2 className="text-xs md:text-base  font-bold text-center">
                <span className="hidden md:inline">送件名單</span>
                <span className="md:hidden">
                  送件
                  <br />
                  名單
                </span>
              </h2>
            </div>
            <div className="flex-1 bg-white px-6 py-4 md:px-15 md:py-6">
              <ul className="space-y-3">
                {result?.["送件名單"]?.split(",")?.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-800">
                    <span className="text-xs md:text-base font-bold ">
                      {index + 1}.{item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#d4f8f9] rounded-b-4xl text-white text-center py-1 text-xs md:text-base  font-semibold">
          <div className="invisible">
            {result?.["年度"]}年{result?.["月份"]}
          </div>
        </div>
      </div>
      {/* 回上一頁按鈕 */}
      <div className="text-center mt-[17px] md:mt-12">
        <button
          onClick={onBack}
          className="bg-teal-600 text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors"
        >
          回上一頁
        </button>
      </div>
    </div>
  );
};

export default TeenSubsidyResult;
