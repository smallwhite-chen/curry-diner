## Why

咖哩食堂的前台落地頁目前只有一份 Claude Design 轉出的原型（`index.html`），視覺完成度高但沒有正式規格：內容是佔位、缺少被搜尋／分享所需的中繼資料、手機版直接把導覽藏起來，且原型未定義載入失敗等邊界狀態。這是一個**純品牌形象頁**（非電商、非訂位），需要把「它該滿足什麼」定成可簽核、可交付工程的規格，作為後續維護與部署的事實來源。

## What Changes

- 明確定位本頁為**純形象頁**，並將以下列為**非目標（不做）**：線上訂位、線上點餐／購物車、會員／登入、任何收單後台。
- 定義頁面內容結構與呈現規格（NAV／HERO／ABOUT／TYPES／MENU／REVIEWS／FOOTER 七區塊）。
- 內容真實性：真實照片、門市地址、電話、營業時間為**最終必要內容**，但**允許先以佔位上線**，佔位需可辨識。
- 新增**站台可被發現／分享**能力：SEO meta（title／description）、Open Graph 社群預覽圖、favicon。
- 響應式：手機版（≤820px）**須提供行動版導覽**（取代目前直接隱藏導覽列的做法）。
- 定義原型未涵蓋的**穩健狀態**：圖片載入失敗、超長字串、Web Font fallback、基本無障礙（替代文字／對比／鍵盤）。

## Capabilities

### New Capabilities
- `brand-landing-page`: 品牌形象落地頁的內容結構、內容真實性策略、響應式（含行動版導覽）、呈現穩健狀態與無障礙，以及明列的非目標。
- `site-discoverability`: 讓頁面被搜尋引擎索引、被社群分享時正確顯示——SEO meta、Open Graph 預覽、favicon。

### Modified Capabilities
<!-- 無。openspec/specs/ 目前為空，這是本專案第一批規格。 -->

## Impact

- **檔案**：`index.html`（前台原型，正式來源）、`review-kit/features/landing/front.html`（評審套件內同一份原型副本）。
- **部署**：GitHub Pages（`smallwhite-chen/curry-diner`）；新增的 OG 圖與 favicon 為需一併部署的靜態資產，所有路徑須相對化。
- **相依**：Web Fonts（Shippori Mincho／Noto Sans TC／Zen Kaku Gothic New）；社群預覽圖需一張實體圖片資產。
- **流程**：內容真實化與素材（照片、地址、OG 圖）需向店家索取；規格允許佔位上線，故不阻擋首次部署。
