import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Checkbox,
  Button,
  Card,
  Space,
  Row,
  Col,
  DatePicker,
  Typography,
  Steps,
} from "antd";
import PageTitle from "@/components/PageTitle";
import {useStepStore} from"@/pages/RiderStep"
const { Title } = Typography;
const { Step } = Steps;

const CarDealerForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const {  nextStep, prevStep } = useStepStore();

  // 行政區選項
  const districts = [
    "信義區",
    "仁愛區",
    "中正區",
    "安樂區",
    "中山區",
    "七堵區",
    "暖暖區",
  ];

  // 車行類型選項
  const shopTypes = ["純油車行", "油電合一", "純電車行"];

  // 車廠品牌選項
  const brandOptions = [
    { label: "SANYANG 三陽", value: "SANYANG 三陽" },
    { label: "YAMAHA 山葉", value: "YAMAHA 山葉" },
    { label: "emoving 中華電動二輪車", value: "emoving 中華電動二輪車" },
    { label: "eReady 台鈴智慧電車", value: "eReady 台鈴智慧電車" },
    { label: "光陽電動車 ionex (光陽)", value: "ionex 光陽" },
    { label: "KYMCO 光陽", value: "KYMCO 光陽" },
    { label: "睿能 gogoro", value: "gogoro" },
    { label: "PGO 摩特動力", value: "PGO 摩特動力" },
    { label: "宏佳騰機車", value: "宏佳騰" },
    { label: "Zau 泓創綠能", value: "Zau 泓創綠能" },
  ];

  const handleNext = async () => {
    try {
      setLoading(true);
      nextStep();
      const values = await form.validateFields();
      console.log("表單資料:", values);
      setFormData(prev => ({
        ...prev,
        ...values
      }));
      setCurrentStep(prev => prev + 1);
    } catch (error) {
      console.log("驗證失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    prevStep();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const finalData = {
        ...formData,
        ...values
      };
      console.log('最終表單數據：', finalData);
      // 這裡處理最終的表單提交邏輯
    } catch (error) {
      console.error('提交失敗：', error);
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
              { pattern: /^\d{8}$/, message: "統一編號格式不正確" },
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
            <Select placeholder="請選擇行政區">
              {districts.map((district) => (
                <Select.Option key={district} value={district}>
                  {district}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={24}>
          <Form.Item
            label={<span className="text-base">車行類型</span>}
            name="shop"
            rules={[{ required: true, message: "請選擇車行類型" }]}
          >
            <Select placeholder="請選擇車行類型">
              {shopTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<span className="text-base">車廠品牌 (可複選)</span>}
        name="brand"
        rules={[{ required: true, message: "請至少選擇一個車廠品牌" }]}
      >
        <Checkbox.Group className="w-full">
          <Row>
            {brandOptions.map((option, index) => (
              <Col span={12} key={index}>
                <Checkbox
                  value={option.value}
                  className=" font-medium"
                  style={{ fontSize: "16px" }}
                >
                  {option.label}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
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
      className="w-[90%] md:w-[80%] text-[16px]"
    >
      <Title level={4} className="mb-6">
        申請條件
      </Title>
      
      <Form.Item
        label={<span className="text-base">營業面積</span>}
        name="businessArea"
        rules={[{ required: true, message: "請輸入營業面積" }]}
      >
        <Input placeholder="請輸入營業面積（平方公尺）" />
      </Form.Item>

      <Form.Item
        label={<span className="text-base">營業時間</span>}
        name="businessHours"
        rules={[{ required: true, message: "請選擇營業時間" }]}
      >
        <Select placeholder="請選擇營業時間">
          <Select.Option value="morning">上午 (08:00-12:00)</Select.Option>
          <Select.Option value="afternoon">下午 (12:00-17:00)</Select.Option>
          <Select.Option value="evening">晚上 (17:00-21:00)</Select.Option>
          <Select.Option value="full">全天 (08:00-21:00)</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={<span className="text-base">是否具備維修能力</span>}
        name="hasRepairAbility"
        rules={[{ required: true, message: "請選擇是否具備維修能力" }]}
      >
        <Select placeholder="請選擇">
          <Select.Option value="yes">是</Select.Option>
          <Select.Option value="no">否</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );

  const renderStep3 = () => (
    <Form
      form={form}
      layout="vertical"
      requiredMark="default"
      size="large"
      className="w-[90%] md:w-[80%] text-[16px]"
    >
      <Title level={4} className="mb-6">
        充電設備清單
      </Title>

      <Form.Item
        label={<span className="text-base">充電樁數量</span>}
        name="chargerCount"
        rules={[{ required: true, message: "請輸入充電樁數量" }]}
      >
        <Input type="number" placeholder="請輸入充電樁數量" />
      </Form.Item>

      <Form.Item
        label={<span className="text-base">充電樁類型</span>}
        name="chargerTypes"
        rules={[{ required: true, message: "請選擇充電樁類型" }]}
      >
        <Checkbox.Group>
          <Row>
            <Col span={8}>
              <Checkbox value="type1">Type 1</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="type2">Type 2</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="ccs1">CCS1</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="ccs2">CCS2</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="chademo">CHAdeMO</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label={<span className="text-base">充電功率</span>}
        name="chargingPower"
        rules={[{ required: true, message: "請選擇充電功率" }]}
      >
        <Select placeholder="請選擇充電功率">
          <Select.Option value="7">7kW</Select.Option>
          <Select.Option value="22">22kW</Select.Option>
          <Select.Option value="50">50kW</Select.Option>
          <Select.Option value="100">100kW</Select.Option>
          <Select.Option value="150">150kW</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );

  const renderStep4 = () => (
    <div className="w-[90%] md:w-[80%] text-[16px]">
      <Title level={4} className="mb-6">
        確認資料
      </Title>

      <Card className="mb-6">
        <Title level={5}>基本資料</Title>
        <p>申請單位：{formData.company}</p>
        <p>統一編號：{formData.taxId}</p>
        <p>行政區：{formData.district}</p>
        <p>車行類型：{formData.shop}</p>
      </Card>

      <Card className="mb-6">
        <Title level={5}>申請條件</Title>
        <p>營業面積：{formData.businessArea}</p>
        <p>營業時間：{formData.businessHours}</p>
        <p>維修能力：{formData.hasRepairAbility === 'yes' ? '是' : '否'}</p>
      </Card>

      <Card className="mb-6">
        <Title level={5}>設備清單</Title>
        <p>充電樁數量：{formData.chargerCount}</p>
        <p>充電樁類型：{formData.chargerTypes?.join(', ')}</p>
        <p>充電功率：{formData.chargingPower}kW</p>
      </Card>
    </div>
  );

  const renderButtons = () => {
    if (currentStep === 4) {
      return (
        <div className="flex justify-center my-8">
          <button
            className="bg-gray-500 text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-gray-600 transition-colors duration-200 shadow-lg mr-4"
            style={{ width: "220px", height: "50px" }}
            onClick={handlePrev}
          >
            返回上一步
          </button>
          <button
            className="bg-[#E69B06] text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg"
            style={{ width: "220px", height: "50px" }}
            onClick={handleSubmit}
          >
            確認提交
          </button>
        </div>
      );
    }

    return (
      <div className="flex justify-center my-8">
        {currentStep > 1 && (
          <button
            className="bg-gray-500 text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-gray-600 transition-colors duration-200 shadow-lg mr-4"
            style={{ width: "220px", height: "50px" }}
            onClick={handlePrev}
          >
            返回上一步
          </button>
        )}
        <button
          className="bg-[#E69B06] text-white font-bold text-[20px] rounded-full px-3 py-3 md:px-8 md:py-3 hover:bg-[#d18a05] transition-colors duration-200 shadow-lg"
          style={{ width: "220px", height: "50px" }}
          onClick={handleNext}
          loading={loading}
        >
          {currentStep === 3 ? '下一步，確認資料' : '下一步'}
        </button>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* {renderStepIndicator()} */}
      {renderCurrentStep()}
      {renderButtons()}
    </div>
  );
};

export default CarDealerForm;
