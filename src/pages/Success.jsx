import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          申請成功
        </h1>

        <p className="text-gray-600 mb-8">
          您的申請已成功送出，我們將盡快處理您的申請。
        </p>

        <div className="space-y-4">
          <p className="text-gray-700">
            申請編號：<span className="font-semibold">2024001</span>
          </p>
          <p className="text-gray-700">
            預計審核時間：<span className="font-semibold">7-14 個工作天</span>
          </p>
        </div>

        <div className="mt-8 space-x-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            返回首頁
          </Link>
          <Link
            to="/subsidy-supplement"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            補充文件
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success; 