import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeenSubsidy() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    address: '',
    birthDate: '',
    vehicleType: '',
    vehicleNumber: '',
    bankAccount: '',
    bankCode: '',
    bankName: '',
    employmentType: '',
    files: {
      idCard: null,
      household: null,
      vehicleLicense: null,
      invoice: null,
      bankbook: null,
      employmentProof: null
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
    // TODO: 實作表單提交邏輯
    navigate('/success');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        青年補助申請表
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* 基本資料 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">基本資料</h2>
            <div className="grid md:grid-cols-2 gap-4">
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
              <div>
                <label className="block text-gray-700 mb-2">出生日期</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">聯絡電話</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">戶籍地址</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">身分類型</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">請選擇</option>
                  <option value="student">學生</option>
                  <option value="employed">在職</option>
                </select>
              </div>
            </div>
          </div>

          {/* 車輛資料 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">車輛資料</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">車輛類型</label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">請選擇</option>
                  <option value="heavy">重型電動機車</option>
                  <option value="light">輕型電動機車</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">車牌號碼</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 銀行帳戶資料 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">銀行帳戶資料</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">銀行代碼</label>
                <input
                  type="text"
                  name="bankCode"
                  value={formData.bankCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">銀行名稱</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">帳號</label>
                <input
                  type="text"
                  name="bankAccount"
                  value={formData.bankAccount}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* 文件上傳 */}
          <div>
            <h2 className="text-xl font-semibold mb-4">文件上傳</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">身分證正反面影本</label>
                <input
                  type="file"
                  name="idCard"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">戶口名簿影本</label>
                <input
                  type="file"
                  name="household"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">新車行照影本</label>
                <input
                  type="file"
                  name="vehicleLicense"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">購車發票影本</label>
                <input
                  type="file"
                  name="invoice"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">存摺封面影本</label>
                <input
                  type="file"
                  name="bankbook"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">在職證明或學生證影本</label>
                <input
                  type="file"
                  name="employmentProof"
                  onChange={handleFileChange}
                  className="w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
            >
              送出申請
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TeenSubsidy; 