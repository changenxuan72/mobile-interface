import { ExploreCategory, Post, Job, Product, ChatSession, Notification, Message, Review, Talent } from './types';

export const EXPLORE_CATEGORIES = [
  ExploreCategory.FOLLOWING,
  ExploreCategory.TALENTS,
  ExploreCategory.JOBS,
  ExploreCategory.ROOKIE,
];

// Helper to generate random number
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const ASPECTS = ['aspect-[3/4]', 'aspect-[1/1]', 'aspect-[9/16]'] as const;

export const MOCK_POSTS: Post[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `post-${i}`,
  title: [
    "極簡風格咖啡廳品牌識別設計",
    "金融科技 App UI Kit",
    "3D 抽象渲染系列",
    "攝影作品：城市叢林",
    "Logo 重塑概念",
    "網站 Landing Page UX 規劃",
    "京都旅遊 Vlog 縮圖設計",
    "永續包裝設計專案"
  ][i % 8],
  description: "這是一個關於形式與功能平衡的探索。專案重點在於現代美學與易用性之間的平衡。我花了三週時間調整配色方案，希望能呈現出溫暖而專業的感覺。",
  imageUrl: `https://picsum.photos/seed/${i * 123}/600/${[800, 600, 900][i % 3]}`,
  author: {
    id: `user-${i}`,
    name: [`Alex Chen`, `Sarah Wu`, `DesignBot`, `CreativeFlow`, `ArtisanHub`][i % 5],
    avatar: `https://picsum.photos/seed/${i * 99}/100/100`,
    isOpenForWork: i % 3 === 0, // Every 3rd user is open for work
  },
  likes: randomInt(40, 5000),
  tags: ['Design', 'Minimal', 'UI/UX'],
  aspectRatio: ASPECTS[i % 3],
}));

export const JOB_CATEGORIES = ["全部", "平面設計", "程式開發", "行銷", "影音剪輯", "文案寫作"];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: '金融 App 資深 UI/UX 設計師',
    description: '我們正在尋找一位經驗豐富的 UI/UX 設計師來改版我們的行動銀行應用程式。目標是簡化用戶流程並現代化視覺識別。需具備 Figma 和 Prototyping 經驗。',
    client: { id: 'c1', name: 'FinTech Co.', avatar: 'https://picsum.photos/seed/fintech/100/100', isOpenForWork: false, rating: 4.8 },
    budget: '$3,000 - $5,000',
    deadline: '剩 2 週',
    tags: ['UI/UX', 'Figma', 'Mobile'],
    matchRate: 98,
    category: '平面設計',
    isUrgent: true,
    postedAt: '2小時前'
  },
  {
    id: 'job-2',
    title: '有機咖啡廳品牌識別 & Logo 設計',
    description: '需要為台北一家新開的有機咖啡連鎖店設計清新、現代的 Logo 和品牌規範。交付內容包括 Logo 變體、配色方案和字體搭配。',
    client: { id: 'c2', name: 'Bean & Leaf', avatar: 'https://picsum.photos/seed/coffee/100/100', isOpenForWork: false, rating: 4.5 },
    budget: '$800 - $1,200',
    deadline: '剩 5 天',
    tags: ['Branding', 'Logo', 'Vector'],
    matchRate: 85,
    category: '平面設計',
    postedAt: '5小時前'
  },
  {
    id: 'job-3',
    title: 'React 前端工程師 (儀表板開發)',
    description: '尋找前端開發人員使用 React 和 Tailwind CSS 構建響應式分析儀表板。API 已準備就緒。需要乾淨的代碼和性能優化。',
    client: { id: 'c3', name: 'DataViz Inc.', avatar: 'https://picsum.photos/seed/data/100/100', isOpenForWork: false, rating: 4.9 },
    budget: '$2,500 固定',
    deadline: '剩 1 個月',
    tags: ['React', 'TypeScript', 'Tailwind'],
    matchRate: 92,
    category: '程式開發',
    postedAt: '1天前'
  },
  {
    id: 'job-4',
    title: '短影音剪輯師 (TikTok/Reels)',
    description: '尋找創意影片剪輯師，每月製作 10 支短影音。我們提供原始素材。必須熟悉目前的流行趨勢和節奏。',
    client: { id: 'c4', name: 'Viral Studio', avatar: 'https://picsum.photos/seed/viral/100/100', isOpenForWork: false, rating: 4.2 },
    budget: '$500 / 月',
    deadline: '長期',
    tags: ['Video Editing', 'Premiere', 'CapCut'],
    matchRate: 78,
    category: '影音剪輯',
    isUrgent: true,
    postedAt: '3小時前'
  },
  {
    id: 'job-5',
    title: '科技部落格 SEO 寫手',
    description: '撰寫 4 篇關於 AI 趨勢的高質量 SEO 優化文章。每篇約 1500 字。語氣應專業但易於理解。',
    client: { id: 'c5', name: 'TechInsider', avatar: 'https://picsum.photos/seed/tech/100/100', isOpenForWork: false, rating: 4.7 },
    budget: '$200 / 篇',
    deadline: '剩 1 週',
    tags: ['Writing', 'SEO', 'AI'],
    matchRate: 65,
    category: '文案寫作',
    postedAt: '6小時前'
  },
   {
    id: 'job-6',
    title: 'Shopify 電商網站改版設計',
    description: '完全重新設計我們的 Shopify 商店。我們需要一個能反映我們奢侈時尚品牌形象的客製化主題。',
    client: { id: 'c6', name: 'Luxe Mode', avatar: 'https://picsum.photos/seed/fashion/100/100', isOpenForWork: false, rating: 5.0 },
    budget: '$4,000+',
    deadline: '剩 3 週',
    tags: ['Shopify', 'Web Design', 'Liquid'],
    matchRate: 88,
    category: '平面設計',
    postedAt: '1天前'
  }
];

