import { HashRouter as Router, Routes, Route,useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import KLVMap from "./pages/Map";
import PowerStationInfo from "./pages/PowerStationInfo";
import SubsidyIntro from "./pages/SubsidyIntro";
import TeenSubsidyIntro from "./pages/TeenSubsidyIntro";
import Description from "./pages/Description";
import Download from "./pages/Download";
import PolicyEffect from "./pages/PolicyEffect";
import SuccessCase from "./pages/SuccessCase";
import DMDownload from "./pages/DMDownload";
import News from "./pages/News";
import Seminar from "./pages/Seminar";
import Training from "./pages/Training";
import Lottery from "./pages/Lottery";
import { BACKGROUND_COLOR } from "./constants/styles";
import ReactGA from 'react-ga';
import {useEffect} from "react"

ReactGA.initialize('G-F1NCGDVDSF');
const routes = [
  { path: "/", breadcrumbName: "首頁", element: <Home /> },
  // 友善車行地圖

  { path: "/map", breadcrumbName: "友善車行地圖", element: <KLVMap /> },
  {
    path: "/powerStationInfo",
    breadcrumbName: "充/換電站資訊",
    element: <PowerStationInfo />,
  },
  // 申請補助專區
  {
    path: "/subsidy-intro",
    breadcrumbName: "產業轉型補助",
    element: <SubsidyIntro />,
  },
  {
    path: "/teen-subsidy-intro",
    breadcrumbName: "公益青年代辦",
    element: <TeenSubsidyIntro />,
  },
  // 申請補助規則
  { path: "/rules", breadcrumbName: "規則說明", element: <Description /> },
  { path: "/download", breadcrumbName: "申請單據下載", element: <Download /> },
  // 活動快訊
  { path: "/news", breadcrumbName: "座談會報名", element: <Seminar /> },
  { path: "/seminar", breadcrumbName: "座談會報名", element: <Seminar /> },
  { path: "/training", breadcrumbName: "培訓課程資訊", element: <Training /> },
  { path: "/lottery", breadcrumbName: "抽獎活動資訊", element: <Lottery /> },
  // 政策成效
  {
    path: "/policy-effect",
    breadcrumbName: "轉型成效",
    element: <PolicyEffect />,
  },
  {
    path: "/success-case",
    breadcrumbName: "成功案例影片",
    element: <SuccessCase />,
  },
  { path: "/dm-download", breadcrumbName: "DM下載", element: <DMDownload /> },
];

// GA 初始化
ReactGA.initialize('您的GA追蹤ID'); // 請替換為您實際的 GA 追蹤 ID

// 用於追蹤路由變更的組件
function GATracker() {
  const location = useLocation();
  useEffect(() => {
    // 每當路由變更時追蹤頁面瀏覽
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
}


function App() {
  return (
    <Router >
      <div className={`${BACKGROUND_COLOR} min-h-screen flex flex-col`}>
      <GATracker />
        <Navbar routes={routes} />
        <main className="flex-grow bg-[#eefdfd]">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
