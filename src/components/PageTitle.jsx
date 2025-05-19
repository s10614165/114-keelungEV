import React from "react";
const PageTitle = ({ title }) => {
  return (
    <h1 className="border-t-[8px] pt-[20px] w-[180px] border-[#1b7183] text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
      {title}
    </h1>
  );
};

export default PageTitle;
