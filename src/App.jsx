import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// 路由與麵包屑設定
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
  { path: "/news", breadcrumbName: "活動快訊", element: <News /> },
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

function App() {
  return (
    <Router>
      <div className={`${BACKGROUND_COLOR} min-h-screen flex flex-col`}>
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
