# site-discoverability Specification

## Purpose
TBD - created by archiving change define-brand-landing-spec. Update Purpose after archive.
## Requirements
### Requirement: SEO 中繼資料
本頁 SHALL 提供供搜尋引擎使用的描述性標題與 meta description。

#### Scenario: 標題與描述存在
- **WHEN** 搜尋引擎索引本頁
- **THEN** 頁面具備唯一的 `<title>` 與一段摘要餐廳的 `<meta name="description">`

### Requirement: 社群分享預覽（Open Graph）
本頁 SHALL 提供 Open Graph 中繼資料，使分享連結能顯示標題、描述與預覽圖；`og:image` 與 `og:url` MUST 使用絕對網址。

#### Scenario: 分享至社群
- **WHEN** 連結被分享到 LINE／IG／Facebook
- **THEN** 存在 `og:title`、`og:description`、`og:image`、`og:type`、`og:url`，且 `og:image`／`og:url` 為指向實體資產的絕對網址

#### Scenario: 預覽圖可載入
- **WHEN** 社群爬蟲抓取 `og:image`
- **THEN** 該絕對網址回傳一張有效圖片（建議尺寸 1200×630）

### Requirement: Favicon
本頁 SHALL 提供瀏覽器分頁與書籤用的 favicon。

#### Scenario: Favicon 存在
- **WHEN** 頁面在瀏覽器載入
- **THEN** 頁面引用了 favicon 並顯示於分頁

