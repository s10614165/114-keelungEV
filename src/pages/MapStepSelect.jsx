import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Select, Tag, Button } from "antd";
import { create } from "zustand";

const MAX_COUNT = 10;

// Zustand store - 匯出 store 供其他元件使用
export const useStore = create((set) => ({
  // 區域選擇
  districts: [
    {
      value: "仁愛區",
      label: "仁愛區",
    },
    {
      value: "信義區",
      label: "信義區",
    },
    {
      value: "中正區",
      label: "中正區",
    },
    {
      value: "中山區",
      label: "中山區",
    },
    {
      value: "安樂區",
      label: "安樂區",
    },
    {
      value: "暖暖區",
      label: "暖暖區",
    },
    {
      value: "七堵區",
      label: "七堵區",
    },
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
    {
      value: "SYM",
      label: "SANYANG三陽",
    },
    {
      value: "YAMAHA",
      label: "YAMAHA山葉",
    },

    {
      value: "emoving",
      label: "emoving中華電動二輪車",
    },
    {
      value: "eReady",
      label: "eReady台鈴",
    },
    {
      value: "ionex",
      label: "Ionex光陽電動車",
    },
    {
      value: "KYMCO",
      label: "KYMCO光陽",
    },
    {
      value: "Aeonmotor",
      label: "AeonMOTOR宏佳騰",
    },
    {
      value: "Zau",
      label: "Zau 泓創綠能",
    },
    {
      value: "Gogoro",
      label: "睿能gogoro",
    },

    {
      value: "PGO",
      label: "PGO摩特動力",
    },
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
        <span>{`${title} (已選${selected.length}/${MAX_COUNT})`}</span>
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
      className="w-[380px] text-left"
      onChange={setSelected}
      suffixIcon={suffix}
      placeholder={placeholder}
      tagRender={tagRender}
      open={isOpen}
      maxTagCount={2}
      maxTagPlaceholder={() => <span>...</span>}
      onOpenChange={(visible) => setOpen(visible)}
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
            // variant="outlined"
              style={{ marginTop: "8px",border:"1px solid #19A4B4" ,borderRadius: "20px" ,color:"#19A4B4"}}
              type={"default"}
              onClick={clearSelected}
            >
              清空條件
            </Button>
            <Button
              className="rounded-3xl bg-[#19A4B4]"
              style={{ marginTop: "8px", borderRadius: "20px",backgroundColor:"#19A4B4",width:"90%",maxWidth:"242px"}}
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
      options={options}
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
