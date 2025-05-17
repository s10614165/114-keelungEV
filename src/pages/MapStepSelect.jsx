import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Select, Tag, Button } from "antd";
import { create } from "zustand";

const MAX_COUNT = 10;

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

  // 下拉選單開關狀態
  districtOpen: false,
  brandOpen: false,

  // 設置地區下拉選單開關
  setDistrictOpen: (isOpen) =>
    set(() => ({
      districtOpen: isOpen,
    })),

  // 設置品牌下拉選單開關
  setBrandOpen: (isOpen) =>
    set(() => ({
      brandOpen: isOpen,
    })),

  // 行為/動作
  setSelectedDistricts: (districts) =>
    set(() => ({
      selectedDistricts: [...districts],
    })),

  setSelectedBrands: (brands) =>
    set(() => ({
      selectedBrands: [...brands],
    })),

  // 清除所有選擇
  clearDistricts: () =>
    set(() => ({
      selectedDistricts: [],
    })),

  clearBrands: () =>
    set(() => ({
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

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={null}
      onClose={onClose}
      bordered={false}
      closeIcon={null}
      style={{ marginInlineEnd: 4, backgroundColor: "transparent" }}
    >
      {label}
    </Tag>
  );
};

const CustomSelect = ({
  options,
  selected,
  setSelected,
  isOpen,
  setOpen,
  placeholder,
  title,
  clearSelected,
}) => {
  const suffix = (
    <>
      {selected.length > 0 ? (
        <span
        >{`${title} (已選${selected.length}/${MAX_COUNT})`}</span>
      ) : (
        <span></span>
      )}
      <DownOutlined />
    </>
  );

  return (
    <Select
      mode="multiple"
      value={selected}
      className="w-[300px] text-left"
      onChange={setSelected}
      suffixIcon={suffix}
      placeholder={placeholder}
      tagRender={tagRender}
      open={isOpen}
      maxTagCount={2}
      maxTagPlaceholder={() => <span>...</span>}
      onOpenChange ={(visible) => setOpen(visible)}
      popupRender={(menu) => (
        <>
          {menu}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px",
              borderTop: "1px solid #f0f0f0",
            }}
          >
            <Button
              style={{ marginTop: "8px" }}
              type="text"
              onClick={clearSelected}
            >
              清空條件
            </Button>
            <Button
              className="rounded-3xl"
              style={{ marginTop: "8px", borderRadius: "20px" }}
              type="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              確定
            </Button>
          </div>
        </>
      )}
      options={options.map((item) => ({ value: item, label: item }))}
    />
  );
};

const App = () => {
  const {
    districts,
    brands,
    selectedDistricts,
    selectedBrands,
    districtOpen,
    brandOpen,
    setDistrictOpen,
    setBrandOpen,
    setSelectedDistricts,
    setSelectedBrands,
    clearDistricts,
    clearBrands,
  } = useStore();

  return (
    <div className="min-h-screen z-60">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 左側下拉選單 - 地區選擇 */}
          <div>
            <CustomSelect
              options={districts}
              selected={selectedDistricts}
              setSelected={setSelectedDistricts}
              isOpen={districtOpen}
              setOpen={setDistrictOpen}
              placeholder="請選擇地區"
              title=""
              clearSelected={clearDistricts}
            />
          </div>

          {/* 右側下拉選單 - 品牌選擇 */}
          <div>
            <CustomSelect
              options={brands}
              selected={selectedBrands}
              setSelected={setSelectedBrands}
              isOpen={brandOpen}
              setOpen={setBrandOpen}
              placeholder="請選擇電動車品牌"
              title="品牌"
              clearSelected={clearBrands}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
