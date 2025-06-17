import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import evLogo from "@/assets/img/ev-logo.svg";
import Close from "@/assets/icon/Close_LG.png";
import listIcon from "@/assets/img/list.png";

import StepBar from "@/assets/img/step-bar-background.png";
import { BACKGROUND_COLOR } from "@/constants/styles";
import ToogleUP from "@/assets/icon/icon-toogle-up.png";
import ToogleDown from "@/assets/icon/icon-toogle-down.png";
import LinkButton from "@/components/LinkButton";
import MapStepSelect from "@/pages/MapStepSelect";
import RiderStep from "@/pages/RiderStep";
import SubsidyNavBar from "@/pages/SubsidyNavBar";

// 麵包屑元件
const Breadcrumb = ({ routes, location, menuItems, onNavigation }) => {
  const currentPath = location.pathname;
  const breadcrumbItems = [
    {
      path: "/",
      name: "首頁",
    },
  ];

  // 根據當前路徑找到對應的選單項目和父選單項目
  let parentMenuItem = null;
  let currentPage = null;

  // 先找到當前頁面所屬的父選單和具體頁面
  for (const menuItem of menuItems) {
    // 檢查是否是主選單項目的路徑
    if (currentPath === menuItem.link) {
      parentMenuItem = menuItem;
      // 如果點擊的是主選單，找到對應的第一個子選單項目
      const matchingSubItem = menuItem.subItems?.find(
        (sub) => !sub.external && sub.link === currentPath
      );
      if (matchingSubItem) {
        currentPage = matchingSubItem;
      } else {
        // 如果沒有找到完全匹配的子項目，使用主選單本身的資訊
        currentPage = { title: menuItem.title, link: menuItem.link };
      }
      break;
    }

    // 檢查子選單項目
    if (menuItem.subItems) {
      const subItem = menuItem.subItems.find(
        (sub) => !sub.external && sub.link === currentPath
      );
      if (subItem) {
        parentMenuItem = menuItem;
        currentPage = subItem;
        break;
      }
    }
  }

  // 構建麵包屑
  if (parentMenuItem && currentPage) {
    // 添加父選單項目
    breadcrumbItems.push({
      path: parentMenuItem.link,
      name: parentMenuItem.title,
    });

    // 始終添加當前頁面（即使名稱與父選單相同）
    breadcrumbItems.push({
      path: currentPage.link,
      name: currentPage.title,
    });
  } else {
    // 如果在選單結構中找不到，則使用原本的路由邏輯
    const route = routes.find((r) => r.path === currentPath);
    if (route) {
      breadcrumbItems.push({
        path: currentPath,
        name: route.breadcrumbName,
      });
    }
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-8 py-2 flex items-center text-sm text-gray-600">
        {breadcrumbItems.map((item, index) => (
          <span key={`${item.path}-${index}`} className="flex items-center">
            {index < breadcrumbItems.length - 1 ? (
              <>
                <Link
                  to={item.path}
                  onClick={(e) => onNavigation && onNavigation(item.path, e)}
                  className="transition-colors hover:text-blue-600"
                >
                  {item.name}
                </Link>
                <span className="mx-2">{">"}</span>
              </>
            ) : (
              <span className="text-black font-medium text-sm ">{item.name}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

function Navbar({ routes }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // 自定義的導航處理函數
  const handleNavigation = (targetPath, e) => {
    e.preventDefault(); // 阻止預設的 Link 行為
    
    if (location.pathname === targetPath) {
      // 如果是相同路由，重新整理
      window.location.reload();
    } else {
      // 如果是不同路由，正常導航
      navigate(targetPath);
    }
    
    // 關閉移動版選單
    closeMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const menuItems = [
    {
      key: "map",
      title: "友善車行地圖",
      link: "/map",
      subItems: [
        { title: "友善車行地圖", link: "/map" },
        { title: "充/換電站資訊", link: "/powerStationInfo" },
      ],
    },
    {
      key: "subsidy",
      title: "申請補助專區",
      link: "/subsidy-intro",
      subItems: [
        { title: "產業轉型補助", link: "/subsidy-intro" },
        { title: "公益青年代辦", link: "/teen-subsidy-intro" },
        {
          title: "中小企業貸款",
          link: "https://www.keelungyouth.com/%E5%9C%93%E5%A4%A2%E8%B2%B8%E6%AC%BE",
          external: true,
        },
        {
          title: "青創貸款補貼",
          link: "https://www.keelungyouth.com/%E8%B2%B8%E6%AC%BE%E5%88%A9%E6%81%AF%E8%A3%9C%E8%B2%BC",
          external: true,
        },
      ],
    },
    {
      key: "rules",
      title: "申請補助規則",
      link: "/rules",
      subItems: [
        { title: "規則說明", link: "/rules" },
        { title: "申請單據下載", link: "/download" },
      ],
    },
    {
      key: "news",
      title: "活動快訊",
      link: "/news",
      subItems: [
        { title: "座談會報名", link: "/seminar" },
        { title: "培訓課程資訊", link: "/training" },
        { title: "抽獎活動資訊", link: "/lottery" },
      ],
    },
    {
      key: "policy",
      title: "政策成效",
      link: "/policy-effect",
      subItems: [
        { title: "轉型成效", link: "/policy-effect" },
        { title: "成功案例影片", link: "/success-case" },
        { title: "DM下載", link: "/dm-download" },
      ],
    },
   
  ];

  // 取得當前頁面標題的函數
  const getCurrentPageTitle = () => {
    const currentPath = location.pathname;
    
    // 如果是首頁
    if (currentPath === "/") {
      return "首頁";
    }
  

    // 使用與麵包屑相同的邏輯尋找當前頁面名稱
    for (const menuItem of menuItems) {
      // 檢查是否是主選單項目的路徑
      if (currentPath === menuItem.link) {
        // 如果點擊的是主選單，找到對應的第一個子選單項目
        const matchingSubItem = menuItem.subItems?.find(
          (sub) => !sub.external && sub.link === currentPath
        );
        if (matchingSubItem) {
          return matchingSubItem.title;
        } else {
          // 如果沒有找到完全匹配的子項目，使用主選單本身的資訊
          return menuItem.title;
        }
      }

      // 檢查子選單項目
      if (menuItem.subItems) {
        const subItem = menuItem.subItems.find(
          (sub) => !sub.external && sub.link === currentPath
        );
        if (subItem) {
          return subItem.title;
        }
      }
    }

    // 如果在選單結構中找不到，則使用原本的路由邏輯
    const route = routes.find((r) => r.path === currentPath);
    return route ? route.breadcrumbName : "";
  };

  // 取得當前頁面標題的函數
  const genCurrentPageSubNav = () => {
    const currentPath = location.pathname;
    
    // 如果是首頁
    if (currentPath === "/") {
      return <></>;
    }

    const subNav = {
      "/map": <MapStepSelect />,
      "/subsidy-intro": <SubsidyNavBar />,
    }

    return subNav[currentPath] || null;
  };

  // 當路由改變時更新瀏覽器標題
  useEffect(() => {
    const pageTitle = getCurrentPageTitle();
    const siteTitle = "基隆友善車行一點通";
    
    if (pageTitle) {
      // 如果是首頁，只顯示網站名稱
      if (location.pathname === "/") {
        document.title = siteTitle;
      } else {
        // 其他頁面顯示「頁面名稱 - 網站名稱」
        document.title = `${pageTitle}`;
      }
    } else {
      // 如果找不到頁面標題，只顯示網站名稱
      document.title = siteTitle;
    }
  }, [location.pathname]); // 依賴 location.pathname，路徑改變時會重新執行

  return (
    <>
      {/* 導覽列 */}
      <header className="top-0 left-0 w-full bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
          <Link
            to="/"
            onClick={(e) => handleNavigation("/", e)}
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
          >
            <img src={evLogo} alt="EV Logo" className="h-12 w-auto" />
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-lg font-bold">基隆友善車行一點通</span>
              <span className="text-[9px] font-semibold text-gray-600 tracking-wide">
                Keelung E-Friendly Scooter Network v0.0006
              </span>
            </div>
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex gap-10 text-lg ">
              {menuItems.map((item, menuIndex) => (
                <li key={item.key} className="relative group cursor-pointer">
                  {item.title}
                  <ul
                   className={`absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 bg-white w-[200px] py-2 min-w-40 border border-gray-200 shadow-lg z-50 rounded-lg overflow-hidden`}
                  >
                    {item.subItems.map((subItem, index) => (
                      <li className="w-full flex items-center justify-center" key={index}>
                        {subItem.external ? (
                          <a
                            href={subItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center py-2 w-full text-gray-800 hover:bg-[#AEEFF3]"
                          >
                            {subItem.title}
                          </a>
                        ) : (
                          <Link
                            to={subItem.link}
                            onClick={(e) => handleNavigation(subItem.link, e)}
                            className="block text-center py-2 w-full text-gray-800 hover:bg-[#AEEFF3]"
                          >
                            {subItem.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>

          {/* 漢堡圖示 */}
          <img
            src={listIcon}
            className="w-8 h-8 cursor-pointer lg:hidden"
            id="menuIcon"
            alt="menu"
            onClick={toggleMenu}
          />
        </div>
        {/* 麵包屑元件 - 只在非根目錄時顯示 */}
        {location.pathname !== "/" && (
          <>
            <div
              className="relative z-10 flex flex-col text-center bg-[#eefdfd] min-w-[100px] md:min-w-[300px] pt-[24px] pb-16 min-h-[200px] bg-bottom bg-cover"
              style={{ backgroundImage: `url(${StepBar})` }}
            >
              <Breadcrumb
                routes={routes}
                location={location}
                menuItems={menuItems}
                onNavigation={handleNavigation}
              />

              {/* 當前頁面標題 */}
              <div className="flex grow self-center flex-col items-center justify-center  md:mt-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {getCurrentPageTitle()}
                </h2>
                <h2 className="text-4xl font-bold text-gray-800">
                  {genCurrentPageSubNav()}
                </h2>
              </div>
            
            </div>
          </>
        )}
      </header>

      {/* 遮罩層 */}
      <div
        className={`block xl:hidden fixed inset-0 ${BACKGROUND_COLOR} transition-opacity duration-300 z-30 ${
          isMenuOpen
            ? "opacity-25 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* 側邊滑出選單 */}
      <div
        className={`font-bold block xl:hidden fixed top-0 right-0 w-64 h-full bg-[#d4f8f9] shadow-lg pt-24  z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0 z-50" : "translate-x-full"
        }`}
      >
        <img
          onClick={closeMenu}
          src={Close}
          alt="close"
          className="h-6 w-auto absolute top-3 right-3"
        />
        <ul className="flex flex-col gap-4  font-medium">
          {menuItems.map((item) => (
            <li key={item.key}>
              <div
                className="flex items-center justify-between cursor-pointer px-9 hover:bg-gray-100 rounded"
                onClick={() => toggleSubMenu(item.key)}
              >
                <span
                  className={`${
                    openSubMenus[item.key] ? "text-[#198da1]" : "text-gray-800"
                  } text-base px-6`}
                >
                  {item.title}
                </span>
                {item.subItems && (
                  <img
                    src={openSubMenus[item.key] ? ToogleUP : ToogleDown}
                    alt="toggle"
                    className="w-4 h-4 "
                  />
                )}
              </div>

              {/* 子選單 */}
              {item.subItems && openSubMenus[item.key] && (
                <ul className=" mt-2 px-16 flex flex-col gap-2 bg-[#aeeff3] rounded p-3">
                  {item.subItems.map((subItem, index) => (
                    <li key={index}>
                      {subItem.external ? (
                        <a
                          href={subItem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2  text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                          onClick={closeMenu}
                        >
                          {subItem.title}
                        </a>
                      ) : (
                        <Link
                          to={subItem.link}
                          onClick={(e) => handleNavigation(subItem.link, e)}
                          className="block py-2  text-gray-700 hover:text-blue-600 transition-colors text-sm font-medium"
                        >
                          {subItem.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center  mt-[91px] cursor-pointer px-9   rounded">
          <div className="flex  gap-[24px] justify-end items-center w-full    " >
            <LinkButton iconType="sider-fb" alt="Facebook" />
            <LinkButton iconType="sider-line" alt="line" />
            <LinkButton iconType="sider-ig" alt="ig" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;