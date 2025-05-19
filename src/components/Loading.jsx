import { Spin } from "antd";

export default function Loading({extraText="載入中，請稍候..."}) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-[#e4fbfb]">
      <Spin size="large" />
      <div className="mt-6 text-lg text-blue-900 font-semibold tracking-wide">載入中，請稍候...</div>
      {extraText && <div className="mt-2 text-sm text-gray-600">{extraText}</div>}
    </div>
  );
}
        