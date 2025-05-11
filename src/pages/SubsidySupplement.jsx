import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SubsidySupplement() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    applicationNumber: '',
    name: '',
    idNumber: '',
    files: {
      idCard: null,
      household: null,
      vehicleLicense: null,
      invoice: null,
      bankbook: null
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      files: {
        ...prev.files,
        [name]: files[0]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 實作補充文件提交邏輯
    navigate('/success');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        補充文件上傳
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* 申請資料 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">申請資料</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">申請編號</label>
                <input
                  type="text"
                  name="applicationNumber"
                  value={formData.applicationNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">身分證字號</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 文件上傳 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">補充文件上傳</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">身分證正反面影本</label>
                <input
                  type="file"
                  name="idCard"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">戶口名簿影本</label>
                <input
                  type="file"
                  name="household"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">新車行照影本</label>
                <input
                  type="file"
                  name="vehicleLicense"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">購車發票影本</label>
                <input
                  type="file"
                  name="invoice"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">存摺封面影本</label>
                <input
                  type="file"
                  name="bankbook"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              送出補充文件
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SubsidySupplement; 