import React from 'react'
import PowerStaionBackround from "@/assets/img/powerStaionBackround.png";

const FooterBgcImg = () => {
  return (
    <div className="relative w-full">
    <img
      src={PowerStaionBackround}
      alt="Power Station Background"
      className="w-full md:h-auto md:object-contain h-40 sm:h-48 object-cover object-top"
    />
  </div>
  )
}

export default FooterBgcImg