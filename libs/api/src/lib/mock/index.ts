import { Article, Category, Comment, User } from '@org/types';

// --- Users (至少八筆) ---
export const mockUsers: User[] = [
  { id: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', name: 'Alice Chen' },
  { id: 'b2c3d4e5-2222-4bbb-9ccc-2345678901bc', name: 'Bob Lin' },
  { id: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', name: 'Charlie Wang' },
  { id: 'd4e5f6a7-4444-4ddd-beee-4567890123de', name: 'David Lee' },
  { id: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', name: 'Eve Wu' },
  { id: 'f6a7b8c9-6666-4fff-8aaa-6789012345fg', name: 'Frank Tseng' },
  { id: 'g7b8c9d0-7777-4aaa-8bbb-7890123456gh', name: 'Grace Huang' },
  { id: 'h8c9d0e1-8888-4bbb-9ccc-8901234567hi', name: 'Hank Chang' },
];

// --- Categories (五筆) ---
export const mockCategories: Category[] = [
  { id: 'technology', name: '科技' },
  { id: 'sports', name: '體育' },
  { id: 'business', name: '商業' },
  { id: 'health', name: '健康' },
  { id: 'entertainment', name: '娛樂' },
];

// --- Articles (五個分類，每個分類 5 篇，共 25 篇) ---
export const mockArticles: Article[] = [
  // ==================== 科技 (technology) ====================
  {
    id: 'tech-art-001',
    title: 'React 19 全新特性解析與實戰應用',
    summary: '深入探討 React 19 帶來的效能提升、Server Actions 以及全新 Hook 的實踐場景。',
    content: '在最新發佈的 React 19 中，React 團隊為前端工程師帶來了前所未有的開發體驗變革。\n\n最受矚目的功能非 Server Actions 與 Actions API 莫屬。這些全新 API 能大幅簡化資料提交與異步操作的狀態處理（例如使用全新的 useActionState 與 useOptimistic 進行樂觀更新）。\n\n此外，React 19 也優化了編譯器 React Compiler，將原本需要手動進行的 memo 記憶化操作完全自動化，這無疑將寫出更簡潔、效能更好的前端代碼。',
    imageUrl: 'https://picsum.photos/seed/react/800/400',
    publishedAt: '2026-05-30T10:00:00Z',
    commentCount: 3,
    categoryId: 'technology',
    authorId: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', // Alice
  },
  {
    id: 'tech-art-002',
    title: 'Nx Monorepo 實戰指南：建構企業級前端架構',
    summary: '如何從零開始利用 Nx 工具鏈管理多專案，並實現高度模組化與極速本地緩存。',
    content: '當一個企業的業務規模與專案數量快速增長時，傳統的多儲存庫（Multi-repo）往往會帶來依賴混亂、程式碼無法共享等嚴重痛點。\n\n單一儲存庫（Monorepo）架構在此背景下脫穎而出，而 Nx 則是目前生態系中最先進的 Monorepo 管理工具之一。\n\nNx 不僅提供了極為強大的程式碼生成器（Generators），能快速構建共享庫，還內建了「計算快取（Computation Caching）」與「受影響構建（Affected Builds）」，能聰明地辨識出僅有修改的部分並進行編譯，大幅縮短了持續整合（CI/CD）的等待時間。',
    imageUrl: 'https://picsum.photos/seed/nx/800/400',
    publishedAt: '2026-05-31T09:30:00Z',
    commentCount: 2,
    categoryId: 'technology',
    authorId: 'b2c3d4e5-2222-4bbb-9ccc-2345678901bc', // Bob
  },
  {
    id: 'tech-art-003',
    title: 'AI 大模型於前端開發的革命性突破',
    summary: '分析大語言模型如何深入輔助程式碼編寫、單元測試自動生成及前端設計稿直接轉為程式碼的最新演進。',
    content: '近兩年來人工智慧的爆發式增長，已經深刻改變了軟體工程師的工作模式。\n\n在前端開發領域，AI 助手已不僅僅是自動補全代碼那麼簡單。現在的先進智能助理能夠根據自然的對話上下文理解複雜的前端架構設計，直接為開發者生成完善的模組組件，甚至自動生成高覆蓋率的 Vitest 或 Playwright 測試案例。\n\n雖然許多人擔心 AI 是否會取代工程師，但業界普遍共識是：善用 AI 的工程師將會以前所未有的高效率超越競爭對手，將更多心力聚焦在核心的架構設計與極致的用戶體驗優化上。',
    imageUrl: 'https://picsum.photos/seed/ai-tech/800/400',
    publishedAt: '2026-06-01T08:00:00Z',
    commentCount: 1,
    categoryId: 'technology',
    authorId: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', // Charlie
  },
  {
    id: 'tech-art-004',
    title: 'WebAssembly 崛起：解鎖網頁端的高效能運算能力',
    summary: '探討 WebAssembly (Wasm) 的發展現況，以及它如何讓瀏覽器流暢運行大型 3D 遊戲與影音編輯工具。',
    content: '長期以來，JavaScript 一直是網頁端運算邏輯的唯一主宰。然而，隨著網頁應用程式越來越接近桌面應用的複雜度（如 3D 繪圖、高畫質影音剪輯、即時物理模擬），JavaScript 的執行效能逐漸面臨瓶頸。\n\nWebAssembly 的出現徹底打破了這一限制。\n\nWasm 作為一種低階的類組合語言格式，允許開發者使用 C++、Rust 或 Go 等高效能語言編寫核心演算法，並將其編譯後直接在瀏覽器中以接近原生的速度運行。像是知名設計工具 Figma 與 3D 引擎 Unity 等，都已高度依賴 Wasm 來提供極致流暢的網頁操作體驗。',
    imageUrl: 'https://picsum.photos/seed/wasm/800/400',
    publishedAt: '2026-05-25T14:20:00Z',
    commentCount: 1,
    categoryId: 'technology',
    authorId: 'd4e5f6a7-4444-4ddd-beee-4567890123de', // David
  },
  {
    id: 'tech-art-005',
    title: 'CSS Nesting 與原生變數：我們還需要預處理器嗎？',
    summary: '隨着現代瀏覽器對 CSS 原生嵌套與自訂屬性的完美支援，Sass/Less 等工具是否將淡出舞台？',
    content: '過去十幾年間，Sass、Less 與 Stylus 等 CSS 預處理器幾乎是每個網頁專案的必備工具，因為它們帶來了強大的嵌套語法、變數定義以及 Mixin 等高級功能。\n\n然而，近年來 W3C 標準委員會進展神速，CSS 的原生功能已發生了翻天覆地的變化。\n\n現代瀏覽器現在已經全面支持了原生的 CSS Nesting（嵌套），並且 CSS 自訂屬性（變數）具備了動態執行期修改的超強特性，這甚至超越了預處理器編譯期變數的範疇。再加上 Tailwind CSS 等實用工具類框架的盛行，越來越多開發者開始反思：我們是否真的還需要額外的 Sass 編譯步驟？',
    imageUrl: 'https://picsum.photos/seed/css/800/400',
    publishedAt: '2026-05-28T11:10:00Z',
    commentCount: 0,
    categoryId: 'technology',
    authorId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
  },

  // ==================== 體育 (sports) ====================
  {
    id: 'sports-art-001',
    title: '2026 季後賽總決賽賽況：最後一秒神奇三分逆轉勝！',
    summary: '昨晚的決賽高潮迭起，客場球隊在最後一刻靠著絕殺三分球奪下總冠軍。',
    content: '這是一場足以載入史冊的總決賽生死戰！\n\n兩隊整場比賽緊咬比分，防守強度堪稱窒息。直到第四節最後 3 秒鐘，主場球隊還領先兩分，全場球迷已經準備好迎接勝利慶典。\n\n此時客場王牌射手接球，在雙人包夾的情況下，頂著防守於右側底角起跳。球在空中劃出一道無比美麗的弧線，並隨著槍響哨音，空心刷入籃網！絕殺！這一記價值連城的三分球不僅帶走了勝利，也讓球隊捧起了夢寐以求的年度總冠軍獎盃。',
    imageUrl: 'https://picsum.photos/seed/basketball/800/400',
    publishedAt: '2026-05-29T21:15:00Z',
    commentCount: 2,
    categoryId: 'sports',
    authorId: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', // Charlie
  },
  {
    id: 'sports-art-002',
    title: '奧運會全新競技項目揭曉，街舞與滑板掀起年輕新浪潮',
    summary: '國際奧委會宣布將更多極限運動與流行文化項目列入正式比賽，試圖重塑體育新形象。',
    content: '國際奧林匹克委員會（IOC）近日正式公布了下一屆夏季奧運會的全新競賽項目名單。\n\n其中，霹靂舞（Breaking）、滑板（Skateboarding）以及極限單車（BMX）等深具街頭潮流色彩的運動成為了全場矚目的焦點。\n\n分析指出，隨著傳統體育賽事的觀眾年齡層逐年攀升，國際奧委會正積極尋求變革，希望藉由融合街頭流行文化與高超技巧的極限運動，重新抓回全球年輕世代的目光與熱情。可以預見，未來的奧運舞台將會更加多元、動感且充滿青春的張力。',
    imageUrl: 'https://picsum.photos/seed/skate/800/400',
    publishedAt: '2026-05-30T15:45:00Z',
    commentCount: 1,
    categoryId: 'sports',
    authorId: 'd4e5f6a7-4444-4ddd-beee-4567890123de', // David
  },
  {
    id: 'sports-art-003',
    title: '傳奇球星宣布退役，回顧 20 年輝煌職業生涯',
    summary: '體壇一代巨星召開記者會宣告高掛球鞋，動人演說感動全球億萬球迷。',
    content: '「每個精彩的故事都有謝幕的時刻，而我的時刻就是現在了。」\n\n昨晚，全球體壇最偉大的傳奇球星之一，在萬眾矚目的記者會上正式宣布退役。這場記者會吸引了數百家國際媒體到場，直播觀看人數更是打破了體育史紀錄。\n\n在長達 20 年的職業生涯中，他無數次在逆境中帶領隊伍反敗為勝，贏得了十多次年度 MVP，並帶領國家隊登頂世界之巔。無數隊友、對手與球迷紛紛在社群平台上發文致敬，感謝他為這項運動所帶來的優雅、拼勁與無與倫比的精神力量。',
    imageUrl: 'https://picsum.photos/seed/legend/800/400',
    publishedAt: '2026-06-01T06:30:00Z',
    commentCount: 1,
    categoryId: 'sports',
    authorId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
  },
  {
    id: 'sports-art-004',
    title: '科技與運動的無縫結合：智慧穿戴如何改寫賽事訓練',
    summary: '從心率監測到即時肌肉疲勞度分析，現代科技設備如何幫助運動員突破生理極限。',
    content: '現代體育競技的比拼，早已不單單是天賦與體能的競爭，更是一場頂尖科技的博弈。\n\n如今，各國頂尖代表隊都在訓練中引進了最新一代的微型智慧穿戴裝置。這些感測器能以毫秒為單位，即時收集運動員的心率變異度（HRV）、肌肉氧飽和度、身體重心的細微偏移甚至是體溫變化。\n\n教練團能透過大數據分析，精準拿捏訓練量與恢復期的黃金比例，防範潛在的肌肉拉傷與運動傷害，讓運動員在踏上賽場的瞬間，身體狀況永遠處於最巔峰的百分之百狀態。',
    imageUrl: 'https://picsum.photos/seed/smart-wear/800/400',
    publishedAt: '2026-05-24T10:15:00Z',
    commentCount: 0,
    categoryId: 'sports',
    authorId: 'f6a7b8c9-6666-4fff-8aaa-6789012345fg', // Frank
  },
  {
    id: 'sports-art-005',
    title: '2026 世界盃分組抽籤名單出爐，死亡之組花落誰家？',
    summary: '四年一度的足球盛會分組抽籤正式揭曉，兩大傳統歐洲強權不幸抽在同組展開激戰。',
    content: '全球無數足球迷屏息以待的 2026 世界盃足球賽分組抽籤儀式，於今日凌晨在主辦國隆重舉行。\n\n本屆賽事首次擴軍，競爭之激烈堪稱史上之最。而最受議論的無疑是 C 組——兩大歐洲頂級豪門、南美勁旅以及非洲黑馬竟然巧合地被抽在同一個小組，組成了名副其實的「死亡之組」。\n\n各大體育台的分析師紛紛表示，這個小組的每一場比賽都將等同於決賽難度，任何一場失誤都可能導致提早打道回府，精彩程度絕對不容錯過！',
    imageUrl: 'https://picsum.photos/seed/football/800/400',
    publishedAt: '2026-05-27T08:50:00Z',
    commentCount: 0,
    categoryId: 'sports',
    authorId: 'g7b8c9d0-7777-4aaa-8bbb-7890123456gh', // Grace
  },

  // ==================== 商業 (business) ====================
  {
    id: 'business-art-001',
    title: '亞洲股市今日強勢反彈，科技股領漲大盤',
    summary: '受惠於全球晶片需求居高不下以及半導體龍頭亮眼財報，主要指數全面創下月新高。',
    content: '今日亞洲金融市場迎來了一片喜氣洋洋的榮景。\n\n在經歷了數週的盤整與觀望後，亞洲主要股市今日全面走高。最主要的推手來自於半導體龍頭企業公佈的超預期季度財報，這激勵了整體高科技硬體股的強勁買盤。\n\n財經分析師指出，全球數位轉型與 AI 計算晶片的需求在未來幾年內依然沒有降溫的跡象，這為科技板塊提供了極具韌性的價值支撐，吸引了大量外資與長期機構投資者的資金回流。',
    imageUrl: 'https://picsum.photos/seed/market/800/400',
    publishedAt: '2026-05-31T14:00:00Z',
    commentCount: 1,
    categoryId: 'business',
    authorId: 'd4e5f6a7-4444-4ddd-beee-4567890123de', // David
  },
  {
    id: 'business-art-002',
    title: '全球供應鏈重組：跨國企業面臨的多元避險策略',
    summary: '地緣政治因素與多變關稅政策，正迫使製造業巨頭將工廠轉移至東南亞與拉丁美洲。',
    content: '近年來，地緣政治的摩擦與氣候變遷帶來的極端天氣，讓「單一供應鏈」的脆弱性展露無疑。\n\n為了降低斷鏈風險，全球許多大型跨國企業正在加速實行「China+1」甚至「China+N」的多元配置戰略。東南亞國家如越南、泰國、馬來西亞，以及臨近北美市場的墨西哥，正成為這波製造業轉移風潮的最大受益者。\n\n然而，轉移工廠並非易事，跨國企業必須重新評估當地的基礎建設、熟練勞工供給以及文化整合等全新商業課題。',
    imageUrl: 'https://picsum.photos/seed/supply/800/400',
    publishedAt: '2026-05-30T11:20:00Z',
    commentCount: 1,
    categoryId: 'business',
    authorId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
  },
  {
    id: 'business-art-003',
    title: 'ESG 綠色金融新浪潮，如何影響中小企業融資難度？',
    summary: '環境、社會與公司治理 (ESG) 評級已成為銀行放貸的重要依據，未跟上的企業將面臨更高利率。',
    content: '氣候變遷不再只是公益話題，它已經深刻改變了全球金融市場的遊戲規則。\n\n現今，各大國際銀行與投資機構在進行企業放款評估時，除了傳統的負債比、流動比等財務指標外，都已強制引進 ESG（環境保護、社會責任、公司治理）審查流程。\n\n這意味著，無法提出具體碳減排計畫或缺乏良好勞工保護制度的中小企業，未來在向銀行融資時，可能面臨更高的貸款利率，甚至直接遭到婉拒。如何進行綠色轉型，已成為所有中小企業主面臨的生死考驗。',
    imageUrl: 'https://picsum.photos/seed/esg/800/400',
    publishedAt: '2026-05-26T16:15:00Z',
    commentCount: 1,
    categoryId: 'business',
    authorId: 'f6a7b8c9-6666-4fff-8aaa-6789012345fg', // Frank
  },
  {
    id: 'business-art-004',
    title: '遠端辦公新常態：混合工作模式對都市商辦的長期衝擊',
    summary: '越來越多科技企業將遠端與進辦公室混合實施，使得都會精華區的商辦空置率持續攀升。',
    content: '疫情雖然已經遠去，但它所留下的「混合工作模式（Hybrid Work）」卻深遠地改寫了白領階級的日常生活與商業地產的生態。\n\n最新調查數據顯示，都會精華地段的 A 級商業辦公大樓空置率達到了十年來的新高。許多科技巨頭紛紛縮減辦公室租賃面積，轉而推行輪流座位制與靈活辦公空間。\n\n這不僅對不動產開發商造成了財務壓力，也直接衝擊了圍繞在商辦周邊的餐飲業、零售業與都市大眾運輸的營收結構。',
    imageUrl: 'https://picsum.photos/seed/office/800/400',
    publishedAt: '2026-05-23T09:40:00Z',
    commentCount: 0,
    categoryId: 'business',
    authorId: 'g7b8c9d0-7777-4aaa-8bbb-7890123456gh', // Grace
  },
  {
    id: 'business-art-005',
    title: '訂閱制經濟面臨瓶頸？消費者開始出現「訂閱疲勞」',
    summary: '從影音串流、軟體工具到日常咖啡，過多的訂閱帳單讓消費者開始主動進行大掃除。',
    content: '過去幾年間，「訂閱制（Subscription Model）」被譽為最完美的商業模式，因為它能為企業帶來穩定、可預測的經常性收入。然而，任何好點子一旦被過度複製，就會走向反面。\n\n如今，從影音串流（Netflix, Disney+）、軟體（Adobe, Office）、遊戲（Game Pass）到線下實體的每日咖啡、鮮花遞送，消費者每個月的信用卡帳單充斥著密密麻麻的小額訂閱扣款。\n\n市調機構指出，在通膨壓力下，消費者已展現出嚴重的「訂閱疲勞（Subscription Fatigue）」，開始主動退訂低頻率使用的服務，企業獲客與留客的難度與成本正在急遽攀升。',
    imageUrl: 'https://picsum.photos/seed/subscribe/800/400',
    publishedAt: '2026-05-20T13:25:00Z',
    commentCount: 0,
    categoryId: 'business',
    authorId: 'h8c9d0e1-8888-4bbb-9ccc-8901234567hi', // Hank
  },

  // ==================== 健康 (health) ====================
  {
    id: 'health-art-001',
    title: '每日步行萬步的健康迷思？科學研究給出最佳解答',
    summary: '醫學界最新大數據分析指出，對多數人而言，達到某個特定步數後，健康益處便會進入邊際效益遞減。',
    content: '「每天一定要走一萬步才健康嗎？」這個深植人心的健康觀念，最初其實只是 1965 年日本一家計步器廠商為了宣傳商品而設計的行銷口號，而非基於科學實證。\n\n近日，哈佛醫學院發表了一份針對數萬名受試者進行的長期大數據分析報告。\n\n研究結果顯示，隨著每天步數的增加，死亡率確實會顯著下降，但這種健康益處在達到「約 7500 步」左右時便會進入高原期。也就是說，每天走 7500 步與走一萬步對預防心血管疾病的成效幾乎沒有統計學上的顯著差異。對於膝關節退化或時間有限的人來說，適度、快步走 7000 多步就是最有效益的運動目標了。',
    imageUrl: 'https://picsum.photos/seed/walk/800/400',
    publishedAt: '2026-05-30T07:30:00Z',
    commentCount: 2,
    categoryId: 'health',
    authorId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
  },
  {
    id: 'health-art-002',
    title: '控糖飲食法：如何避免精緻澱粉帶來的「食物昏迷」',
    summary: '午餐過後總是昏昏欲睡？營養師教你如何調整飲食順序，平穩血糖並維持午後的高專注力。',
    content: '你是否也有過這種經驗：中午剛吃完一碗排骨飯或乾麵，下午兩點一到，就覺得眼皮沈重、腦袋一片空白、完全無法專注？這種狀態在醫學上被稱為「食物昏迷（Food Coma）」，主要是因為攝取過多精緻碳水化合物，導致血糖急遽飆升後，身體分泌大量胰島素試圖降血糖，進而引發血糖像過山車般的劇烈震盪。\n\n營養師建議，想要維持平穩的血糖與專注力，可以採取「蔬菜 → 蛋白質 → 碳水化合物」的進食順序，並且盡量以糙米、地瓜等非精緻澱粉取代白米、白麵條，就能輕鬆告別午後疲勞。',
    imageUrl: 'https://picsum.photos/seed/sugar/800/400',
    publishedAt: '2026-05-31T11:15:00Z',
    commentCount: 2,
    categoryId: 'health',
    authorId: 'f6a7b8c9-6666-4fff-8aaa-6789012345fg', // Frank
  },
  {
    id: 'health-art-003',
    title: '睡眠呼吸中止症：現代人的隱形健康殺手',
    summary: '晚上睡得很久白天卻依舊疲憊不堪？小心打呼可能是睡眠呼吸中止的警訊，應及早篩檢與治療。',
    content: '「打呼代表睡得很香」是一個極為危險的健康誤區。\n\n睡眠呼吸中止症（Sleep Apnea）指的是在睡眠期間，呼吸道因為肌肉塌陷或結構問題而反覆出現完全或部分阻塞，導致呼吸中斷、血氧濃度暴跌，使大腦被迫反覆微覺醒。\n\n這種病症不僅會造成白天精神不振、記憶力衰退，長期下來更會成倍增加罹患高血壓、心肌梗塞、中風等心血管重症的機率。若您有嚴重打鼾、白天異常嗜睡或伴侶觀察到您睡覺時呼吸會短暫停止，強烈建議及早到醫學中心進行睡眠生理檢查。',
    imageUrl: 'https://picsum.photos/seed/sleep/800/400',
    publishedAt: '2026-05-28T09:00:00Z',
    commentCount: 1,
    categoryId: 'health',
    authorId: 'g7b8c9d0-7777-4aaa-8bbb-7890123456gh', // Grace
  },
  {
    id: 'health-art-004',
    title: '心靈微排毒：現代白領必學的「正念減壓」練習',
    summary: '在高壓、碎片化的工作环境中，利用每天五分鐘呼吸覺察，重拾內心平靜與思緒清晰度。',
    content: '身處數位時代，現代人的大腦每天都被無數的 Email、即時訊息以及社群推播所轟炸，長期處於一種慢性的「資訊超載」與焦慮狀態。\n\n正念減壓（MBSR）是近年來廣受心理學家與大型科技企業（如 Google、Intel）推崇的自我療癒法。正念的本質非常簡單：就是「不帶評判地，將注意力帶回當下」。\n\n每天只需抽出五分鐘，閉上雙眼，將專注力全然放在一吸一呼的感覺上。當思緒飄走時，輕柔地察覺並把它帶回來。這種簡單的練習能有效降低壓力荷爾蒙，重塑大腦的專注力與情緒調節能力。',
    imageUrl: 'https://picsum.photos/seed/mindful/800/400',
    publishedAt: '2026-05-22T15:30:00Z',
    commentCount: 0,
    categoryId: 'health',
    authorId: 'h8c9d0e1-8888-4bbb-9ccc-8901234567hi', // Hank
  },
  {
    id: 'health-art-005',
    title: '阻力訓練（重訓）對預防中老年肌肉流失的決定性成效',
    summary: '隨著年齡增長肌肉流失會加速，單靠有氧運動（如散步、慢跑）已無法有效對抗肌少症。',
    content: '許多人誤以為重訓、舉重只是年輕人鍛鍊身材的專利，中老年人只要做做甩手操、散步就足夠了。然而，生理學研究指出，人體在 30 歲過後，肌肉量會以每年 1% 到 2% 的速度流失，60 歲後流失更會加速，這在醫學上被稱為「肌少症（Sarcopenia）」。\n\n肌少症不僅會讓基礎代謝率下降導致肥胖，還會大幅增加中老年人跌倒、骨折甚至失去生活自理能力的風險。\n\n最新臨床指南指出，單靠有氧運動無法阻止肌肉流失。只有適度的阻力訓練（阻力橡皮筋、輕量啞鈴或深蹲），給予肌肉足夠的刺激，才能有效刺激肌肉合成、增強骨密度，是保證晚年生活品質的黃金良藥。',
    imageUrl: 'https://picsum.photos/seed/strength/800/400',
    publishedAt: '2026-05-25T08:00:00Z',
    commentCount: 0,
    categoryId: 'health',
    authorId: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', // Alice
  },

  // ==================== 娛樂 (entertainment) ====================
  {
    id: 'ent-art-001',
    title: '年度電影頒獎典禮盛大揭幕：得獎名單跌破專家眼鏡！',
    summary: '本屆典禮精彩紛呈，黑馬獨立製片擊敗好萊塢億萬鉅作，一舉包攬多項核心大獎。',
    content: '昨晚，全球影迷矚目的年度電影頒獎典禮在星光閃耀的大劇院隆重舉行。\n\n本屆的評審口味明顯轉向，過去被視為拿獎熱門的幾部好萊塢科幻特效大片紛紛鎩羽而歸。相反地，一部探討人性疏離、製作預算僅有數百萬美元的文藝獨立影片成為了最大黑馬，一舉奪下了「最佳導演」、「最佳編劇」以及分量最重的「最佳劇情片」大獎！\n\n新銳導演在發表得獎感言時激動落淚，表示這項肯定證明了即使沒有龐大的 CGI 特效，只要故事足夠真摯，依然能夠深深打動人心。',
    imageUrl: 'https://picsum.photos/seed/movie/800/400',
    publishedAt: '2026-05-31T22:00:00Z',
    commentCount: 2,
    categoryId: 'entertainment',
    authorId: 'a1b2c3d4-1111-4aaa-8bbb-1234567890ab', // Alice
  },
  {
    id: 'ent-art-002',
    title: '串流影音巨頭推科幻鉅作，首週末播放量刷新影史紀錄',
    summary: '耗資數億美元的史詩級原創影集上線，精湛特效與反轉劇情在社群掀起極高討論熱度。',
    content: '影視圈的競爭在今年進入了白熱化階段。近日，全球龍頭串流影音平台推出了籌備已久的年度旗艦級科幻影集。\n\n這部改編自暢銷硬科幻小說的影集，耗資數億美元進行拍攝與後期特效製作。上線僅僅三天，官方公佈的全球累積播放用戶數便打破了開播紀錄。\n\n影評人盛讚其視覺效果完全達到了 IMAX 電影院級別，而劇中探討的「數位意識永生」以及道德悖論，更在各大論壇引發了鋪天蓋地的解析與討論浪潮，熱度預估將延續數月。',
    imageUrl: 'https://picsum.photos/seed/scifi/800/400',
    publishedAt: '2026-06-01T09:00:00Z',
    commentCount: 2,
    categoryId: 'entertainment',
    authorId: 'b2c3d4e5-2222-4bbb-9ccc-2345678901bc', // Bob
  },
  {
    id: 'ent-art-003',
    title: '黑膠唱片復古回潮：年輕一代為何著迷於「不完美音質」',
    summary: '在數位串流隨手可得的今天，實體黑膠唱片銷售額卻逆勢成長，背後隱含的情懷與儀式感解析。',
    content: '在 Spotify 與 Apple Music 等數位串流軟體能提供無損音質、隨點隨聽的便利時代，一個有趣的文化反差正在上演：實體黑膠唱片（Vinyl）的銷售額創下了自 1980 年代以來的最高峰，且主要購買主力竟是從未經歷過類比時代的 Z 世代年輕人。\n\n專家分析，黑膠唱片的魅力恰恰在於它的「不完美」。\n\n唱針接觸唱片時發出的微弱沙沙聲（劈啪聲），帶給人一種數位音樂無法複製的溫暖溫度與真實感。更重要的是，從挑選唱片、將其從封套取出、放在唱盤上到小心翼翼放下唱針，這一整套過程所帶來的「儀式感」，是現代人對極速、碎片化數位生活的無聲反叛。',
    imageUrl: 'https://picsum.photos/seed/vinyl/800/400',
    publishedAt: '2026-05-24T16:40:00Z',
    commentCount: 1,
    categoryId: 'entertainment',
    authorId: 'c3d4e5f6-3333-4ccc-addd-3456789012cd', // Charlie
  },
  {
    id: 'ent-art-004',
    title: '搖滾樂團世界巡迴演唱會門票秒殺，引發售票系統大當機',
    summary: '數百萬粉絲同時湧入搶購十萬張門票，主辦單位出面致歉並承諾積極打擊黃牛。',
    content: '這場堪稱「世紀重聚」的傳奇搖滾樂團世界巡迴演唱會，在昨日售票系統開放的瞬間，立刻引發了海嘯般的熱潮。\n\n據售票平台統計，開放購票的第 1 秒鐘，便有高達 300 萬個獨立 IP 同時湧入系統，只為爭奪僅有 10 萬張的門票。這導致了售票系統的伺服器瞬間過載並當機長達兩小時，引發粉絲強烈不滿。\n\n更令樂迷憤怒的是，開賣後不到 5 分鐘，各大拍賣網站便出現了翻了數倍的「黃牛票」。主辦單位隨後召開記者會，除了為系統當機致歉外，也承諾將會對異常訂單進行人工審核退票，全力杜絕不正當搶票行徑。',
    imageUrl: 'https://picsum.photos/seed/concert/800/400',
    publishedAt: '2026-05-28T12:00:00Z',
    commentCount: 0,
    categoryId: 'entertainment',
    authorId: 'd4e5f6a7-4444-4ddd-beee-4567890123de', // David
  },
  {
    id: 'ent-art-005',
    title: '獨立遊戲大黑馬！小成本製作在國際遊戲節斬獲多項大獎',
    summary: '僅由三人團隊歷時三年開發的像素風解謎遊戲，憑藉驚豔敘事與獨特玩法征服了全球玩家。',
    content: '在被大型 3A 級遊戲巨頭（如 EA、Ubisoft）高預算、極致畫面的商業大作所充斥的遊戲市場中，一部小巧精緻的獨立遊戲在近日舉辦的國際遊戲節上大放異彩，無疑是個令人振奮的消息。\n\n這款名為《時空回音》的像素風解謎遊戲，是由一個僅有三人的核心團隊在自家臥室歷時三年、全靠熱情支撐開發出來的。\n\n沒有頂級的光線追蹤畫面，它憑藉著精妙絕倫的時空交錯敘事手法與讓人拍案叫絕的關卡機關設計，在遊戲節上擊敗了眾多高成本商業大作，奪得了「最佳敘事獎」與「年度最佳獨立遊戲」雙冠王，目前在 Steam 平台的玩家好評率更是高達 98%。',
    imageUrl: 'https://picsum.photos/seed/game/800/400',
    publishedAt: '2026-05-22T20:15:00Z',
    commentCount: 0,
    categoryId: 'entertainment',
    authorId: 'e5f6a7b8-5555-4eee-cfff-5678901234ef', // Eve
  },
];

// --- Comments (共 20 筆，均勻分佈在不同文章上) ---
export const mockComments: Comment[] = [
  // tech-art-001 (React 19)
  {
    id: 'comm-001',
    content: '這篇介紹寫得很詳細，期待 React 19 正式上線！特別是 Server Actions 可以少寫好多 boilerplate code。',
    createdAt: '2026-05-30T11:05:00Z',
    likeCount: 18,
    dislikeCount: 1,
    userId: 'Bob Lin',
    articleId: 'tech-art-001',
  },
  {
    id: 'comm-002',
    content: '不知道舊專案遷移到 React 19 的成本高不高？我們專案有用了很多第三方套件。',
    createdAt: '2026-05-30T12:30:00Z',
    likeCount: 6,
    dislikeCount: 0,
    userId: 'Charlie Wang',
    articleId: 'tech-art-001',
  },
  {
    id: 'comm-003',
    content: '自動 memo 化真的是前端福音，以前老是要糾結要不要加 useMemo，現在終於能交給編譯器了！',
    createdAt: '2026-05-30T14:15:00Z',
    likeCount: 12,
    dislikeCount: 0,
    userId: 'David Lee',
    articleId: 'tech-art-001',
  },

  // tech-art-002 (Nx Monorepo)
  {
    id: 'comm-004',
    content: 'Nx 確實好用，我們公司上個月剛轉移過去，本來需要跑 20 分鐘的 CI 現在 5 分鐘就跑完了，推薦！',
    createdAt: '2026-05-31T10:15:00Z',
    likeCount: 22,
    dislikeCount: 0,
    userId: 'David Lee',
    articleId: 'tech-art-002',
  },
  {
    id: 'comm-005',
    content: '但是 Nx 的初始學習曲線對剛入行的新手來說有點陡峭，很多設定跟路徑要摸索一陣子。',
    createdAt: '2026-05-31T11:20:00Z',
    likeCount: 9,
    dislikeCount: 1,
    userId: 'Eve Wu',
    articleId: 'tech-art-002',
  },

  // tech-art-003 (AI)
  {
    id: 'comm-006',
    content: '現在每天都用 AI 助手幫我寫單元測試，真的省下了將近一半的時間，拿來思考業務架構好用多了。',
    createdAt: '2026-06-01T08:45:00Z',
    likeCount: 30,
    dislikeCount: 2,
    userId: 'Alice Chen',
    articleId: 'tech-art-003',
  },

  // tech-art-004 (Wasm)
  {
    id: 'comm-007',
    content: 'Rust + WebAssembly 拿來跑影音濾鏡渲染真的非常快，效能瓶頸瞬間就被打開了！',
    createdAt: '2026-05-25T15:30:00Z',
    likeCount: 14,
    dislikeCount: 0,
    userId: 'Frank Tseng',
    articleId: 'tech-art-004',
  },

  // sports-art-001 (決賽絕殺)
  {
    id: 'comm-008',
    content: '昨晚看直播，球投出去的那一瞬間我整個人直接尖叫站起來！太神啦！這記絕殺三分球！',
    createdAt: '2026-05-29T21:30:00Z',
    likeCount: 88,
    dislikeCount: 2,
    userId: 'Eve Wu',
    articleId: 'sports-art-001',
  },
  {
    id: 'comm-009',
    content: '主場球隊的防守其實已經做到極限了，兩個人都封到臉上了。只能說這球真的是巨星價值的展現。',
    createdAt: '2026-05-29T22:00:00Z',
    likeCount: 42,
    dislikeCount: 0,
    userId: 'Bob Lin',
    articleId: 'sports-art-001',
  },

  // sports-art-002 (奧運街舞)
  {
    id: 'comm-010',
    content: '很期待霹靂舞，這項運動的難度跟觀賞性絕對不亞於體操，希望能帶動更多街頭文化的推廣。',
    createdAt: '2026-05-30T16:20:00Z',
    likeCount: 25,
    dislikeCount: 3,
    userId: 'Grace Huang',
    articleId: 'sports-art-002',
  },

  // sports-art-003 (球星退役)
  {
    id: 'comm-011',
    content: '我的青春結束了...謝謝你 20 年來為球迷帶來的感動，你永遠是歷史上最偉大的球員！',
    createdAt: '2026-06-01T07:15:00Z',
    likeCount: 120,
    dislikeCount: 1,
    userId: 'Hank Chang',
    articleId: 'sports-art-003',
  },

  // business-art-001 (亞股)
  {
    id: 'comm-012',
    content: '科技半導體龍頭這季財報真的太狂，展望直接拉滿，看來這波科技牛市還能再跑一陣子。',
    createdAt: '2026-05-31T14:30:00Z',
    likeCount: 15,
    dislikeCount: 0,
    userId: 'Alice Chen',
    articleId: 'business-art-001',
  },

  // business-art-002 (供應鏈)
  {
    id: 'comm-013',
    content: '製造業轉移非常考驗企業的跨國管理能力，當地的法規、罷工風險以及供應鏈的完整度都是挑戰。',
    createdAt: '2026-05-30T12:00:00Z',
    likeCount: 19,
    dislikeCount: 0,
    userId: 'Charlie Wang',
    articleId: 'business-art-002',
  },

  // business-art-003 (ESG)
  {
    id: 'comm-014',
    content: '現在大企業都會要求供應商提供碳足跡報告，中小企業如果不跟上轉型，真的會直接被排除在供應鏈之外。',
    createdAt: '2026-05-26T17:00:00Z',
    likeCount: 31,
    dislikeCount: 1,
    userId: 'Hank Chang',
    articleId: 'business-art-003',
  },

  // health-art-001 (步行萬步)
  {
    id: 'comm-015',
    content: '這篇太實用了！每次為了湊滿一萬步都強迫自己走很久，走到膝蓋都開始痠痛。原來 7000 多步就夠了。',
    createdAt: '2026-05-30T08:15:00Z',
    likeCount: 54,
    dislikeCount: 0,
    userId: 'Grace Huang',
    articleId: 'health-art-001',
  },
  {
    id: 'comm-016',
    content: '重點其實是走路的「強度」，慢吞吞走一萬步，效果可能還不如快步走 20 分鐘。',
    createdAt: '2026-05-30T09:00:00Z',
    likeCount: 29,
    dislikeCount: 0,
    userId: 'Bob Lin',
    articleId: 'health-art-001',
  },

  // health-art-002 (控糖食物昏迷)
  {
    id: 'comm-017',
    content: '自從我午餐改吃低 GI 便當，而且調整進食順序先吃蔬菜，下午真的就完全不會昏昏欲睡了！大推！',
    createdAt: '2026-05-31T12:00:00Z',
    likeCount: 38,
    dislikeCount: 1,
    userId: 'Eve Wu',
    articleId: 'health-art-002',
  },
  {
    id: 'comm-018',
    content: '精緻澱粉真的是高血糖的罪魁禍首，可是排骨飯跟乾麵真的好好吃，要完全戒掉實在太痛苦了。',
    createdAt: '2026-05-31T12:30:00Z',
    likeCount: 17,
    dislikeCount: 0,
    userId: 'Frank Tseng',
    articleId: 'health-art-002',
  },

  // health-art-003 (睡眠中止)
  {
    id: 'comm-019',
    content: '我爸以前也是打鼾超大聲，後來去做了睡眠檢查，戴了正壓呼吸器（CPAP）之後，白天的精神狀態好超多。',
    createdAt: '2026-05-28T10:15:00Z',
    likeCount: 40,
    dislikeCount: 0,
    userId: 'Charlie Wang',
    articleId: 'health-art-003',
  },

  // ent-art-001 (電影頒獎)
  {
    id: 'comm-020',
    content: '那部得獎的獨立片《靜默迴聲》真的超震撼，雖然全片對白不到十句，但運鏡跟演員的眼神太有渲染力了。',
    createdAt: '2026-05-31T22:30:00Z',
    likeCount: 47,
    dislikeCount: 2,
    userId: 'Grace Huang',
    articleId: 'ent-art-001',
  },
  {
    id: 'comm-021',
    content: '商業大片看多了真的會審美疲勞，很高興這次的評審團願意給予這種小成本但極具深度的藝術片最高肯定。',
    createdAt: '2026-05-31T23:10:00Z',
    likeCount: 33,
    dislikeCount: 0,
    userId: 'Bob Lin',
    articleId: 'ent-art-001',
  },

  // ent-art-002 (串流巨作)
  {
    id: 'comm-022',
    content: '第一季完結篇的那個反轉簡直絕了！我整個人呆在電視機前面五分鐘，好期待出第二季。',
    createdAt: '2026-06-01T09:40:00Z',
    likeCount: 65,
    dislikeCount: 1,
    userId: 'Hank Chang',
    articleId: 'ent-art-002',
  },
  {
    id: 'comm-023',
    content: '特效畫面真的沒話說，宇宙飛船的刻畫精細到不可思議。強烈建議一定要用 4K 電視配合家庭劇院看。',
    createdAt: '2026-06-01T10:15:00Z',
    likeCount: 28,
    dislikeCount: 0,
    userId: 'Alice Chen',
    articleId: 'ent-art-002',
  },

  // ent-art-003 (黑膠回潮)
  {
    id: 'comm-024',
    content: '黑膠唱片的封套根本就是一件巨大的藝術品，光是擺在客廳看著心情就很好，這才是實體音樂的靈魂！',
    createdAt: '2026-05-24T17:15:00Z',
    likeCount: 52,
    dislikeCount: 1,
    userId: 'David Lee',
    articleId: 'ent-art-003',
  },
];