export const MOCK_TALENTS: Talent[] = [
  {
    id: 't1',
    user: { id: 'u1', name: 'Alex Chen', avatar: 'https://picsum.photos/seed/u1/100/100', isOpenForWork: true, rating: 4.9 },
    title: '資深 UI/UX 設計師',
    bio: '專注於極簡主義與用戶體驗設計，擁有 5 年以上設計經驗，曾服務於多家科技新創。',
    skills: ['Figma', 'UI Design', 'App Design'],
    rate: '$50 / hr',
    category: '平面設計',
    completedCases: 45,
    responseRate: 98
  },
  {
    id: 't2',
    user: { id: 'u2', name: 'Jessica Lin', avatar: 'https://picsum.photos/seed/u2/100/100', isOpenForWork: true, rating: 4.8 },
    title: '全端工程師 (React/Node.js)',
    bio: '熱愛解決複雜問題，擅長建立可擴展的網頁應用程式。',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    rate: '$80 / hr',
    category: '程式開發',
    completedCases: 32,
    responseRate: 95
  },
  {
    id: 't3',
    user: { id: 'u3', name: 'Mark Wu', avatar: 'https://picsum.photos/seed/u3/100/100', isOpenForWork: false, rating: 4.7 },
    title: '專業影片剪輯與後製',
    bio: '讓每一幀畫面都充滿故事張力。熟練使用 Premiere Pro 與 After Effects。',
    skills: ['Premiere', 'After Effects', 'Color Grading'],
    rate: '$45 / hr',
    category: '影音剪輯',
    completedCases: 120,
    responseRate: 90
  },
  {
    id: 't4',
    user: { id: 'u4', name: 'Sophie Yang', avatar: 'https://picsum.photos/seed/u4/100/100', isOpenForWork: true, rating: 5.0 },
    title: '創意文案與社群小編',
    bio: '文字是有溫度的。我能為您的品牌創造獨特的聲音。',
    skills: ['Copywriting', 'SEO', 'Social Media'],
    rate: '$30 / hr',
    category: '文案寫作',
    completedCases: 68,
    responseRate: 100
  },
  {
    id: 't5',
    user: { id: 'u5', name: 'David Chang', avatar: 'https://picsum.photos/seed/u5/100/100', isOpenForWork: true, rating: 4.6 },
    title: '商業攝影師 & 修圖師',
    bio: '用鏡頭捕捉產品的靈魂。專精於美食與商品攝影。',
    skills: ['Photography', 'Lightroom', 'Retouching'],
    rate: '$150 / 專案',
    category: '平面設計',
    completedCases: 25,
    responseRate: 92
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'SaaS 儀表板 UI Kit (Figma)',
    coverUrl: 'https://picsum.photos/seed/uikit1/500/500',
    price: 1200,
    originalPrice: 1500,
    sales: 1250,
    rating: 4.9,
    author: { id: 'a1', name: 'DesignMaster', avatar: 'https://picsum.photos/seed/a1/50/50', isOpenForWork: true },
    category: 'UI Kit',
    isBestSeller: true
  },
  {
    id: 'prod-2',
    title: '電影感 Lightroom 風格檔 (10 Pack)',
    coverUrl: 'https://picsum.photos/seed/preset1/500/500',
    price: 450,
    sales: 890,
    rating: 4.7,
    author: { id: 'a2', name: 'CineLover', avatar: 'https://picsum.photos/seed/a2/50/50', isOpenForWork: false },
    category: '模版',
    isBestSeller: true
  },
  {
    id: 'prod-3',
    title: 'Procreate 日系水彩筆刷組',
    coverUrl: 'https://picsum.photos/seed/brush1/500/500',
    price: 300,
    sales: 2100,
    rating: 5.0,
    author: { id: 'a3', name: 'ArtDaily', avatar: 'https://picsum.photos/seed/a3/50/50', isOpenForWork: true },
    category: '模版',
    isBestSeller: true
  },
  {
    id: 'prod-4',
    title: 'Blender 3D 基礎到進階全攻略',
    coverUrl: 'https://picsum.photos/seed/course1/500/500',
    price: 2400,
    originalPrice: 3000,
    sales: 340,
    rating: 4.8,
    author: { id: 'a4', name: '3D Wiz', avatar: 'https://picsum.photos/seed/a4/50/50', isOpenForWork: false },
    category: '教程',
  },
  {
    id: 'prod-5',
    title: '現代極簡無襯線字體 - MonoSans',
    coverUrl: 'https://picsum.photos/seed/font1/500/500',
    price: 800,
    sales: 150,
    rating: 4.6,
    author: { id: 'a5', name: 'TypeFoundry', avatar: 'https://picsum.photos/seed/a5/50/50', isOpenForWork: true },
    category: '字型',
  },
  {
    id: 'prod-6',
    title: '社群媒體行銷模版 (Canva)',
    coverUrl: 'https://picsum.photos/seed/social1/500/500',
    price: 200,
    sales: 3200,
    rating: 4.5,
    author: { id: 'a6', name: 'GrowthHacker', avatar: 'https://picsum.photos/seed/a6/50/50', isOpenForWork: false },
    category: '模版',
  },
  {
    id: 'prod-7',
    title: 'Cyberpunk 3D 模型資產包',
    coverUrl: 'https://picsum.photos/seed/3d1/500/500',
    price: 1500,
    sales: 420,
    rating: 4.9,
    author: { id: 'a7', name: 'NeoCity', avatar: 'https://picsum.photos/seed/a7/50/50', isOpenForWork: true },
    category: '模版',
  },
  {
    id: 'prod-8',
    title: 'Notion 生產力管理模版',
    coverUrl: 'https://picsum.photos/seed/notion1/500/500',
    price: 150,
    sales: 5600,
    rating: 4.8,
    author: { id: 'a8', name: 'ProdGuru', avatar: 'https://picsum.photos/seed/a8/50/50', isOpenForWork: false },
    category: '模版',
  }
];

