import React from "react";
const PageTitle = ({ title, icon = "", iconClassName = "" }) => {
  return (
    <div className="w-full flex items-center justify-center ">
      <h1 className="  border-b-[8px] pb-[11px] flex items-center gap-2 md:pb-[16px] w-fit border-[#1b7183] text-[22px] md:text-[32px] font-bold text-center text-[#1B7183] mb-8">
        {icon!=="" && <img src={icon} alt="icon" className={`${iconClassName} `}></img>}
        {title}
      </h1>
    </div>
  );
};

export default PageTitle;
