import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import IconSeminar from "@/assets/icon/icon-seminar.svg";
import { Row, Col } from "antd";
import External_Link from "@/assets/icon/External_Link_Black.svg";

import { useState } from "react";
import FooterBgcImg from "@/components/FooterBgcImg";
import { DownloadOutlined } from "@ant-design/icons";
import useGoogleSheet from "@/hooks/useGoogleSheet";
import Loading from "@/components/Loading";
import PageError from "../components/PageError";
const sheetId = import.meta.env.VITE_PowerStation_GogleSheet__ID;
import LeaderShipIcon from "@/assets/icon/icon-leadership.svg";

function Seminar() {
  const { data, loading, error } = useGoogleSheet({
    range: "4-1座談會報名",
    sheetId,
  });

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <PageError />;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle
        icon={LeaderShipIcon}
        iconClassName="w-[40px] h-[40px]"
        title="座談會總覽 "
      />
      <Row gutter={0} className="w-full">
        <Col xs={1} md={3} />
        <Col xs={22} md={18}>
          <div className="w-full bg-white rounded-2xl shadow-xl px-[16px] py-[24px] md:px-[80px] md:py-[37.5px]">
            {Array.isArray(data?.values) && data.values.length > 1 && (
              <ul className="divide-y divide-gray-200">
                {data.values.slice(1).map((row) => (
                  <li key={row[0]} className="flex items-center mt-4 md:mt-8">
                    <a 
                      href={row[3]}
                      rel="blank"
                      target="_blank"
                      className="w-full"
                    >
                      <Row
                        className="w-full pb-3 md:pb-8  transition-colors duration-200"
                        justify={"center"}
                        align={"middle"}
                      >
                        <Col xs={22} md={22}>
                          <Row
                            justify={"center"}
                            align={"middle"}
                            gutter={[0, 10]}
                          >
                            <Col md={1} xs={2}>
                              <img
                                src={IconSeminar}
                                alt="PDF"
                                className="w-[16px] h-[24px] md:w-[24px] md:h-[24px] md:mr-3"
                              />
                            </Col>

                            <Col md={4} xs={22}>
                              <div className="text-[12px] md:text-lg font-bold text-gray-800">
                                {`${row[1]} `}
                              </div>
                            </Col>
                            <Col md={19} xs={24}>
                              <div className="text-[12px] md:text-lg font-bold text-gray-800">
                                {`${row[2]}`}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col xs={2} md={2}>
                          <div className="w-full flex justify-end items-center">
                            <img
                              src={External_Link}
                              alt="External_Link"
                              className="w-[16px] h-[15px] text-[#4F4F4F] md:w-[22px] md:h-[24px]"
                            />
                          </div>
                        </Col>
                      </Row>
                    </a>
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

export default Seminar;
