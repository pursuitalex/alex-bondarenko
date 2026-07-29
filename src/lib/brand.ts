/**
 * Single source of truth for brand identity + site copy.
 * Real data sourced from Oleksandr Bondarenko's CV (2026-06).
 * The hero wordmark is swappable while we settle composition.
 * Later this object splits into uk/en dictionaries for next-intl.
 */
export const brand = {
  wordmark: "Bondarenko", // swappable: "Bondarenko" | "Pursuit"
  studioLabel: "Studio",
  fullName: "Олександр Бондаренко",
  fullNameLatin: "Alex Bondarenko",
  tagline: "дизайнер & веброзробник",
  availability: "Доступний для проєктів",
  location: "Рівне, Україна",

  offer:
    "Створюємо сайти, що продають. Від першого ескізу до релізу — дизайн, фронтенд і AI в одних руках.",
  cta: "Обговорити проєкт",
  ctaSecondary: "Дивитись роботи",
  roles: ["UI/UX дизайн", "Графічний дизайн", "Фронтенд", "Full-stack"],

  // Diagonal running ticker stripe (Figma 52:12026)
  ticker: [
    "UI/UX Design",
    "Graphic Design",
    "Website Design",
    "15+ years of exp.",
    "Brand Design",
    "Application Design",
    "Alex Bondarenko",
  ],

  // Honest credibility numbers (from CV — no fabricated metrics)
  stats: [
    { value: "15+", label: "років досвіду" },
    { value: "200+", label: "розроблених сайтів" },
    { value: "6", label: "студій і компаній" },
    { value: "100%", label: "Задоволених клієнтів" },
  ],

  about:
    "Понад 15 років перетворюю ідеї на дизайн, що працює на бізнес: вебсайти, UX/UI, мобільні застосунки, анімація та бренд. Пройшов шлях від junior-дизайнера до Lead — на фрілансі та в студіях. Мета проста: сучасні й ефективні рішення, які піднімають продажі клієнтів.",

  experience: [
    {
      period: "2019—2026",
      role: "Lead Designer",
      company: "DesignPlanet",
      summary:
        "Дизайн сайтів і мобільних застосунків, інтерактивні прототипи, анімація та відео для проєктів компанії.",
    },
    {
      period: "2015—2019",
      role: "Lead Designer",
      company: "4Writers",
      summary:
        "Управління та координація графічних проєктів; дизайн 80+ вебсайтів; анімаційна графіка та відео.",
    },
    {
      period: "2013—2015",
      role: "Senior Designer",
      company: "Янтар Полісся",
      summary:
        "Оновлення сайтів під сучасні стандарти, адаптивний дизайн, тісна співпраця з фронтенд-розробкою.",
    },
    {
      period: "2011—2013",
      role: "UI/UX Designer",
      company: "Writology",
      summary: "Дизайн сайтів і застосунків — зручні та привабливі інтерфейси.",
    },
    {
      period: "2009—2011",
      role: "Graphic Designer",
      company: "Wedes",
      summary:
        "Сайти, лендінги, e-commerce, логотипи, рекламні матеріали та банери.",
    },
    {
      period: "2007—2009",
      role: "Junior Graphic Designer",
      company: "Syteg Designs",
      summary:
        "Візуальні елементи: упаковка товарів, логотипи, корпоративні матеріали та реклама.",
    },
  ],

  segments: [
    {
      title: "Малий і середній бізнес",
      pain: "Сайт застарів і не приносить заявок.",
      outcome: "Сучасний сайт, що перетворює відвідувачів на клієнтів.",
    },
    {
      title: "Стартапи і SaaS",
      pain: "Треба швидко запустити продукт із сильним UX.",
      outcome: "MVP і лендінги, готові до користувачів та інвесторів.",
    },
    {
      title: "E-commerce",
      pain: "Трафік є — а продажів мало.",
      outcome: "Дизайн і UX, що піднімають конверсію в покупку.",
    },
    {
      title: "Агенції та студії",
      pain: "Бракує рук на дизайн чи фронтенд.",
      outcome: "Підсилюю команду як надійний white-label партнер.",
    },
  ],

  // Project labels live in assets/projects/projects.ts (easy-edit file: name/year/type).

  services: [
    {
      title: "UI/UX дизайн",
      desc: "Інтерфейси, що ведуть користувача до дії: дослідження, прототипи, дизайн-системи.",
      tags: ["UX-дослідження", "Wireframes", "Прототипи", "Дизайн-система", "Адаптив"],
    },
    {
      title: "Графіка та брендинг",
      desc: "Візуальна айдентика, що запам'ятовується: логотип, фірмовий стиль, рекламні матеріали.",
      tags: ["Логотип", "Айдентика", "Банери", "Соцмережі", "Гайдлайни"],
    },
    {
      title: "Фронтенд-розробка",
      desc: "Швидкі, адаптивні сайти на сучасному стеку з плавними анімаціями.",
      tags: ["Next.js / React", "TypeScript", "GSAP / Motion", "Адаптив", "SEO"],
    },
    {
      title: "Full-stack & AI",
      desc: "Бази даних, інтеграції та AI-прискорена розробка — більше за менший час.",
      tags: ["Бази даних", "API / інтеграції", "AI-інструменти", "Деплой"],
    },
  ],

  process: [
    {
      title: "Бриф і стратегія",
      desc: "Розбираємо задачу, цілі та аудиторію. Формуємо чітке бачення результату.",
    },
    {
      title: "Дизайн",
      desc: "Від прототипу до фінального візуалу — з узгодженням на кожному кроці.",
    },
    {
      title: "Розробка",
      desc: "Верстка, анімації та інтеграції. Чистий код і висока швидкість.",
    },
    {
      title: "Запуск і підтримка",
      desc: "Деплой, аналітика та ітерації для зростання конверсії.",
    },
  ],

  // FAQ copy (heading, subtitle, Q&A) lives in assets/faq.ts (easy-edit file).

  contact: {
    heading: "Готові підняти продажі?",
    sub: "Розкажіть про проєкт — поверну з планом і термінами протягом 24 годин.",
    cta: "Заповнити бриф",
    pillars: [
      {
        title: "Швидка відповідь",
        desc: "Відповідаю протягом 24 годин у зручному для вас каналі.",
      },
      {
        title: "Чіткі наступні кроки",
        desc: "Після брифу — детальний план, кошторис і терміни.",
      },
    ],
  },

  skills: [
    "Web design",
    "UX/UI",
    "Landings",
    "App design",
    "Animation",
    "Prototypes",
    "Adaptive design",
    "Branding",
  ],
  programs: [
    { name: "Figma", level: 95 },
    { name: "Photoshop", level: 92 },
    { name: "Illustrator", level: 80 },
    { name: "After Effects", level: 60 },
  ],
  languages: [
    { name: "Українська", level: "Вільно" },
    { name: "English", level: "B1 — Intermediate" },
    { name: "Російська", level: "Вільно" },
  ],
  education: {
    degree: "Магістр прикладної математики",
    school: "НУВГП — Університет водного господарства",
    years: "2002—2007",
  },

  // Order matches how the sections appear on the page (About → Projects → …).
  nav: [
    { label: "Про мене", href: "#about" },
    { label: "Проєкти", href: "#work" },
    { label: "Процес", href: "#process" },
    { label: "Контакт", href: "#contact" },
  ],

  // Approach section (Figma 19:53)
  approach: {
    eyebrow: "Підхід",
    heading:
      "Жодних шаблонних сайтів. Тільки дизайн і код, що працюють на конверсію та продажі.",
    note: "Усе, що потрібно знати про співпрацю з нами.",
  },

  // Tech stack grid (Figma 14:1362). icon = /public/tech-icons/{n}.svg
  stack: [
    { name: "Figma", icon: 1 },
    { name: "Photoshop", icon: 2 },
    { name: "Illustrator", icon: 4 }, // 4.svg = Ai mark (Figma had 3/4 swapped vs labels)
    { name: "AfterEffects", icon: 3 }, // 3.svg = Ae mark
    { name: "Next.js", icon: 5 },
    { name: "React", icon: 6 },
    { name: "Typescript", icon: 7 },
    { name: "Three.js", icon: 8 },
    { name: "Claude", icon: 9 },
    { name: "GSAP", icon: 10 },
    { name: "Supabase", icon: 11 },
    { name: "VS Code", icon: 12 },
  ],

  tools: [
    "Figma",
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Next.js",
    "React",
    "TypeScript",
    "Cursor",
    "VS Code",
    "Supabase",
    "GSAP",
    "Framer Motion",
  ],

  contacts: {
    email: "pursuit.alex@gmail.com",
    phone: "+380 50 435 4821",
    telegram: "@pursuit",
    behance: { handle: "@pursuitalex", url: "https://www.behance.net/pursuitalex" },
  },
  email: "pursuit.alex@gmail.com",

  brief: {
    heading: "Розкажіть про проєкт",
    sub: "Короткий бриф — відповім протягом 24 годин.",
    projectTypes: [
      "Лендінг",
      "Багатосторінковий сайт",
      "Інтернет-магазин",
      "Брендинг / дизайн",
      "Інше",
    ],
    budgets: ["до $1k", "$1–3k", "$3–7k", "$7k+"],
  },
} as const;

export type Brand = typeof brand;
