import { Link } from 'react-router-dom';

function TeenSubsidyIntro() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        青年電動機車補助說明
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">補助金額</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium text-lg mb-2">重型電動機車</h3>
            <p className="text-gray-600">
              每輛補助新台幣 25,000 元
            </p>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">輕型電動機車</h3>
            <p className="text-gray-600">
              每輛補助新台幣 20,000 元
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">申請資格</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>設籍基隆市且年滿18歲至45歲之青年</li>
          <li>購買全新電動機車</li>
          <li>車輛需於基隆市完成掛牌</li>
          <li>每人限申請一次</li>
          <li>需提供在職證明或學生證</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">應備文件</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>身分證正反面影本</li>
          <li>戶口名簿影本</li>
          <li>新車行照影本</li>
          <li>購車發票影本</li>
          <li>存摺封面影本</li>
          <li>在職證明或學生證影本</li>
        </ul>
      </div>

      <div className="flex justify-center space-x-4">
        <Link
          to="/teen-subsidy"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          立即申請
        </Link>
        <Link
          to="/teen-subsidy-supplement"
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
        >
          補充文件
        </Link>
      </div>
    </div>
  );
}

export default TeenSubsidyIntro; 