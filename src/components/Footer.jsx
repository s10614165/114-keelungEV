import { Link } from "react-router-dom";
import logo from "@/assets/img/logo.png";
import lineIcon from "@/assets/img/icon-line.png";
import LinkButton from "@/components/LinkButton";
import KEELUNGEV_INFOMATION from "@/constants/Infomation";
function Footer() {
  return (
    <footer className="bg-[#198DA1] text-white py-8 px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-start gap-4">
          <img src={logo} alt="基隆市府 logo" className="w-12 h-auto" />
          <div className="text-sm">
            <p>基隆市政府產業發展處</p>
            <p>地址｜{KEELUNGEV_INFOMATION.ADDRESS}</p>
            <p>電話｜{KEELUNGEV_INFOMATION.PHONE}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <LinkButton
            iconType="footer-fb"
            alt="Facebook"
          />
          <a href="#" className="hover:scale-110 transition-transform">
            <img src={lineIcon} alt="網站" className="w-6 h-6" />
          </a>
          <LinkButton
            iconType="footer-ig"
            alt="Facebook"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
