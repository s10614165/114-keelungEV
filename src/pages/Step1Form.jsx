import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Card,
  Radio,
  Space,
  Row,
  Col,
  DatePicker,
  Typography,
  Upload,
  Tooltip,
  Divider,
  InputNumber,
} from "antd";
import { useStepStore } from "@/pages/RiderStep";
import { QuestionCircleOutlined } from "@ant-design/icons";
import TextSample from "@/assets/img/textSample.jpg";
import useGoogleSheetSuply from "@/hooks/useGoogleSheetSuply";
import Loading from "@/components/Loading";
import PageError from "@/components/PageError";

const { Title } = Typography;

const title = {
  1: "填寫車行基本資料",
  2: "相關補助計畫及\n補助類別調查",
  3: "申請補助經費概算及\n相關預期效益",
  4: "上傳基本文件",
  5: "申請成功",
};

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

const PageTitle = ({ title, icon = "", iconClassName = "" }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <h1 className="border-b-[8px] pb-[11px] flex items-center gap-2 md:pb-[16px] w-fit border-[#1b7183] text-[22px] md:text-[32px] font-bold text-center text-[#1B7183] mb-8 whitespace-pre-line">
        {icon !== "" && (
          <img src={icon} alt="icon" className={`${iconClassName}`}></img>
        )}
        {title}
      </h1>
    </div>
  );
};

const CarDealerForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { nextStep, prevStep,setStep } = useStepStore();
  const {
    data,
    loading: googleLoading,
    error,
    refetch,
    status,
    cleanToinit,
  } = useGoogleSheetSuply();

  const [showAdditional, setShowAdditional] = useState(false);
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const [isOtherRental, setIsOtherRental] = useState(false);
  const [isOtherRenovation, setIsOtherRenovation] = useState(false);

  // 在組件掛載時設置初始值
  useEffect(() => {
    if(status === "200"){
      setCurrentStep(5)
      nextStep();

    }
  }, [status]);
  // 在組件掛載時設置初始值
  useEffect(() => {
    form.setFieldsValue({
      greenTransport: "公益青年機車推廣",
      greenTransformation: "100000",
    });
  }, []);

  useEffect(() => {
    if (currentStep === 2) {
      form.setFieldsValue({ ...formData });

      setIsOtherAmount(formData.maintenanceTools === "other");
      setIsOtherRental(formData.maintenanceSystemRental === "other");
      setIsOtherRenovation(formData.storeRenovation === "other");
      setShowAdditional(formData.subsidyStatus === "曾向其他機關提出補助申請");
    }
  }, [currentStep, formData]);

  const onSubsidyStatusChange = (e) => {
    const isApplied = e.target.value === "曾向其他機關提出補助申請";
    setShowAdditional(isApplied);

    if (!isApplied) {
      form.setFieldsValue({ applicationResults: "" });
    }
  };

  // Radio.Group options 配置
  const subsidyStatusOptions = [
    { value: "曾向其他機關提出補助申請", label: "曾向其他機關提出補助申請" },
    { value: "不曾向其他機關申請補助", label: "不曾向其他機關申請補助" },
  ];

  const priorityItemOptions = [
    { value: "已通過，並持有結訓證書", label: "已通過，並持有結訓證書" },
    { value: "未通過，未持有結訓證書", label: "未通過，未持有結訓證書" },
  ];

  const greenTransformationOptions = [{ value: "100000", label: "10萬" }];

  const talentRetentionOptions = [
    { value: "0", label: "不申請" },
    { value: "20000", label: "2萬" },
  ];

  const maintenanceToolsOptions = [
    { value: "0", label: "不申請" },
    { value: "40000", label: "4萬" },
    { value: "other", label: "其他金額(上限4萬)" },
  ];

  const maintenanceSystemRentalOptions = [
    { value: "0", label: "不申請" },
    { value: "10000", label: "1萬" },
    { value: "other", label: "其他金額(上限1萬)" },
  ];

  const storeRenovationOptions = [
    { value: "0", label: "不申請" },
    { value: "30000", label: "3萬" },
    { value: "other", label: "其他金額(上限3萬)" },
  ];

  // 行政區選項
  const districtOptions = [
    { value: "信義區", label: "信義區" },
    { value: "仁愛區", label: "仁愛區" },
    { value: "中正區", label: "中正區" },
    { value: "安樂區", label: "安樂區" },
    { value: "中山區", label: "中山區" },
    { value: "七堵區", label: "七堵區" },
    { value: "暖暖區", label: "暖暖區" },
  ];

  // 車行類型選項
  const shopTypeOptions = [
    { value: "純油車行", label: "純油車行" },
    { value: "油電合一", label: "油電合一" },
    { value: "純電車行", label: "純電車行" },
  ];

  // 車廠品牌選項
  const brandOptions = [
    { value: "SANYANG 三陽", label: "SANYANG 三陽" },
    { value: "YAMAHA 山葉", label: "YAMAHA 山葉" },
    { value: "emoving 中華電動二輪車", label: "emoving 中華電動二輪車" },
    { value: "eReady 台鈴智慧電車", label: "eReady 台鈴智慧電車" },
    { value: "ionex 光陽", label: "光陽電動車 ionex (光陽)" },
    { value: "KYMCO 光陽", label: "KYMCO 光陽" },
    { value: "gogoro", label: "睿能 gogoro" },
    { value: "PGO 摩特動力", label: "PGO 摩特動力" },
    { value: "宏佳騰", label: "宏佳騰機車" },
    { value: "Zau 泓創綠能", label: "Zau 泓創綠能" },
  ];

  const handleNext = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      console.log("表單資料:", values);
      setFormData((prev) => ({
        ...prev,
        ...values,
      }));
      nextStep();
      setCurrentStep((prev) => prev + 1);
      // 自動滾動到頁面頂部
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.log("驗證失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    // 保存當前步驟的表單資料
    const currentValues = form.getFieldsValue();
    setFormData((prev) => ({
      ...prev,
      ...currentValues,
    }));

    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    prevStep();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const finalFormData = {
        ...formData,
        ...values,
        suplyDate: new Date().toISOString(),
      };
      console.log("finalFormData", finalFormData);
      // 使用修改後的 refetch，會自動處理檔案上傳和資料寫入
      await refetch(finalFormData, "getSubsidy");

      // 成功處理
      console.log("申請提交成功！");
    } catch (error) {
      setLoading(false);
      console.error("提交失敗：", error);
    }
  };

  const renderStep1 = () => (
    <Form
      form={form}
      layout="vertical"
      requiredMark="default"
      size="large"
      className="w-[90%] md:w-[80%] text-[16px]"
    >
      {/* 車行基本資料 */}
      <Title level={4} className="mb-6">
        車行基本資料
      </Title>

      <Row gutter={[16, 0]}>
        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">申請單位全名 </span>}
            name="company"
            rules={[{ required: true, message: "請輸入申請單位全名" }]}
          >
            <Input placeholder="請輸入申請單位全名" />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">營利事業統一編碼</span>}
            name="taxId"
            rules={[
              { required: true, message: "請輸入營利事業統一編碼" },
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
            <Input placeholder="請輸入8位數統一編號" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 0]}>
        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">所屬行政區</span>}
            name="district"
            rules={[{ required: true, message: "請選擇所屬行政區" }]}
          >
            <Select placeholder="請選擇行政區" options={districtOptions} />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">車行類型</span>}
            name="shop"
            rules={[{ required: true, message: "請選擇車行類型" }]}
          >
            <Select placeholder="請選擇車行類型" options={shopTypeOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<span className="text-base">車廠品牌 (可複選)</span>}
        name="brand"
        rules={[{ required: true, message: "請至少選擇一個車廠品牌" }]}
      >
        <Checkbox.Group
          options={brandOptions}
          className="w-full grid grid-cols-2 gap-2"
          style={{ fontSize: "16px" }}
        />
      </Form.Item>

      <Form.Item
        label={<span className="text-base">車行登記地址</span>}
        name="regAddress"
        rules={[{ required: true, message: "請輸入車行登記地址" }]}
      >
        <Input placeholder="請輸入完整登記地址" />
      </Form.Item>

      <Form.Item
        label={<span className="text-base">車行通訊地址</span>}
        name="commAddress"
        rules={[{ required: true, message: "請輸入車行通訊地址" }]}
      >
        <Input placeholder="請輸入完整通訊地址" />
      </Form.Item>

      <Form.Item
        label={<span className="text-base">車行設立日期</span>}
        name="estDate"
        rules={[{ required: true, message: "請選擇車行設立日期" }]}
      >
        <DatePicker
          className="w-full"
          placeholder="請選擇設立日期"
          format="YYYY/MM/DD"
        />
      </Form.Item>

      {/* 人員基本資料 */}
      <div className="mt-10">
        <PageTitle title={"人員基本資料"} />
      </div>

      <Row gutter={[16, 0]}>
        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">負責人姓名</span>}
            name="ownerName"
            rules={[{ required: true, message: "請輸入負責人姓名" }]}
          >
            <Input placeholder="請輸入負責人姓名" />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">負責人連絡手機/市話</span>}
            name="ownerPhone"
            rules={[
              { required: true, message: "請輸入負責人聯絡電話" },
              {
                pattern: /^09\d{8}$/,
                message: "請輸入有效的手機號碼",
              },
            ]}
          >
            <Input placeholder="例：0912345678" />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">負責人Email</span>}
            name="ownerEmail"
            rules={[
              { required: true, message: "請輸入負責人Email" },
              { type: "email", message: "Email格式不正確" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 0]}>
        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">聯絡人姓名</span>}
            name="contactName"
            rules={[{ required: true, message: "請輸入聯絡人姓名" }]}
          >
            <Input placeholder="請輸入聯絡人姓名" />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">聯絡人連絡手機/市話</span>}
            name="contactPhone"
            rules={[
              { required: true, message: "請輸入聯絡人電話" },
              {
                pattern: /^09\d{8}$/,
                message: "請輸入有效的手機號碼",
              },
            ]}
          >
            <Input placeholder="例：0912345678" />
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">聯絡人Email</span>}
            name="contactEmail"
            rules={[
              { required: true, message: "請輸入聯絡人Email" },
              { type: "email", message: "Email格式不正確" },
            ]}
          >
            <Input placeholder="example@email.com" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const renderStep2 = () => (
    <Form
      form={form}
      layout="vertical"
      requiredMark="default"
      size="large"
      className="w-[90%] md:w-[70%] text-[16px] "
    >
      <div className="mb-6 text-base">
        <h3 className="text-red-500 mb-4">⚠️ 重要提醒</h3>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            本補助申請系統
            <span style={{ color: "red" }}>每間業者僅限申請一次</span>
            ，送出後即不得修改或重複申請。請您於填寫送出前
            <span style={{ color: "red" }}>
              詳加確認所有資料內容，並確保所填資訊屬實
            </span>
            。若申請內容與後續實地核銷時檢附之文件有重大差異，可能導致補助款項調整或不予核發，請務必審慎填報。
          </li>
          <li>
            <span style={{ color: "red" }}>設備補助申請金額僅為核銷上限</span>
            ，最終補助金額將以您實際購置設備時所檢附之有效發票與憑證為準，並依現場核銷結果核定。
          </li>
          <li>
            核銷作業須至市政府現場辦理，請依通知準備，
            <a
              href="https://drive.google.com/file/d/1FCLEASfvG0nvU5mD2IHujIN4kYRRtmsd/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              【核銷文件自我檢核表】
            </a>
            ，攜帶至指定地點完成核銷流程。
          </li>
        </ol>
      </div>
      <Form.Item
        label={
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            相關計畫補助情形
          </span>
        }
        name="subsidyStatus"
        rules={[
          {
            required: true,
            message: "請選擇相關計畫補助情形",
          },
        ]}
      >
        <Radio.Group
          options={subsidyStatusOptions}
          onChange={onSubsidyStatusChange}
          optionType="default"
          className="flex flex-col space-y-2"
        />
      </Form.Item>
      {showAdditional && (
        <Form.Item
          label={
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              承上題 請說明向其他機關提出補助申請情形（曾申請者選填）
            </span>
          }
          name="applicationResults"
        >
          <Radio.Group>
            <Space direction="horizontal" size="middle">
              <Radio value="曾申請且核定通過">
                曾申請且核定通過
                {/* <Tooltip title="請提供相關證明文件">
                  <QuestionCircleOutlined
                    style={{ marginLeft: "8px", color: "#1890ff" }}
                  />
                </Tooltip> */}
              </Radio>
              <Radio value="曾申請但未通過">
                曾申請但未通過
                {/* <Tooltip title="曾申請但未通過">
                  <QuestionCircleOutlined
                    style={{ marginLeft: "8px", color: "#1890ff" }}
                  />
                </Tooltip> */}
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      )}
      <Form.Item
        label={
          <div>
            <span style={{ fontSize: "16px", fontWeight: 600 }}>優先項目</span>
            <div className="text-gray-600 text-sm mb-5">
              是否通過「經濟部主辦機車行升級轉型輔導—機車維修訓練課程」並檢附經濟部、勞動部、環境部共同頒予之第一階段機車維修技術課程結訓證書
            </div>
          </div>
        }
        name="priorityItem"
        rules={[{ required: true, message: "請選擇優先項目" }]}
        colon={false}
      >
        <Radio.Group
          options={priorityItemOptions}
          optionType="default"
          className="flex flex-col space-y-2"
        />
      </Form.Item>

      <div className="text-base font-semibold mb-4">
              【產業轉型支援補助】
            </div>

      <Form.Item
        label={
          <><span style={{ fontSize: "16px", fontWeight: 600 }}>綠能轉型</span><Tooltip
            title={<div>
              <p>【補助新臺幣（以下同）100,000元整。輔導傳統車行取得中央認可(經濟部、勞動部、環境部共同頒予之第一階段機車維修技術課程結訓證書)及各車廠電動車機車維修保養之授權認證。(※如無中央認可證書，可先行由此報名網站進行報名: </p>
              <p>
                
             <a href="https://motor-training.cier.edu.tw/first-phase" target="_blank" rel="noopener noreferrer">
               https://motor-training.cier.edu.tw/first-phase
             </a>
             </p>
      
              
            </div>}
          >
            <QuestionCircleOutlined
              style={{ marginLeft: "8px", color: "#1890ff" }} />
          </Tooltip></>
        }
        name="greenTransformation"
        rules={[{ required: true, message: "請選擇綠能轉型金額" }]}
      >
        <Radio.Group options={greenTransformationOptions} />
      
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "請選擇留才獎勵" }]}
        label={
          <><span style={{ fontSize: "16px", fontWeight: 600 }}>留才獎勵</span><Tooltip
            title={<div>
              <p>補助20,000元整。獎勵車行所屬員工取得中央經濟部、勞動部、環境部共同頒予之第一階段機車維修技術課程結訓證書，及各廠牌認證之電動機車維修技術訓練證書。 </p>
             

            </div>}
          >
            <QuestionCircleOutlined
              style={{ marginLeft: "8px", color: "#1890ff" }} />
          </Tooltip></>
        }
        name="talentRetention"
      >
        <Radio.Group options={talentRetentionOptions} />
      </Form.Item>

      <div className="mb-2" style={{ fontSize: "16px", fontWeight: 600 }}>
        設備項目
        <Tooltip
          title={
            <div>
              <p>【保養維修診斷器材工具】</p>
              <p>
                1.僅限
                <a
                  href="https://www.lev.org.tw/shop/files/repairtools"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  公告新品
                </a>
                ，不得轉售
              </p>
              <p>2.補助上限為採購項目未稅金額50%，不限數量</p>
              <p>【維修系統租賃】</p>
              <p>1.限採年繳方式</p>
              <p>【店面改造及識別標誌】</p>
              <p>1.限廠牌認證之電動機車標誌</p>
              <p>2.補助上限為未稅金額50%</p>
              <p>3.裝修限營運空間內，非移動式設備(車廠必要營運系統除外)</p>
            </div>
          }
        >
          <QuestionCircleOutlined
            style={{ marginLeft: "8px", color: "#1890ff" }}
          />
        </Tooltip>
      </div>

      <div className="flex items-center">
        <Form.Item
          label={
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              【保養維修診斷器材工具】
            </span>
          }
          name="maintenanceTools"
          rules={[{ required: true, message: "請選擇或輸入金額" }]}
        >
          <Radio.Group
            options={maintenanceToolsOptions}
            onChange={(e) => {
              setIsOtherAmount(e.target.value === "other");
              // 不要手動設置form值，讓Form.Item自己控制
              if (e.target.value !== "other") {
                // 只清空其他金額輸入框
                form.setFieldsValue({
                  maintenanceToolsOtherAmount: null,
                });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="maintenanceToolsOtherAmount"
          rules={[
            { required: isOtherAmount, message: "請輸入金額" },
            {
              type: "number",
              min: 0,
              max: 40000,
              message: "金額必須在0-40000之間",
            },
          ]}
          style={{ marginBottom: "0px" }}
          className="w-[90%] md:w-[40%] mb-0"
        >
          <InputNumber
            style={{ width: "100%" }}
            addonAfter="元"
            max={40000}
            min={0}
            disabled={!isOtherAmount}
          />
        </Form.Item>
      </div>

      <div className="flex items-center">
        <Form.Item
          label={
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              【維修系統租賃費】
            </span>
          }
          name="maintenanceSystemRental"
          rules={[{ required: true, message: "請選擇或輸入金額" }]}
        >
          <Radio.Group
            options={maintenanceSystemRentalOptions}
            onChange={(e) => {
              setIsOtherRental(e.target.value === "other");
              if (e.target.value !== "other") {
                form.setFieldsValue({
                  maintenanceSystemRentalOtherAmount: null,
                });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="maintenanceSystemRentalOtherAmount"
          rules={[
            { required: isOtherRental, message: "請輸入金額" },
            {
              type: "number",
              min: 0,
              max: 10000,
              message: "金額必須在0-10000之間",
            },
          ]}
          style={{ marginBottom: "0px" }}
          className="w-[90%] md:w-[40%] mb-0"
        >
          <InputNumber
            style={{ width: "100%" }}
            addonAfter="元"
            max={10000}
            min={0}
            disabled={!isOtherRental}
          />
        </Form.Item>
      </div>

      <div className="flex items-center">
        <Form.Item
         label={
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            【店面改造及識別標誌】
          </span>
        }
        
          name="storeRenovation"
          rules={[{ required: true, message: "請選擇或輸入金額" }]}
          className="flex items-center"
        >
          <Radio.Group
            options={storeRenovationOptions}
            onChange={(e) => {
              setIsOtherRenovation(e.target.value === "other");
              if (e.target.value !== "other") {
                form.setFieldsValue({
                  storeRenovationOtherAmount: null,
                });
              }
            }}
          />
        </Form.Item>

        <Form.Item
          name="storeRenovationOtherAmount"
          rules={[
            { required: isOtherRenovation, message: "請輸入金額" },
            {
              type: "number",
              min: 0,
              max: 30000,
              message: "金額必須在0-30000之間",
            },
          ]}
          style={{ marginBottom: "0px" }}
          className="w-[90%] md:w-[40%] mb-0"
        >
          <InputNumber
            style={{ width: "100%" }}
            className="w-full md:w-[120px]"
            addonAfter="元"
            max={30000}
            min={0}
            disabled={!isOtherRenovation}
          />
        </Form.Item>
      </div>

      <div className="text-base font-semibold mb-4">
              【綠能交通產業推廣】
            </div>

      {/* 綠能交通產業推廣 */}
      <Form.Item
       label={
        <span style={{ fontSize: "16px", fontWeight: 600 }}>綠能交通產業推廣(名理所需補助項目)</span>
      }

        name="greenTransport"
        rules={[{ required: true, message: "請選擇綠能交通產業推廣項目" }]}
      >
        <Radio.Group>
          <Radio value="公益青年機車推廣">
            公益青年機車推廣
            <Tooltip title="願意參與配合本市環保局「基隆市公益青年就業電動機車補助計畫」，並成為代辦窗口，協助受理民眾申請文件。每一代辦核准案件補助600元整。">
              <QuestionCircleOutlined
                style={{ marginLeft: "8px", color: "#1890ff" }}
              />
            </Tooltip>
          </Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label={
          <span>
            申請品牌車廠類別(可複選)
            {/* <span style={{ color: '#ff4d4f' }}>*</span> */}
          </span>
        }
        name="carBrandCategories"
        rules={[{ required: true, message: "請選擇至少一個品牌車廠" }]}
      >
        <Checkbox.Group
          options={brandOptions}
          className="w-full grid grid-cols-2 gap-2"
          style={{ fontSize: "16px" }}
        />
      </Form.Item>
    </Form>
  );

  const renderStep3 = () => {
    // 計算設備補助總額的函數
    const calculateEquipmentSubsidy = () => {
      const maintenanceTools = form.getFieldValue("maintenanceTools");
      const maintenanceToolsOther =
        form.getFieldValue("maintenanceToolsOtherAmount") || 0;
      const maintenanceSystemRental = form.getFieldValue(
        "maintenanceSystemRental"
      );
      const maintenanceSystemRentalOther =
        form.getFieldValue("maintenanceSystemRentalOtherAmount") || 0;
      const storeRenovation = form.getFieldValue("storeRenovation");
      const storeRenovationOther =
        form.getFieldValue("storeRenovationOtherAmount") || 0;

      let maintenanceToolsAmount = 0;
      let maintenanceSystemRentalAmount = 0;
      let storeRenovationAmount = 0;

      // 計算保養維修診斷器材工具金額
      if (maintenanceTools === "other") {
        maintenanceToolsAmount = maintenanceToolsOther;
      } else {
        // 現在值是字串，需要轉換為數字
        maintenanceToolsAmount = parseInt(maintenanceTools) || 0;
      }

      // 計算維修系統租賃費金額
      if (maintenanceSystemRental === "other") {
        maintenanceSystemRentalAmount = maintenanceSystemRentalOther;
      } else {
        // 現在值是字串，需要轉換為數字
        maintenanceSystemRentalAmount = parseInt(maintenanceSystemRental) || 0;
      }

      // 計算店面改造及識別標誌金額
      if (storeRenovation === "other") {
        storeRenovationAmount = storeRenovationOther;
      } else {
        // 現在值是字串，需要轉換為數字
        storeRenovationAmount = parseInt(storeRenovation) || 0;
      }

      return (
        maintenanceToolsAmount +
        maintenanceSystemRentalAmount +
        storeRenovationAmount
      );
    };

    // 計算申請補助總額
    const calculateTotalSubsidy = () => {
      const greenTransformation =
        parseInt(form.getFieldValue("greenTransformation")) || 0;
      const talentRetention =
        parseInt(form.getFieldValue("talentRetention")) || 0;
      const equipmentSubsidy = calculateEquipmentSubsidy();
      return greenTransformation + talentRetention + equipmentSubsidy;
    };

    return (
      <Form
        form={form}
        layout="vertical"
        requiredMark="default"
        size="large"
        className="w-[90%] md:w-[80%] text-[16px]"
      >
        {/* 申請補助經費概算 */}
        <Title level={4} className="mb-6">
          申請補助經費概算
        </Title>

        <Row gutter={[16, 20]}>
          <Col xs={24} md={24}>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="text-base w-full mb-2 md:mb-0">
                綠能轉型 申請補助費用
              </div>
              <InputNumber
                className="w-full"
                addonAfter="元"
                value={parseInt(form.getFieldValue("greenTransformation")) || 0}
                disabled
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </div>
          </Col>

          <Col xs={24} md={24}>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="text-base w-full mb-2 md:mb-0">
                留才獎勵 申請補助費用
              </div>
              <InputNumber
                className="w-full"
                addonAfter="元"
                value={parseInt(form.getFieldValue("talentRetention")) || 0}
                disabled
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </div>
          </Col>
          <Col xs={24} md={24}>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="text-base w-full mb-2 md:mb-0">
                設備補助 申請補助費用
              </div>
              <InputNumber
                className="w-full"
                addonAfter="元"
                value={calculateEquipmentSubsidy()}
                disabled
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </div>
          </Col>

          <Col xs={24} md={24}>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <div className="text-base w-full mb-2 md:mb-0">
                申請補助總額(系統計算)
              </div>
              <InputNumber
                className="w-full"
                addonAfter="元"
                value={calculateTotalSubsidy()}
                disabled
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </div>
          </Col>
        </Row>

        {/* 相關預期效益 */}
        <div className="mt-10">
          <Title level={4} className="mb-6">
            相關預期效益
          </Title>
        </div>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  目前「每月來詢問電動機車維修相關問題」之客人預估為幾位？
                </span>
              }
              name="monthlyInquiryCustomers"
              rules={[
                { required: true, message: "請輸入每月來詢問的客人數量" },
              ]}
            >
              <InputNumber
                className="w-full"
                addonAfter="位"
                min={0}
                placeholder="請輸入數量"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  目前「每月前來維修電動機車」之車輛為幾台？
                </span>
              }
              name="monthlyRepairVehicles"
              rules={[{ required: true, message: "請輸入每月維修的車輛數量" }]}
            >
              <InputNumber
                className="w-full"
                addonAfter="台"
                min={0}
                placeholder="請輸入數量"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  車行內曾受過「電動機車維修技術培訓」員工為幾位？
                </span>
              }
              name="trainedEmployees"
              rules={[{ required: true, message: "請輸入受過培訓的員工數量" }]}
            >
              <InputNumber
                className="w-full"
                addonAfter="位"
                min={0}
                placeholder="請輸入數量"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  車行內目前會「維修電動機車」之員工為幾位？
                </span>
              }
              name="repairCapableEmployees"
              rules={[{ required: true, message: "請輸入會維修的員工數量" }]}
            >
              <InputNumber
                className="w-full"
                addonAfter="位"
                min={0}
                placeholder="請輸入數量"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  期望「未來每月前來維修電動機車」之車輛能增加幾台？
                </span>
              }
              name="expectedMonthlyIncrease"
              rules={[{ required: true, message: "請輸入期望增加的車輛數量" }]}
            >
              <InputNumber
                className="w-full"
                addonAfter="台"
                min={0}
                placeholder="請輸入數量"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  目前車行內有「維修電動機車之硬體設備」為幾項？
                </span>
              }
              name="hardwareEquipmentCount"
              rules={[{ required: true, message: "請輸入硬體設備數量" }]}
            >
              <InputNumber
                className="w-full"
                addonAfter="項"
                min={0}
                placeholder="請輸入數量"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label={
            <span className="text-base">
              目前車行內有「維修電動機車之軟體設備」為幾項？
            </span>
          }
          name="softwareEquipmentCount"
          rules={[{ required: true, message: "請輸入軟體設備數量" }]}
        >
          <InputNumber
            className="w-full"
            addonAfter="項"
            min={0}
            placeholder="請輸入數量"
          />
        </Form.Item>

        {/* 申請資格暨責任聲明 */}
        <div className="mt-10">
          <div className=" p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">
              申請資格暨責任聲明
            </h3>
            <div className="text-base leading-relaxed mb-4">
              本人已詳閱「114年度基隆市機車產業輔導綠能轉型產業補助計畫」補助規定及申請須知，確認符合申請資格，並了解本網站僅供線上單次申請用途。本人同意並承諾如下事項：
            </div>

            <div className="space-y-3 mb-4 text-base">
              <div>
                1️⃣ 本補助申請一經送出，不得重複申請，亦不得任意修改申請內容。
              </div>
              <div>
                2️⃣ 本人保證申請資料及附件內容均屬實，並願意配合本計畫撤銷補助規定事項，若有虛報或不符規定之情事，願接受計畫審核單位之處置，並退還補助款項。
              </div>
              <div>
                3️⃣ 本人同意無條件配合貴單位之管理與查核作業（包含不定期臨時性現場稽查、函詢及提供相關資料查核等）
              </div>
              <div>
                4️⃣ 本人承諾將配合申請作業流程，於核銷作業時繳付各申請補助方案相關佐證文件。
              </div>
              <div>
                5️⃣ 本人同意配合市府及主管機關辦理之審核作業流程及結果，並妥善保存相關佐證資料。
              </div>
              <div>
                6️⃣ 本人保證本計畫補助之器材將其列為本人財產，且於取得後2年內不予轉讓。
              </div>
              <div>
                7️⃣ 本人保證本計畫補助留才員工之培訓證書將與申請車行進行綁定，且自核准後6個月內不得轉調其他車行就業。
              </div>
              <div>
                8️⃣ 補助項目不得重複申請其他政府補助，不得挪作非本計畫用途。
              </div>
            </div>
          </div>
        </div>

        <Form.Item
          name="agreementConfirmation"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("請確認同意聲明內容")),
            },
          ]}
          className="mt-6"
        >
          <Checkbox className="text-base">
            本人已閱讀並充分理解上述同意聲明內容，確認符合資格並提交本次補助申請。
          </Checkbox>
        </Form.Item>
      </Form>
    );
  };

  const renderStep4 = () => (
    <div className="w-[90%] md:w-[80%] text-[16px]">
      <Form
        form={form}
        layout="vertical"
        requiredMark="default"
        size="large"
        className="w-[90%] md:w-[80%] text-[16px]"
      >
        <Row gutter={[16, 20]}>
          <Col xs={24} md={24}>
            <Form.Item
              label={
                <div>
                  <span className="text-base">車行設立登記證明文件</span>
                  <div className="text-base text-gray-500 mt-1">
                    請上船主管機關核發之法人設立登記證明文件。如：公司設立登記事項表、法人登記證書、商業登記抄本、特別法（職業設立
                    法規）有明定其法人資格
                  </div>
                </div>
              }
              name="companyRegistration"
              rules={[
                { required: true, message: "請上傳車行設立登記證明文件" },
              ]}
            >
              <Upload
                accept=".pdf,.jpg,.jpeg,.png"
                maxCount={1}
                beforeUpload={() => false}
              >
                <button className="bg-[#E69B06] text-white font-bold text-[18px] rounded-full px-3 py-3 md:px-4 md:py-1 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg">
                  上傳檔案
                </button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="text-base">
                  稅額申報書
                  <Tooltip
                    // styles={{ body: { width: '500px', padding: 0, color: 'white' } }}
                    title={
                      <div className="w-full">
                        <img
                          src={TextSample}
                          alt="稅額申報書範例"
                          style={{ width: "100%", height: "auto" }}
                        />
                      </div>
                    }
                  >
                    <QuestionCircleOutlined
                      style={{ marginLeft: "8px", color: "#1890ff" }}
                    />
                  </Tooltip>
                  <div className="text-base">
                    請上傳最新一期一般營業人銷售額與稅額申報書（401報表）
                  </div>
                </span>
              }
              name="businessRegistration"
              rules={[{ required: true, message: "請上傳商業登記證明文件" }]}
            >
              <Upload
                accept=".pdf,.jpg,.jpeg,.png"
                maxCount={1}
                beforeUpload={() => false}
              >
                <button className="bg-[#E69B06] text-white font-bold text-[18px] rounded-full px-3 py-3 md:px-4 md:py-1 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg">
                  上傳檔案
                </button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
  const renderStep5 = () => (
    <div className="flex flex-col items-center justify-center p-8 ">
    <h1 className="text-3xl font-bold text-[#1B7183] mb-6">🎉 感謝您的申請🎉</h1>
    <p className="text-lg mb-8">您的申請資料已成功送出，後續將由專人與您聯繫確認補助事宜。</p>

    <div className=" p-6  max-w-2xl w-full">
      <h2 className="text-xl font-bold text-[#1B7183] mb-4">📌 請注意後續流程：</h2>
      
      <div className="space-y-4 text-left">
        <div>
          <h3 className="font-bold">1️⃣ 核銷作業</h3>
          <p>請攜帶相關正本核銷文件至基隆市政府進行現場核銷作業</p>
          <p>正本文件可參閱【自我檢核表</p>
        </div>

        <div>
          <h3 className="font-bold">2️⃣ 聯繫追蹤</h3>
          <p>將會有專人主動與您聯繫，若近期內尚未接獲通知，請主動致電或透過 LINE 官方帳號與我們聯繫，以確保申辦進度順利。</p>
        </div>

        <div>
          <h3 className="font-bold">3️⃣ 進度查詢</h3>
          <p>申請結果及審核進度請密切留意【進度查詢專區】。</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-start pt-6 ">
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
      <p>
      <span className="font-bold">
                      LINE@&nbsp;&nbsp;&nbsp;
                    </span>
                    ｜
                    <a href="https://line.me/R/ti/p/@914kgwbz?oat_content=url&ts=04221721">
                      基隆綠能車行補助通
                    </a>
      </p>

   
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

      </div>
    </div>
  </div>
  );

  const renderButtons = () => {
    if (currentStep === 4) {
      return (
        <div className="flex justify-center my-8">
          <button
            className="bg-[#198DA1] text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-gray-600 transition-colors duration-200 shadow-lg mr-4"
            onClick={handlePrev}
          >
            上一步
          </button>
          <button
            className="bg-[#E69B06] text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg"
            onClick={handleSubmit}
          >
            送出申請
          </button>
        </div>
      );
    }
    if(currentStep === 5){
      return   <button
      className="bg-[#198DA1] text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-gray-600 transition-colors duration-200 shadow-lg mr-4"
      onClick={()=>{
        // setStep(1)
        // setCurrentStep(1)
        // setFormData({})
        // cleanToinit();
      window.location.reload();
      }}
    >
      回到查詢
    </button>
    }

    return (
      <div className="flex justify-center my-8">
        {currentStep > 1 && (
          <button
            className="bg-[#198DA1] text-white font-bold text-base  md:text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-gray-600 transition-colors duration-200 shadow-lg mr-4"
            onClick={handlePrev}
          >
            回上一步
          </button>
        )}
        <button
          className="bg-[#E69B06] text-white font-bold  text-base  md:text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg"
          onClick={handleNext}
          loading={loading}
        >
          {"下一步"}
        </button>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      // return renderStep2();

      case 2:
        return renderStep2();

      case 3:
        return renderStep3();

      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return null;
    }
  };

  if (googleLoading) {
    return <Loading bghidden={true} /> ;
  }

  if (error !== null) {
    return <PageError />;
  }
  

  return (
    <div className="w-full flex flex-col items-center">
      <PageTitle title={title[currentStep]} />
      {renderCurrentStep()}
      {renderButtons()}
    </div>
  );
};

export default CarDealerForm;
