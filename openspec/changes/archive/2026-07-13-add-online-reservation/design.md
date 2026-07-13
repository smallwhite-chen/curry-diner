## Context

原型的訂位 modal 來自 Claude Design 的 `.dc.html`（DCLogic 狀態類別）。standalone 部署沒有 DC runtime，需以純 vanilla JS 重寫同等行為，維持零框架、零建置。本 change 範圍限前端，`submit()` 不送出資料。

## Goals / Non-Goals

**Goals:**
- 前端 100% 還原訂位流程與各狀態（日期/時段/人數/驗證/摘要/成功）。
- 維持零框架、零建置、可直接部署 Pages。
- 保留既有 Code 端加強（手機導覽、SEO/OG、無障礙）不被覆蓋。

**Non-Goals:**
- 後端／資料庫、送出實際寫入或傳送。
- 真實可訂容量（本次以假資料示範）。
- 客人確認信、店家通知。

## Decisions

- **DC → vanilla JS 移植**：以單一 `Resv` IIFE 管理 state（step/date/party/time/name/phone/note/submitted），狀態變更時整段 re-render modal 內容。忠實對應原 DCLogic 的 `renderVals`。
  - 替代方案：引入輕量框架——否決，違反零建置。
- **輸入不整段重繪**：Step 2 的姓名/手機輸入只更新「下一步」按鈕的 enabled 狀態（`syncStep2Buttons`），不整段 re-render，避免每次按鍵讓 input 失焦。
- **可訂時段為決定性假資料**：依日期 `seed`（`(seed+i*3)%4!==0`）算出滿/空，週三回空陣列（公休）。純為示範，規格明載為假資料。
- **「今天」用真實 `new Date()`**：原 DC 版寫死 2026-07-13；standalone 改用真實今日，過去日期即時禁用，較符合真實站台。
- **Modal 無障礙與開闔**：`role="dialog"`/`aria-modal`、ESC 關閉、點背景關閉、關閉鈕 aria-label。

## Risks / Trade-offs

- [送出後顯示「我們已收到您的訂位」，但實際哪都沒送] → 這是前端原型的固有落差；成功文案在接後端前**不應對外上線當真實訂位用**，列為 Open Question 與後續 change 前置條件。
- [假可訂資料可能誤導評審者以為是真實供應] → 規格明載為示範假資料；評審情境可接受，正式上線前須替換。
- [整段 re-render 可能影響捲動位置或焦點] → Step 2 例外處理；其餘步驟無長輸入，影響可忽略。

## Open Questions

- 送出去向：後端 API 還是表單服務（如 Formspree）？（另開 change）
- 成功文案在未接後端前是否需改為「我們會盡快與您確認」以免誤導？
- 真實可訂容量／店家日曆的資料來源。
