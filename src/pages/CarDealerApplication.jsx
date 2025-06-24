import React, { useState } from 'react';
import { Form } from 'antd';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form'; // 您需要創建這個組件

const CarDealerApplication = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (values) => {
    setFormData(prev => ({
      ...prev,
      ...values
    }));
    setCurrentStep(2);
  };

  const handlePrev = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (values) => {
    try {
      const finalData = {
        ...formData,
        ...values
      };
      // 這裡處理最終的表單提交邏輯
    } catch (error) {
      console.error('提交失敗：', error);
    }
  };

  return (
    <div>
      {currentStep === 1 && (
        <Step1Form form={form} onNext={handleNext} />
      )}
      {currentStep === 2 && (
        <Step2Form 
          form={form} 
          onPrev={handlePrev} 
          onSubmit={handleSubmit}
          initialValues={formData}
        />
      )}
    </div>
  );
};

export default CarDealerApplication; 