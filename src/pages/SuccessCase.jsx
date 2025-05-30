import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { Row, Col } from "antd";
import { useState } from "react";
import FooterBgcImg from "@/components/FooterBgcImg";
import useGoogleSheet from "@/hooks/useGoogleSheet";
import Loading from "@/components/Loading";
import PageError from "../components/PageError";
const sheetId = import.meta.env.VITE_PowerStation_GogleSheet__ID;
import VideoIcon from "@/assets/icon/icon-youtu.svg"; // 請替換為適合的影片圖標

function SuccessCase() {
  const { data, loading, error } = useGoogleSheet({
    range: "5-2成功案例影片",
    sheetId,
  });

  // 提取YouTube影片ID的函數
  const extractYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <PageError />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle
        icon={VideoIcon}
        iconClassName="w-[24px] h-[32px]"
        title="成功案例"
      />

      <Row gutter={0} className="w-full">
        <Col xs={1} md={2} />
        <Col xs={22} md={20}>
          <div className="w-full space-y-8">
            {Array.isArray(data?.values) &&
              data.values.length > 1 &&
              data.values.slice(1).map((row, index) => {
                const videoId = extractYouTubeId(row[3]);
                return (
                  <div
                    key={row[0] || index}
                    className="flex flex-col md:p-[12px] lg:flex-row bg-gradient-to-b from-stone-50 via-55% via-slate-50 to-[#f0feed] rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm border border-white/20"
                  >
                    {/* 影片區域 */}
                    <div className="flex-1">
                      <div className="relative w-full h-[283px] md:h-[283px]">
                        {videoId ? (
                          <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={row[1]}
                            className="absolute top-0 left-0 w-full h-full border-none rounded-2xl "
                            allowFullScreen
                          />
                        ) : (
                          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
                            <span className="text-gray-500">影片載入中...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 內容區域 */}
                    <div className="flex-1 p-6 md:px-[32px] md:py-[14px] flex flex-col ">
                      <h2 className="border-b-[1px] pb-[16px] border-solid border-black text-[14px] md:text-2xl font-bold text-black mb-4 lg:mb-5 leading-relaxed">
                        {row[1]}
                      </h2>

                      {/* 標籤區域 - 可以根據標題自動生成或從數據中提取 */}
                      <div className="flex flex-wrap gap-2 mb-4 lg:mb-5">
                        {row[1].includes("轉型") && (
                          <span className=" text-[#17A50B] border-[2px] border-[#17A50B] border-solid px-3 py-1 rounded-full text-sm font-medium">
                            #產業轉型
                          </span>
                        )}
                        {row[1].includes("技術") && (
                          <span className=" text-[#17A50B] border-[2px] border-[#17A50B] border-solid px-3 py-1 rounded-full text-sm font-medium">
                            #技術升級
                          </span>
                        )}
                        {row[1].includes("油電") && (
                          <span className=" text-[#17A50B] border-[2px] border-[#17A50B] border-solid px-3 py-1 rounded-full text-sm font-medium">
                            #油電合一
                          </span>
                        )}
                        {row[1].includes("留才") && (
                          <span className=" text-[#17A50B] border-[2px] border-[#17A50B] border-solid px-3 py-1 rounded-full text-sm font-medium">
                            #人才培育
                          </span>
                        )}
                      </div>

                      <p className="indent-8 text-gray-600 text-in leading-relaxed text-sm lg:text-base">
                        {row[2]}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </Col>
        <Col xs={1} md={2} />
      </Row>

      <FooterBgcImg />
    </div>
  );
}

export default SuccessCase;
