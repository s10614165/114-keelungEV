import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function PageError() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#E7FCFC]">
      <Result
        status="error"
        title={<span className="text-2xl font-bold text-red-700">發生錯誤</span>}
        subTitle={<span className="text-base text-gray-700">很抱歉，頁面載入時發生錯誤，請稍後再試或返回首頁。</span>}
        extra={[
          <Link to="/" key="home">
            <Button type="primary" className="bg-blue-600 hover:bg-blue-700">返回首頁</Button>
          </Link>
        ]}
      />
    </div>
  );
}
