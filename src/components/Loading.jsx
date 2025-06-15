import { Spin } from "antd";

export default function Loading({extraText="載入中，請稍候...",bghidden=false}) {
  return (
    <div className={`w-full h-screen flex flex-col items-center justify-center ${bghidden ? '' : 'bg-[#EEFDFD]'}`}>
      <Spin size="large" />
      <div className="mt-6 text-lg text-blue-900 font-semibold tracking-wide">載入中，請稍候...</div>
      {extraText && <div className="mt-2 text-sm text-gray-600">{extraText}</div>}
    </div>
  );
}
        