// Inbox Mock Data
export const MOCK_CHATS: ChatSession[] = [
  {
    id: 'chat-1',
    partner: { id: 'u1', name: 'FinTech Co.', avatar: 'https://picsum.photos/seed/fintech/100/100', isOpenForWork: false },
    lastMessage: '請問關於第三階段的驗收有什麼問題嗎？',
    timestamp: '10:30',
    unreadCount: 2,
    status: 'pending_review',
    jobTitle: '金融 App UI/UX 改版',
    jobProgress: 80
  },
  {
    id: 'chat-2',
    partner: { id: 'u2', name: 'Sarah Wu', avatar: 'https://picsum.photos/seed/user-1/100/100', isOpenForWork: true },
    lastMessage: '好的，我會再調整一下配色。',
    timestamp: '昨天',
    unreadCount: 0,
    status: 'active',
    jobTitle: '品牌 Logo 設計',
    jobProgress: 40
  },
  {
    id: 'chat-3',
    partner: { id: 'u3', name: 'David Lee', avatar: 'https://picsum.photos/seed/user-3/100/100', isOpenForWork: false },
    lastMessage: '合約已經簽署完成了，請確認。',
    timestamp: '週一',
    unreadCount: 0,
    status: 'completed',
    jobTitle: '電商網站 Banner 設計',
    jobProgress: 100
  },
  {
    id: 'chat-4',
    partner: { id: 'u4', name: 'Emily Chen', avatar: 'https://picsum.photos/seed/user-4/100/100', isOpenForWork: true },
    lastMessage: '嗨！我對你的攝影服務很感興趣...',
    timestamp: '週日',
    unreadCount: 1,
    status: 'none',
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'job',
    title: '案件邀請',
    content: 'Bean & Leaf 邀請您參與「咖啡廳品牌識別」專案報價。',
    time: '10 分鐘前',
    isRead: false
  },
  {
    id: 'n2',
    type: 'payment',
    title: '款項入帳',
    content: '您收到來自 FinTech Co. 的第二期款項 NT$ 15,000。',
    time: '2 小時前',
    isRead: false
  },
  {
    id: 'n3',
    type: 'like',
    title: '新的讚',
    content: 'Alex Chen 和其他 5 人喜歡了您的作品「城市叢林」。',
    time: '5 小時前',
    isRead: true
  },
  {
    id: 'n4',
    type: 'system',
    title: '系統公告',
    content: '平台將於今晚 12:00 進行維護，預計暫停服務 30 分鐘。',
    time: '昨天',
    isRead: true
  }
];

