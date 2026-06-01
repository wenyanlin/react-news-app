# 📰 React News App (Nx Monorepo)

一個基於 **React 19**、**Vite** 與 **Tailwind CSS v4** 開發的現代化新聞瀏覽應用程式，並使用 **Nx** 進行高效的 Monorepo（單一程式庫）專案管理。

---

## 🚀 專案特點

- **高效 Monorepo 架構**：基於 Nx 管理專案，將功能高度模組化，確保程式碼重用性與清晰的架構邊界。
- **現代技術棧**：使用 React 19、TypeScript 與 Vite 進行極速開發與編譯。
- **美觀 UI 設計**：採用 Tailwind CSS v4，結合簡約現代的響應式設計（Mobile-first），提供使用者極致的閱讀體驗。
- **完整新聞系統**：包含新聞分類瀏覽、文章詳細閱讀、留言評論區與簡單的會員登入驗證（Auth Context）。

---

## 📁 專案架構說明

專案主要分為核心應用程式（Apps）與共享模組庫（Libs）兩大類別：

### 應用程式 (Apps)
*   **`apps/react-news-app`**：新聞應用的主要入口與路由配置，負責整合所有功能庫。

### 模組庫 (Libs)
*   **`libs/pages`**：存放應用的主要頁面組件（如首頁 `HomePage`、文章頁 `ArticlePage`、登入頁 `LoginPage`）。
*   **`libs/news`**：新聞列表、分類篩選、新聞卡片等核心業務組件。
*   **`libs/comments`**：文章留言評論區組件，支援發表評論與列表展示。
*   **`libs/auth`**：會員登入狀態管理與權限機制（AuthContext & Hooks）。
*   **`libs/api`**：負責與後端 API 對接、資料請求封裝與 Mockup 測試數據層。
*   **`libs/layouts`**：全域佈局組件，如頁首導覽列（Header）。
*   **`libs/ui`**：系統共享的原子級 UI 基礎元件與全域 CSS 樣式。
*   **`libs/types`**：定義專案內共享的 TypeScript 介面與型別（Interface & Types）。
*   **`libs/utils`**：全域通用的輔助函式庫。

---

## 🛠️ 快速開始

### 1. 安裝依賴套件
在專案根目錄執行：
```bash
npm install
```

### 2. 啟動本地開發伺服器
啟動主要 Web 應用程式：
```bash
npx nx dev react-news-app
```
*本地伺服器啟動後，將預設運行於 `http://localhost:4200`。*

### 3. 生產環境打包編譯
```bash
npx nx build react-news-app
```

---

## ⚙️ 常用 Nx 指令

本專案使用 Nx CLI 管理所有開發任務，你可以使用以下指令：

| 指令 | 說明 |
| :--- | :--- |
| `npx nx dev react-news-app` | 啟動本地開發環境（Vite Dev Server） |
| `npx nx build react-news-app` | 進行專案編譯打包（輸出至 dist 檔案夾） |
| `npx nx lint react-news-app` | 對主要應用進行代碼風格檢查 |
| `npx nx run-many -t lint` | 對整個 Workspace 中所有項目進行代碼風格檢查 |
| `npx nx run-many -t test` | 執行所有模組與應用的單元測試（Vitest） |
| `npx nx graph` | 可視化呈現整個 Monorepo 的項目依賴關係圖 |

---

## 🏷️ 模組依賴規範 (Module Boundaries)

為了維持 Monorepo 的健康架構，專案遵循嚴格的模組界限，防止循環依賴。你可以透過 `npx nx graph` 隨時查看最新的依賴圖表，確保每個模組都符合高內聚、低耦合的設計原則。
