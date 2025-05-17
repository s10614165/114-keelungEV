import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Iconapply from "@/assets/icon/icon-apply.png";
import IconCalendar from "@/assets/icon/icon-calendar.png";
import IconHuman from "@/assets/icon/icon-human.png";
import IconList from "@/assets/icon/icon-list.png";
import IconMoney from "@/assets/icon/icon-money.png";
import IconService from "@/assets/icon/icon-service.png";
import { Row, Col } from "antd";
import { useState } from "react";
import FooterBgcImg from "@/components/FooterBgcImg";


function Description() {
  const [activeKeys, setActiveKeys] = useState({
    time: false,
    method: false,
    items: false,
    qualification: false,
    payment: false,
  });

  const handleToggle = (key) => {
    setActiveKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleCollapseAll = () => {
    setActiveKeys({
      time: false,
      method: false,
      items: false,
      qualification: false,
      payment: false,
    });
  };

  const handleExpandAll = () => {
    setActiveKeys({
      time: true,
      method: true,
      items: true,
      qualification: true,
      payment: true,
    });
  };

  const collapseStyle = {
    marginBottom: "12px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "linear-gradient(to bottom, #FFFFFF, #fcfef9)",
  };
  const headerStyle = {
    padding: "24px 50px",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "8px",
    background: "linear-gradient(to bottom, #FFFFFF, #ecfee8)",
    border: "1px solid #f0f0f0",
    fontWeight: "bold",
  };
  const contentStyle = {
    padding: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  };

  const renderCollapseHeader = (icon, text, isActive) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={icon}
          alt={text}
          style={{ width: "24px", height: "24px", marginRight: "40px" }}
        />
        <span>{text}</span>
      </div>
      <span>{isActive ? "-" : "+"}</span>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center pt-[52px]">
      <PageTitle title="規則說明" />

      <Row className="w-full">
        <Col span={3} />
        <Col span={18}>
          <div className="w-full  ">
            <div className="flex justify-end mb-2 text-sm text-teal-600">
              <button onClick={handleCollapseAll} className="mr-2">
                全部收合
              </button>{" "}
              |
              <button onClick={handleExpandAll} className="ml-2">
                全部展開
              </button>
            </div>

            <div className="rounded-lg overflow-hidden">
              {/* 申請時間 */}
              <div style={collapseStyle}>
                <div style={headerStyle} onClick={() => handleToggle("time")}>
                  {renderCollapseHeader(
                    IconCalendar,
                    "申請時間",
                    activeKeys.time
                  )}
                </div>
                {activeKeys.time && (
                  <div style={contentStyle}>
                    <p>申請時間內容...</p>
                  </div>
                )}
              </div>

              {/* 申請方式 */}
              <div style={collapseStyle}>
                <div style={headerStyle} onClick={() => handleToggle("method")}>
                  {renderCollapseHeader(
                    Iconapply,
                    "申請方式",
                    activeKeys.method
                  )}
                </div>
                {activeKeys.method && (
                  <div style={contentStyle}>
                    <p>申請方式內容...</p>
                  </div>
                )}
              </div>

              {/* 補助項目 */}
              <div style={collapseStyle}>
                <div style={headerStyle} onClick={() => handleToggle("items")}>
                  {renderCollapseHeader(IconList, "補助項目", activeKeys.items)}
                </div>
                {activeKeys.items && (
                  <div style={contentStyle}>
                    <p>補助項目內容...</p>
                  </div>
                )}
              </div>

              {/* 補助資格 */}
              <div style={collapseStyle}>
                <div
                  style={headerStyle}
                  onClick={() => handleToggle("qualification")}
                >
                  {renderCollapseHeader(
                    IconHuman,
                    "補助資格",
                    activeKeys.qualification
                  )}
                </div>
                {activeKeys.qualification && (
                  <div style={contentStyle}>
                    <p>補助資格內容...</p>
                  </div>
                )}
              </div>

              {/* 撥款程序 */}
              <div style={collapseStyle}>
                <div
                  style={headerStyle}
                  onClick={() => handleToggle("payment")}
                >
                  {renderCollapseHeader(
                    IconMoney,
                    "撥款程序",
                    activeKeys.payment
                  )}
                </div>
                {activeKeys.payment && (
                  <div style={contentStyle}>
                    <p>撥款程序內容...</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Col>
        <Col span={3} />
      </Row>
      <FooterBgcImg/>
    </div>
  );
}

export default Description;
