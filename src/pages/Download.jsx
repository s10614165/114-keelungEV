import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import IconPDF from "@/assets/icon/icon-PDF.png";
import { Row, Col } from "antd";

import { useState } from "react";
import FooterBgcImg from "@/components/FooterBgcImg";
import { DownloadOutlined } from "@ant-design/icons";
import useGoogleSheet from "@/hooks/useGoogleSheet";
import Loading from "@/components/Loading";
import PageError from "../components/PageError";
const sheetId = import.meta.env.VITE_PowerStation_GogleSheet__ID;
import DownloadIcon from "@/assets/icon/icon-download.svg";


function Download() {
  const { data, loading, error } = useGoogleSheet({
    range: "3-2申請單據下載",
    sheetId,
  });

  const [s_isDownloading, set_s_IsDownloading] = useState(false);

  const convertToDirectDownloadLink = (driveLink) => {
    // 檢查是否為 Google Drive 連結
    if (driveLink.includes("drive.google.com/file/d/")) {
      // 從連結中提取檔案 ID
      const fileId = driveLink.match(/\/d\/([^\/]+)/);
      if (fileId && fileId[1]) {
        return `https://drive.google.com/uc?export=download&id=${fileId[1]}`;
      }
    }
    return driveLink;
  };

  const handleDownload = async (fileName, fileUrl) => {
    try {
      set_s_IsDownloading(true);
      // 轉換為直接下載連結
      const directDownloadLink = convertToDirectDownloadLink(fileUrl);

      // 創建一個隱藏的 <a> 元素來處理下載
      const link = document.createElement("a");
      link.href = directDownloadLink;
      link.target = "_blank"; // 對於 Google Drive，使用新視窗可能更可靠
      link.download = fileName; // 設置下載檔名

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("下載失敗:", error);
    } finally {
      set_s_IsDownloading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error!==null) {
    return <PageError />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle icon={DownloadIcon} iconClassName="w-[24px] h-[32px]" title="申請單據下載 " />
      <Row gutter={0} className="w-full">
        <Col xs={1} md={3} />
        <Col xs={22} md={18}>
          <div className="w-full bg-white rounded-2xl shadow-xl px-[16px] py-[24px] md:px-[80px] md:py-[37.5px]">
            {Array.isArray(data?.values) && data.values.length > 1 && (
              <ul className="divide-y divide-gray-200 ">
                {data.values.slice(1).map((row) => (
                  <li key={row[0]} className="flex items-center mt-4 md:mt-8">
                    <Row
                      className="w-full pb-3 md:pb-8"
                      justify={"center"}
                      align={"middle"}
                    >
                      <Col md={2} xs={4}>
                        <img
                          src={IconPDF}
                          alt="PDF"
                          className="w-7 h-8 mr-2 md:w-10 md:h-10 md:mr-3"
                        />
                      </Col>
                      <Col
                        md={18}
                        xs={20}
                        className="flex items-center justify-center "
                      >
                        <div className="  text-[12px] md:text-lg font-bold text-gray-800">
                          {row[1]}
                        </div>
                      </Col>
                      <Col md={4} xs={24}>
                        <div className=" w-full flex justify-end items-center">
                          <button
                            loading={s_isDownloading}
                            onClick={() => handleDownload(row[1], row[2])}
                            className="cursor-pointer flex items-center bg-[#0b45c2] hover:bg-blue-700 text-white font-bold py-[5.5px] px-3  rounded-lg shadow transition-colors duration-150 text-sm md:text-base"
                          >
                            下載
                            <DownloadOutlined className="ml-1 md:ml-2 text-lg md:text-xl" />
                          </button>
                        </div>
                      </Col>
                    </Row>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
        <Col xs={1} md={3} />
      </Row>

      <FooterBgcImg />
    </div>
  );
}

export default Download;
