## 1. 定位與結構確認

- [x] 1.1 確認 `index.html` 為原型唯一事實來源，`review-kit/features/landing/front.html` 為 prototype-kit 產生之副本（不手改）
- [x] 1.2 核對七區塊（NAV／HERO／ABOUT／TYPES／MENU／REVIEWS／FOOTER）存在且順序正確
- [x] 1.3 確認頁面無任何交易性介面（訂位／點餐／購物車／登入）

## 2. 響應式與行動版導覽

- [x] 2.1 在 `index.html` 以 CSS-only（`<details>/<summary>` 或核取方塊 hack）加入 ≤820px 的行動版導覽，取代目前直接隱藏導覽列
- [x] 2.2 行動版導覽每個項目可捲動到對應區塊（#about/#types/#menu/#reviews）
- [x] 2.3 桌機（>820px）維持完整水平導覽；以瀏覽器實測兩種斷點

## 3. 圖片穩健與無障礙

- [x] 3.1 為每個 `.img-slot` 圖位定義描述性替代文字（alt）規範，替換真實圖時一併帶入
- [x] 3.2 確保圖片載入失敗時佔位視覺仍在（img 疊在 `.img-slot` 之上，失敗露出底層佔位）
- [x] 3.3 檢查鍵盤 Tab 順序、focus 可見狀態，與主要文字對比度

## 4. 站台可被發現／分享

- [x] 4.1 在 `<head>` 補 `<meta name="description">`（餐廳摘要）
- [x] 4.2 加入 Open Graph 標籤：`og:title`/`og:description`/`og:type`/`og:url`/`og:image`
- [x] 4.3 準備 1200×630 社群預覽圖，放入專案並以**絕對網址**引用 `og:image`/`og:url`
- [x] 4.4 加入 favicon 並確認分頁顯示
- [ ] 4.5 實測分享到 LINE／Facebook 除錯工具，確認縮圖與標題正確

## 5. 內容真實化（允許延後，不阻擋上線）

- [ ] 5.1 向店家索取真實菜色照片（4 張）、地址、電話、營業時間
- [ ] 5.2 以真實照片替換 `.img-slot` 佔位，維持長寬比
- [ ] 5.3 以真實門市資訊替換頁尾〔地址佔位〕/ 02-0000-0000

## 6. 部署與驗證

- [x] 6.1 以 prototype-kit 重新產生 review-kit 副本，保持與 `index.html` 一致
- [x] 6.2 透過 github-deploy 部署到 GitHub Pages
- [x] 6.3 逐條對照 specs 的 Scenario 驗收（區塊、行動版導覽、圖片失敗、SEO/OG、favicon）