export const MOCK_MESSAGES: Message[] = [
    { id: 'm1', senderId: 'partner', text: '嗨！關於首頁的設計稿，我們看過了，整體風格很喜歡！', timestamp: '09:00' },
    { id: 'm2', senderId: 'me', text: '太好了！很高興你們喜歡。', timestamp: '09:05' },
    { id: 'm3', senderId: 'partner', text: '不過有個小地方想調整，按鈕的圓角能不能再大一點？比較符合我們的新品牌形象。', timestamp: '09:10' },
    { id: 'm4', senderId: 'me', text: '沒問題，我待會調整後更新給您。另外，第三階段的款項是否可以先請款了？', timestamp: '09:15' },
    { id: 'm5', senderId: 'partner', text: '好的，麻煩您發起請款，我們會盡快處理。', timestamp: '09:20' },
];

export const MOCK_REVIEWS: Review[] = [
    {
      id: 'r1',
      reviewer: { id: 'u2', name: 'Sarah Wu', avatar: 'https://picsum.photos/seed/user-1/100/100', isOpenForWork: true },
      rating: 5,
      content: '非常專業的設計師！溝通順暢，成品也完全符合我們的需求。強烈推薦！',
      date: '2023/10/15',
      projectName: '品牌 Logo 設計'
    },
    {
      id: 'r2',
      reviewer: { id: 'c1', name: 'FinTech Co.', avatar: 'https://picsum.photos/seed/fintech/100/100', isOpenForWork: false },
      rating: 4.8,
      content: '技術能力很強，對細節也很講究。雖然時程稍微緊湊，但還是如期交付了高品質的 UI Kit。',
      date: '2023/09/20',
      projectName: '金融 App UI Kit'
    },
    {
      id: 'r3',
      reviewer: { id: 'c3', name: 'DataViz Inc.', avatar: 'https://picsum.photos/seed/data/100/100', isOpenForWork: false },
      rating: 5,
      content: 'Excellent work on the dashboard implementation. Clean code and great performance.',
      date: '2023/08/05',
      projectName: 'React 分析儀表板'
    }
  ];
  
  export const PROFILE_USER = {
      id: 'me',
      name: 'Elijah Wang',
      avatar: 'https://picsum.photos/seed/me/200/200',
      cover: 'https://picsum.photos/seed/cover_me/800/400',
      title: '資深 UI/UX 設計師 | 前端開發者',
      bio: '專注於創造直觀且美觀的數位體驗。擁有 5 年以上設計與開發經驗。',
      stats: {
          followers: 1250,
          following: 86,
          influence: 88,
          commissionTier: 'Level 2 (5% fee)'
      },
      wallet: 28500,
      orders: 3
  };