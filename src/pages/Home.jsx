import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        基隆市電動機車補助專區
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">一般民眾補助</h2>
          <p className="text-gray-600 mb-4">
            基隆市一般民眾購買電動機車補助方案說明
          </p>
          <Link
            to="/subsidy-intro"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            了解更多
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">青年補助方案</h2>
          <p className="text-gray-600 mb-4">
            基隆市青年購買電動機車專屬補助方案說明
          </p>
          <Link
            to="/teen-subsidy-intro"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            了解更多
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">補助申請流程</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>選擇適合的補助方案</li>
          <li>準備所需文件</li>
          <li>填寫線上申請表</li>
          <li>等待審核結果</li>
          <li>領取補助款項</li>
        </ol>
      </div>
    </div>
  );
}

export default Home; 