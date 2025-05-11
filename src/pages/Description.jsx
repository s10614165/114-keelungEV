import { Link } from 'react-router-dom';

function Description() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        電動機車補助說明
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">補助目的</h2>
        <p className="text-gray-600 mb-4">
          為推動基隆市電動機車普及化，減少空氣污染，特訂定本補助方案。
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">補助對象</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-lg mb-2">一般民眾</h3>
            <p className="text-gray-600">
              設籍基隆市且年滿18歲之市民。
            </p>
            <Link
              to="/subsidy-intro"
              className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              查看詳細說明 →
            </Link>
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">青年專案</h3>
            <p className="text-gray-600">
              設籍基隆市且年滿18歲至45歲之青年。
            </p>
            <Link
              to="/teen-subsidy-intro"
              className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              查看詳細說明 →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">申請注意事項</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>申請人需為車輛所有人</li>
          <li>車輛需為全新電動機車</li>
          <li>每人限申請一次</li>
          <li>申請文件需完整且真實</li>
          <li>補助款項將於審核通過後撥付</li>
        </ul>
      </div>
    </div>
  );
}

export default Description; 