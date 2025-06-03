import React from "react";
import { Row, Col, Form } from "antd";
import PageTitle from "../components/PageTitle";
import TeenSubsidyResult from "./TeenSubsidyResult";
const sheetId = import.meta.env.VITE_PowerStation_GogleSheet__ID;
import useGoogleSheetFind from "@/hooks/useGoogleSheetFind";
import SubsidyIntroSearch from "@/assets/img/subsidyIntroSearch.svg";
import Loading from "@/components/Loading";
import PageError from "@/components/PageError";
import Notfound from "@/pages/NotFound";
import KeelungSubsidyInfo from "@/pages/KeelungSubsidyInfo";
import { useButtonStore } from "./SubsidyNavBar";

const title = {
  helper: "產業轉型申請補助說明",
  progressSearch: "申請進度查詢",
  subsiding: "填寫車行基本資料",
};

function SubsidyIntro() {
  const { data, loading, error, refetch, status, cleanToinit } =
    useGoogleSheetFind();

  const { activeButton, setActiveButton } = useButtonStore();
  const [form] = Form.useForm();

  const uniformNumbers_verification = (uniformNumbers) => {
    // 檢查字元是否符合規則
    const regex = /^[0-9]{8}$/;

    // 統一編號 邏輯乘數
    const logicMultipliers = [1, 2, 1, 2, 1, 2, 4, 1];

    // 計算陣列總和
    const sum = (numbers) => {
      const initialValue = 0;
      const sumWithInitial = numbers.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) + Number(currentValue),
        initialValue
      );
      return sumWithInitial;
    };

    if (!uniformNumbers) {
      return "統編未填寫";
    }
    if (uniformNumbers.length !== 8 || !regex.test(uniformNumbers)) {
      return "統編格式不正確";
    }

    let logicProductArr = [];
    let logicProduct = 0;
    // 通一編號倒數第二位為7時，乘積之和最後第二位數取0或1均可，其中之一和能被5整除，則符合統編邏輯
    if (uniformNumbers[6] == "7") {
      for (let i = 0; i < uniformNumbers.length; i++) {
        if (i != 6) {
          logicProductArr.push(
            parseInt(uniformNumbers[i]) * logicMultipliers[i]
          );
        }
      }
    } else {
      for (let i = 0; i < uniformNumbers.length; i++) {
        logicProductArr.push(parseInt(uniformNumbers[i]) * logicMultipliers[i]);
      }
    }

    for (const item of logicProductArr) {
      logicProduct += sum(item.toString().split(""));
    }

    if (
      uniformNumbers[6] === "7" &&
      (logicProduct % 5 === 0 || (logicProduct + 1) % 5 === 0)
    ) {
      return "統編驗證通過";
    } else if (logicProduct % 5 === 0) {
      return "統編驗證通過";
    }

    return "統編驗證失敗";
  };

  const onFinish = (values) => {
    console.log("表單值:", values);
    // 在這裡處理表單提交邏輯
    refetch(values, "findSubsidy");
  };

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <PageError />;
  }
  console.log(status);
  return (
    <div className="py-[42px] flex justify-center items-center w-full">
      <div className=" w-[100vw] md:w-[80vw] flex justify-center items-center">
        {/* 主要卡片容器 */}
        <div className="bg-white flex flex-col items-center w-4/5 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] p-2 pt-[50px] md:p-8">
          {/* 標題區域 */}
          <PageTitle title={title[activeButton]} />

          {activeButton === "subsiding" ? <div>開始聲請的東ㄒ</div> : <></>}

          {activeButton !== "subsiding" && (
            <>
              {activeButton === "helper" ? (
                <KeelungSubsidyInfo />
              ) : status === "404" ? (
                <Notfound
                  onClick={() => {
                    setActiveButton("subsiding");
                  }}
                  buttonText="進行申請"
                />
              ) : (
                <div className="flex w-[90%] md:w-[50%]   justify-center items-center flex-col">
                  <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="w-full"
                  >
                    <Form.Item
                      name="uniformNumbers"
                      label={
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                          申請單位統編
                        </span>
                      }
                      rules={[
                        { required: true, message: "請輸入申請單位統編" },
                        {
                          validator: (_, value) => {
                            const result = uniformNumbers_verification(value);
                            if (result === "統編驗證通過") {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error(result));
                          },
                        },
                      ]}
                    >
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#EBFEE7]"
                        placeholder="請輸入統編"
                      />
                    </Form.Item>

                    <Form.Item
                      name="phone"
                      label={
                        <span style={{ fontSize: "16px", fontWeight: 600 }}>
                          負責人手機號碼
                        </span>
                      }
                      rules={[
                        { required: true, message: "請輸入負責人手機號碼" },
                        {
                          pattern: /^09\d{8}$/,
                          message: "請輸入有效的台灣手機號碼",
                        },
                      ]}
                    >
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#EBFEE7]"
                        placeholder="請輸入手機號碼"
                      />
                    </Form.Item>

                    <Form.Item className="flex justify-center">
                      <button
                        type="submit"
                        className="w-[155px] md:w-[180px]  mt-[40px] bg-[#E69B06] text-white py-2 px-4 rounded-full hover:bg-[#E69B06]/90 transition-colors"
                      >
                        立即查詢
                      </button>
                    </Form.Item>
                  </Form>
                  <div className="mt-8">
                    <img
                      src={SubsidyIntroSearch}
                      alt="搜尋示意圖"
                      className="w-full max-w-md mx-auto"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubsidyIntro;
