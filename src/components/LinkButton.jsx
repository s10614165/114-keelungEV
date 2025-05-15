import React from 'react'
import FooterFB from "@/assets/icon/icon-fb.png";
import FooterIG from "@/assets/icon/icon-ig.png";
import SiderFB from "@/assets/icon/Facebook.png";
import SiderIG from "@/assets/icon/Instagram.png";

/**
 * LinkButton - 可重用的社群媒體連結按鈕元件
 * 
 * @component
 * @description 一個通用的連結按鈕元件，支援多種社群媒體圖標和自定義樣式。
 * 此元件提供了靈活的選項來控制連結行為、圖標類型和視覺樣式。
 * 當沒有提供 href 時，會根據圖標類型自動連結到對應的社群媒體官網。
 * 
 * @example
 * // 基本使用範例 - 自動連結到 Facebook
 * <LinkButton 
 *   iconType="footer-fb"
 *   alt="Facebook"
 * />
 * 
 * @example
 * // 自動連結到 Instagram，自定義樣式
 * <LinkButton 
 *   iconType="sider-ig"
 *   alt="Instagram"
 *   size="w-10 h-10"
 *   linkClass="hover:scale-125 transition-all duration-300"
 *   imgClass="opacity-75 hover:opacity-100"
 * />
 * 
 * @example
 * // 自定義連結（覆蓋預設行為）
 * <LinkButton 
 *   href="https://www.facebook.com/mycompany"
 *   iconType="footer-fb"
 *   alt="我們的 Facebook 專頁"
 * />
 * 
 * @example
 * // 內部連結
 * <LinkButton 
 *   href="/about"
 *   iconType="footer-fb"
 *   alt="關於我們"
 *   target="_self"
 * />
 * 
 * @param {Object} props - 元件屬性
 * @param {string} [props.href] - 連結的目標 URL。若不提供，將根據圖標類型自動設定
 * @param {"footer-fb"|"footer-ig"|"sider-fb"|"sider-ig"} [props.iconType="footer-fb"] - 圖標類型，決定要顯示哪個社群媒體圖標
 * @param {string} [props.alt="連結"] - 圖片的替代文字，用於無障礙功能
 * @param {string} [props.size="w-6 h-6"] - 圖標的尺寸類別，使用 Tailwind CSS 的 width 和 height 類別
 * @param {string} [props.linkClass="hover:scale-110 transition-transform"] - 連結元素的 CSS 類別
 * @param {string} [props.imgClass=""] - 圖片元素的額外 CSS 類別
 * @param {"_blank"|"_self"|"_parent"|"_top"} [props.target="_blank"] - 連結的開啟方式
 * @param {Function} [props.onClick=null] - 點擊事件處理函式
 * 
 * @returns {React.ReactElement} 返回一個包含圖標的連結元素
 */
const LinkButton = ({ 
  href, 
  iconType = "footer-fb", 
  alt = "連結",
  size = "w-6 h-6",
  linkClass = "hover:scale-110 transition-transform",
  imgClass = "",
  target = "_blank",
  onClick = null
}) => {
  /**
   * 圖標對應表
   * @constant
   * @type {Object.<string, string>}
   * @description 將圖標類型字串對應到實際的圖片檔案
   */
  const iconMap = {
    "footer-fb": FooterFB,
    "footer-ig": FooterIG,
    "sider-fb": SiderFB,
    "sider-ig": SiderIG
  };

  /**
   * 取得對應的圖標
   * @constant
   * @type {string}
   * @description 根據 iconType 從對應表中取得圖標，若找不到則使用預設的 FooterFB
   */
  const icon = iconMap[iconType] || FooterFB;
  
  /**
   * 自動設定連結
   * @constant
   * @type {string}
   * @description 如果沒有提供 href，則根據圖標類型自動設定連結
   */
  const finalHref = href || (() => {
    // 判斷是 Facebook 還是 Instagram
    const isFacebook = iconType.includes('fb');
    return isFacebook ? 'https://www.facebook.com/ilovekeelung' : 'https://www.instagram.com/embracekeelung/';
  })();
  
  return (
    <a 
      href={finalHref} 
      className={linkClass}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      <img 
        src={icon} 
        alt={alt} 
        className={`${size} ${imgClass}`} 
      />
    </a>
  )
}

export default LinkButton