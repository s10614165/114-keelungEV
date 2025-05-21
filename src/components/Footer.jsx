import { Link } from "react-router-dom";
import logo from "@/assets/img/產發處LOGO.png";
import LinkButton from "@/components/LinkButton";
import KEELUNGEV_INFOMATION from "@/constants/Infomation";
import YoutubePlay from "@/components/YoutubePlay";
function Footer() {
  return (
    <footer className="bg-[#198DA1] text-white py-8 px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap">
        <div className="flex items-start flex-col gap-4">
          <div className="flex items-center  gap-2">
            <img src={logo} alt="基隆市府 logo" className="w-12 h-auto" />
            <div className="text-sm font-normal">基隆市政府產業發展處</div>
          </div>
          <div className="text-sm font-normal">
            <p>地址｜{KEELUNGEV_INFOMATION.ADDRESS}</p>
            <p>電話｜{KEELUNGEV_INFOMATION.PHONE}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <LinkButton iconType="footer-fb" alt="Facebook" />
          <LinkButton iconType="footer-line" alt="Facebook" />

          <LinkButton iconType="footer-ig" alt="Facebook" />
        </div>
        {/* <YoutubePlay /> */}
      </div>
    </footer>
  );
}

export default Footer;
