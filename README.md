# 基隆市電動機車補助專案網站 (114-keelungEV)

此專案為基隆市電動機車（EV）補助計畫的官方資訊網站。使用 React 和 Vite 建立，並整合了多項技術以提供使用者完整的資訊與服務。

## ✨ 功能

*   **最新消息**：提供最新的電動機車補助相關新聞與公告。
*   **補助介紹**：詳細說明各項補助方案的內容、資格與申請辦法。
*   **地圖查詢**：整合 Google Maps 顯示基隆市的充電站與換電站位置。
*   **數據圖表**：使用 Highcharts 將相關數據視覺化，一目了然。
*   **RWD響應式設計**：支援桌面與行動裝置瀏覽。

## 🛠️ 使用技術

*   **前端框架**: [React](https://reactjs.org/)
*   **建置工具**: [Vite](https://vitejs.dev/)
*   **路由**: [React Router](https://reactrouter.com/)
*   **UI 元件庫**: [Ant Design](https://ant.design/)
*   **CSS 框架**: [Tailwind CSS](https://tailwindcss.com/)
*   **圖表**: [Highcharts](https://www.highcharts.com/)
*   **地圖**: [Google Maps Platform](https://developers.google.com/maps)
*   **狀態管理**: [Zustand](https://zustand-demo.pmnd.rs/)

## 🚀 開始使用

請依照以下步驟在您的本機環境中設定並執行此專案。

### 1. 安裝依賴套件

在專案根目錄下，執行以下指令來安裝所有必要的套件：

```bash
npm install
```

### 2. 啟動開發伺服器

安裝完成後，執行以下指令來啟動本地開發伺服器：

```bash
npm run dev
```

應用程式將會在 `http://localhost:5173` (或 Vite 指定的其他 port) 上運行。

## 📜 可用腳本

在專案目錄中，您可以執行以下腳本：

*   `npm run dev`: 在開發模式下運行應用程式。
*   `npm run build`: 將應用程式建置為生產版本的靜態檔案。
*   `npm run lint`: 使用 ESLint 檢查程式碼風格。
*   `npm run preview`: 在本地預覽生產版本的建置成果。
*   `npm run deploy`: 將建置好的 `dist` 資料夾內容部署到 GitHub Pages。
