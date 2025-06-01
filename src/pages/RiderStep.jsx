import React,{useEffect} from "react";
import { create } from "zustand";
import Rider from "../assets/img/rider.svg";

// Zustand store for managing step progress
export const useStepStore = create((set) => ({
  currentStep: 5, // 設為第2步以便看到已完成步驟的效果
  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 5),
    })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),
}));

const StepBar = () => {
  const { currentStep, setStep, nextStep, prevStep } = useStepStore();

  const steps = ["填寫資料", "申請條件", "試算金額", "檢附文件", "送出申請"];

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep === 5) {
        setStep(1);
      } else {
        nextStep();
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentStep, setStep, nextStep]);

  return (
    <div className="w-[300px] md:w-[600px]  mx-auto mt-9 md:mt-19  ">
      {/* Main step bar container */}
      <div className="relative">
        {/* Background road - full width */}
        <div className="w-full h-5 bg-[#36CBDA] rounded-full relative overflow-hidden">
          {/* No dashed line on background road */}
        </div>

        {/* Progress road segments - 已完成的步驟 (currentStep - 1) */}
        {currentStep > 1 && (
          <div
            className="absolute top-0 left-0 h-5 bg-[#198DA1] overflow-hidden rounded-l-full"
            style={{
              width: `${((currentStep - 1) / 5) * 100}%`,
            }}
          >
            {/* White dashed line on completed segments */}
            <div className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, white 0, white 12px, transparent 12px, transparent 24px)",
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Current step green road section */}
        <div
          className={`absolute top-0 h-5 bg-[#26CF13] overflow-hidden ${
            currentStep === 1
              ? "rounded-l-full"
              : currentStep === 5
              ? "rounded-r-full"
              : ""
          }`}
          style={{
            left: `${((currentStep - 1) / 5) * 100}%`,
            width: `${100 / 5}%`,
          }}
        >
          {/* White dashed line on current step */}
          <div className="absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, white 0, white 12px, transparent 12px, transparent 24px)",
              }}
            ></div>
          </div>
        </div>

        {/* Rider positioned on current step */}
        <div
          className="absolute -top-7 md:-top-17 w-[45px] h-[45px] md:w-24 md:h-24 transform -translate-x-1/2 transition-all duration-500 ease-in-out"
          style={{
            left: `${((currentStep - 1) / 5) * 100 + 100 / 5 / 2}%`,
          }}
        >
          <img src={Rider} alt="Rider" className="" />
        </div>

        {/* Step labels */}
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => setStep(index + 1)}
            >
              <div
                className={`md:text-[20px] text-[11px]  font-bold mb-2 transition-colors duration-200 ${
                  currentStep === index + 1
                    ? "text-[#26CF13]"
                    : currentStep > index + 1
                    ? "text-[#198DA1]" // 已完成步驟的標籤顏色
                    : "text-[#36CBDA]"
                }`}
              >
                {index + 1}.{step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepBar;
