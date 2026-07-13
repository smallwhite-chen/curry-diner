## Context

咖哩食堂前台為單頁靜態落地頁，來自 Claude Design 原型，目前以純 HTML + CSS 部署於 GitHub Pages 子路徑（`https://smallwhite-chen.github.io/curry-diner/`）。無框架、無建置步驟、無後端。本設計聚焦「純形象頁」在內容真實性、可被發現／分享、響應式與穩健狀態上的技術取徑，需求細節見 specs。

## Goals / Non-Goals

**Goals:**
- 維持零框架、零建置的純靜態架構，可直接 commit → Pages 部署。
- 允許以可辨識的佔位先上線，之後無痛替換為真實內容。
- 讓頁面被搜尋引擎索引、被社群分享時正確顯示縮圖與標題。
- 手機提供可用的行動版導覽；定義原型缺的載入失敗／無障礙等狀態。

**Non-Goals:**
- 任何交易性功能（訂位、點餐、購物車、會員、後台）——見 proposal 非目標。
- 導入前端框架或打包工具。
- 多語系切換（現況中日文為視覺排版，非 i18n 需求）。

## Decisions

- **正式來源單一化**：以專案根的 `index.html` 為原型的**唯一事實來源**；`review-kit/features/landing/front.html` 視為由 prototype-kit 產生的副本，兩者須一致（避免雙份漂移）。
  - 替代方案：以 review-kit 副本為準——否決，因為根 `index.html` 才是部署與轉檔的來源。
- **佔位策略**：圖片沿用 `.img-slot`（CSS 斜線灰底 + 文字標籤）作為可辨識佔位；替換時在 `.img-slot` 內放 `<img>` 即覆蓋。門市資訊佔位需明顯（如〔地址佔位〕）而非看似真實的假資料。
- **可被發現／分享**：於 `<head>` 加入 `description`、Open Graph（`og:title`/`og:description`/`og:image`/`og:type`/`og:url`）與 favicon。
  - **關鍵取捨**：社群爬蟲不吃相對路徑，`og:image`/`og:url` 必須是**絕對網址**（指向 Pages 上的實體圖）。這與「站內一律相對路徑」的慣例衝突，故 OG 標籤是唯一容許絕對網址的例外。
- **行動版導覽**：以**CSS-only** 的 `<details>/<summary>` 或核取方塊 hack 實作漢堡選單，避免為單一功能引入 JS，維持零 JS 目標。
  - 替代方案：小段 JS toggle——保留為次選，若 CSS-only 在無障礙上不足再採用。
- **穩健狀態**：`<img>` 一律帶 `alt`；佈署後圖片載入失敗時保留 `.img-slot` 佔位視覺（img 疊在佔位之上，失敗則露出底層佔位）；字型沿用既有 fallback stack。

## Risks / Trade-offs

- [根 `index.html` 與 review-kit 副本漂移] → 明訂 index.html 為來源；review-kit 副本由 prototype-kit 重新產生，不手改。
- [`og:image` 用相對路徑導致 LINE／IG 無縮圖] → 規格明訂 OG 需絕對網址並實測分享預覽。
- [自訂網域未定，影響 `og:url`／canonical] → 先以現有 github.io 網址為準；若日後接自訂網域需一併更新（列入 Open Questions）。
- [CSS-only 漢堡選單的無障礙/鍵盤操作較弱] → 驗收時測鍵盤與 focus；不足則退回最小 JS 版本。

## Open Questions

- OG 社群預覽圖用哪張素材？（需一張具品牌感的實體圖，尺寸建議 1200×630）
- 是否會接自訂網域？會的話 `og:url`／canonical 需改為該網域。
- 真實門市資訊（地址／電話／營業時間）何時到位？（不阻擋上線，但影響「完成」定義）
