/**
 * @file formatDate.ts
 * @description 時間格式化工具函數，負責將標準的 ISO 8601 時間字串轉換為在地化的 YYYY/MM/DD HH:mm 格式。
 */

/**
 * formatDate 時間格式化工具
 * @description 使用原生 Intl.DateTimeFormat API 將傳入的 ISO 時間字串解析並轉換為 'Asia/Taipei'（台北時間），
 *              並以統一的 "年/月/日 時:分" 格式輸出，具備無效日期（Invalid Date）的防呆回傳。
 * @param {string} dateString - 欲格式化的 ISO 8601 時間字串 (例如 "2026-05-30T10:00:00Z")
 * @returns {string} 格式化後的台北時間字串 (如 "2026/05/30 18:00")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: string) => parts.find((part) => part.type === type)?.value || '';

  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  const hour = getPart('hour');
  const minute = getPart('minute');

  return `${year}/${month}/${day} ${hour}:${minute}`;
}

/**
 * 時區與顯示格式硬編碼 (複用性高原則):
 *  - 問題：`formatDate` 的時區（`Asia/Taipei`）與返回排版樣式（`YYYY/MM/DD HH:mm`）在工具函式內部被完全硬編碼寫死。若未來需要支援「多國時區切換（如美西時間）」或「非時間顯示（僅顯示年月日）」時，該工具將毫無重用性。
 *  - 改善：將時區與排版格式設定提取為可選的參數物件 `options?: { timeZone?: string; includeTime?: boolean; format?: string }` 傳入，並設定合理的預設值，保留擴充彈性，最大化該工具的通用複用價值。
 */
