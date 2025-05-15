import React, { useState, useRef, useEffect } from "react";
import { create } from "zustand";
import Icon_Check from "@/assets/icon/icon-check.png";
import ToogleUP from "@/assets/icon/icon-toogle-up.png";
import ToogleDown from "@/assets/icon/icon-toogle-down.png";
// Zustand store - 匯出 store 供其他元件使用
export const useStore = create((set) => ({
  // 區域選擇
  districts: [
    "仁愛區",
    "信義區",
    "中正區",
    "中山區",
    "安樂區",
    "暖暖區",
    "七堵區",
  ],
  selectedDistricts: [], // 選擇的行政區
  selectedBrands: [], // 選擇的品牌
  // 行為/動作
  // 注意：每次都返回全新的陣列
  setSelectedDistricts: (districts) =>
    set(() => ({
      selectedDistricts: [...districts],
    })),

  setSelectedBrands: (brands) =>
    set(() => ({
      selectedBrands: [...brands],
    })),

  // 添加一個行政區（確保創建新陣列）
  addDistrict: (district) =>
    set((state) => ({
      selectedDistricts: [...state.selectedDistricts, district],
    })),

  // 移除一個行政區（確保創建新陣列）
  removeDistrict: (district) =>
    set((state) => ({
      selectedDistricts: state.selectedDistricts.filter((d) => d !== district),
    })),

  // 添加一個品牌（確保創建新陣列）
  addBrand: (brand) =>
    set((state) => ({
      selectedBrands: [...state.selectedBrands, brand],
    })),

  // 移除一個品牌（確保創建新陣列）
  removeBrand: (brand) =>
    set((state) => ({
      selectedBrands: state.selectedBrands.filter((b) => b !== brand),
    })),

  // 清除所有選擇
  clearAll: () =>
    set(() => ({
      selectedDistricts: [],
      selectedBrands: [],
    })),

  // 品牌選擇
  brands: [
    "SANYANG三陽",
    "YAMAHA山葉",
    "emoving中華電動二輪車",
    "eReady台鈴智慧電車",
    "光陽電動車ionex",
    "KYMCO光陽",
    "睿能gogoro",
    "PGO摩特動力",
    "宏佳騰機車",
    "Zau 泓創綠能",
  ],
}));

// 多選下拉選單元件
const MultiSelectDropdown = ({
  options,
  selected,
  onSelect,
  placeholder,
  title,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 處理點擊外部關閉下拉選單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (option) => {
    if (selected.includes(option)) {
      onSelect(selected.filter((item) => item !== option));
    } else {
      onSelect([...selected, option]);
    }
  };

  const handleClear = () => {
    onSelect([]);
  };

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        className="w-[380px] max-w-[380px] max-h-[35px] px-2 py-1 text-left bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-400 focus:outline-none focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700 text-[20px]">
          {selected.length > 0
            ? `${title} (已選${selected.length}/10)`
            : placeholder}
        </span>
        <span>
          <img
            src={isOpen ? ToogleUP : ToogleDown}
            alt="toggle"
            className="w-4 h-4"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="max-h-60 overflow-y-auto p-2">
            {options.map((option) => (
              <div
                key={option}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                onClick={() => handleToggle(option)}
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center">
                  {selected.includes(option) && (
                    <img src={Icon_Check} alt="check" className="w-4 h-4" />
                  )}
                </div>
                <span className="text-gray-700">{option}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-3 flex justify-between items-center">
            <button
              className="px-4 py-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              onClick={handleClear}
            >
              清空條件
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              onClick={handleConfirm}
            >
              確定
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 主應用程式
const App = () => {
  const {
    districts,
    selectedDistricts,
    setSelectedDistricts,
    brands,
    selectedBrands,
    setSelectedBrands,
  } = useStore();
  return (
    <div className="min-h-screen  z-60 ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左側下拉選單 - 地區選擇 */}
          <div>
            <MultiSelectDropdown
              options={districts}
              selected={selectedDistricts}
              onSelect={setSelectedDistricts}
              placeholder="請選擇地區"
              title="地區"
            />
          </div>

          {/* 右側下拉選單 - 品牌選擇 */}
          <div>
            <MultiSelectDropdown
              options={brands}
              selected={selectedBrands}
              onSelect={setSelectedBrands}
              placeholder="請選擇電動車品牌"
              title="品牌"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
