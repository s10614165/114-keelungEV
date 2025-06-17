import React, { useEffect } from "react";
import { Form } from "antd";
import PageTitle from "@/components/PageTitle";
import useGoogleSheetFind from "@/hooks/useGoogleSheetFind";
import SubsidyIntroSearch from "@/assets/img/subsidyIntroSearch.svg";
import Loading from "@/components/Loading";
import PageError from "@/components/PageError";
import Notfound from "@/pages/NotFound";
import KeelungSubsidyInfo from "@/pages/KeelungSubsidyInfo";
import { useButtonStore } from "./SubsidyNavBar";
import LineContact from "@/components/LineContact";
import Step1Form from "@/pages/Step1Form";
import SubsidyResult from "@/pages/SubsidyResult";

const UniformNumberForm = ({
  onFinish,
  form,
  showImage = false,
  imageComponent = null,
  submitButtonText = "立即查詢",
  className = "w-[90%] md:w-[60%]",
}) => {
  const uniformNumbers_verification = (uniformNumbers) => {
    const regex = /^[0-9]{8}$/;
    const logicMultipliers = [1, 2, 1, 2, 1, 2, 4, 1];

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

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className={className}
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
              message: "請輸入有效的手機號碼",
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
            className="w-[155px] md:w-[180px] mt-[15px] md:mt-[40px] bg-[#E69B06] text-white py-2 px-4 rounded-full hover:bg-[#E69B06]/90 transition-colors"
          >
            {submitButtonText}
          </button>
        </Form.Item>
      </Form>

      {showImage && imageComponent}
    </>
  );
};

const title = {
  helper: "產業轉型申請補助說明",
  progressSearch: "申請進度查詢",
  verify: "身分驗證",
  step1: "填寫車行基本資料",
  step2: "12356",
  step3: "填寫車行基本資料",
  step4: "填寫車行基本資料",
  step5: "填寫車行基本資料",
};

function SubsidyIntro() {
  const { data, loading, error, refetch, status, cleanToinit } =
    useGoogleSheetFind();

  const { activeButton, setActiveButton } = useButtonStore();
  const [progressForm] = Form.useForm(); // 進度查詢表單
  const [verifyForm] = Form.useForm(); // 身分驗證表單
  const [step1Form] = Form.useForm(); // 步驟1表單

  // 處理進度查詢提交
  const handleProgressSearch = (values) => {
    console.log("進度查詢表單值:", values);
    refetch(values, "findSubsidy");
  };

  // 處理身分驗證提交
  const handleVerifySubmit = (values) => {
    console.log("身分驗證表單值:", values);
    refetch(values, "findSubsidy");
  };

  useEffect(() => {
    if (activeButton === "progressSearch" && status === "404") {
      return;
    }
    if (activeButton === "verify" && status === "404") {
      setActiveButton("step1");
      return;
    }
  }, [status]);

  useEffect(() => {
    if (activeButton !== "verify") {
      cleanToinit();
      return;
    }
  }, [activeButton]);

  if (loading) {
    return <Loading />;
  }

  if (error !== null) {
    return <PageError />;
  }

  return (
    <div className="py-[42px] flex justify-center items-center w-full">
      <div className="w-[100vw] md:w-[80vw] flex justify-center items-center">
        <div className="bg-white flex flex-col items-center w-4/5 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.2)] p-2 pt-[50px] md:p-8">
          <div className={`${activeButton === "step1" ? "hidden" : "block"}`}>
            {/* <div className={``}> */}
            <PageTitle title={title[activeButton]} />
          </div>

          {/* 步驟1表單 */}
          <div className={`${activeButton === "step1" ? "block" : "hidden"}`}>
            {/* <div className={``}> */}
            <Step1Form form={step1Form} />
          </div>

          {/* 404 錯誤頁面 */}
          <div
            className={`${
              activeButton === "progressSearch" && status === "404"
                ? "block"
                : "hidden"
            }`}
          >
            <Notfound
              onClick={() => {
                cleanToinit();
              }}
              buttonText="回上一步"
            />
          </div>

          {/* 其他內容區域 */}
          <div
            className={`${
              activeButton !== "step1" ? "block w-full" : "hidden w-full"
            }`}
          >
            {/* 補助說明 */}
            <div
              className={`${activeButton === "helper" ? "block" : "hidden"}`}
            >
              <KeelungSubsidyInfo />
            </div>

            {/* 申請進度結果 */}
            <div
              className={`${
                activeButton === "progressSearch" && status === "200"
                  ? "block"
                  : "hidden"
              } flex flex-col justify-center items-center`}
            >
              <SubsidyResult
                onBack={() => {
                  cleanToinit();
                }}
                data={data}
              />
            </div>

            {/* 申請進度查詢 */}
            <div
              className={`${
                activeButton === "progressSearch" &&
                status !== "404" &&
                status === ""
                  ? "block"
                  : "hidden"
              } flex flex-col justify-center items-center`}
            >
             
              <div className="  rounded-lg mb-8 w-[90%] md:w-[60%]  ">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📌 核銷文件準備提醒</h3>
                <p className="text-gray-700 leading-relaxed">
                  申請案件經市府審核通過後，須依通知於核銷期限內，攜帶紙本正本文件至市府窗口完成現場核銷程序。請申請人於辦理前，務必先至下載專區下載
                  <a 
                    href="https://drive.google.com/file/d/1FCLEASfvG0nvU5mD2IHujIN4kYRRtmsd/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    【核銷文件自我檢核表】
                  </a>
                  ，確認各項應備資料是否齊全，以加快審核流程，避免資料缺漏。
                </p>
              </div>


           
                
             
              <UniformNumberForm
                form={progressForm}
                onFinish={handleProgressSearch}
                showImage={true}
                imageComponent={
                  <div className="mt-8">
                    <img
                      src={SubsidyIntroSearch}
                      alt="搜尋示意圖"
                      className="w-full max-w-md mx-auto mb-[72px]"
                    />
                  </div>
                }
              />
            </div>

            {/* 身分驗證 */}
            <div
              className={`${
                activeButton === "verify" ? "block" : "hidden"
              } flex flex-col justify-center items-center`}
            >
              <UniformNumberForm
                form={verifyForm}
                onFinish={handleVerifySubmit}
              />

              {/* 驗證成功後的提示訊息 */}
              <div
                className={`${
                  status === "200" && activeButton === "verify"
                    ? "block"
                    : "hidden"
                }`}
              >
                <div className="text-gray-800 text-xs md:text-base text-center leading-relaxed">
                  <div>經查詢該車行已申請過相關計畫</div>
                  <div>請確認輸入資料是否有誤</div>
                  <div>如有問題請洽Line@官方客服諮詢</div>
                </div>
                <LineContact />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubsidyIntro;
