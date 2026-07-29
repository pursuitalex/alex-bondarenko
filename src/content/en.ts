import { shared } from "@/lib/brand";
import type { uk } from "@/content/uk";

/**
 * ENGLISH VERSION — every visible string on /en.
 *
 * Typed as the Ukrainian dictionary, so the build fails if a key is missing or
 * misspelled here. That is deliberate: an untranslated string can never ship
 * silently, it stops the build instead.
 *
 * Translated from the Ukrainian source — worth a proofread by the brand owner,
 * since this is sales copy rather than documentation.
 */
export const en: typeof uk = {
  ...shared,

  lang: "en",
  langLabel: "EN",

  meta: {
    htmlLang: "en",
    title: "Bondarenko — Alex Bondarenko · UI/UX, design and frontend",
    description:
      "Alex Bondarenko — UI/UX and graphic design, frontend and full-stack development for websites that lift conversion and sales. Figma, modern AI tooling and clean code.",
    ogTitle: "Alex Bondarenko — web design and development",
    ogDescription:
      "Websites that sell. Design, frontend and AI in one pair of hands — from sketch to release.",
  },

  ui: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    close: "Close",
    briefDialogLabel: "Project enquiry",
    briefBadge: "(Enquiry)",
    photoAlt: "Alex Bondarenko",
    orDirectly: "Or directly",
    optional: "(optional)",
    sending: "Sending…",
    submit: "Send enquiry",
    thanks: "Thank you",
    thanksBody: "Got your enquiry. I'll reply to {email} within 24 hours.",
    errorRequired: "Please fill in your name, email and project type.",
    errorGeneric:
      "Couldn't send that. Try again, or email me directly at the address below.",
    namePlaceholder: "What should I call you",
    messagePlaceholder: "A few lines about the task, deadline, links…",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldType: "Project type",
    fieldBudget: "Budget",
    fieldMessage: "About the project",
    letsTalk: "Let's talk",
    directly: "Direct",
    messenger: "Messenger",
  },

  eyebrows: {
    about: "About me",
    experience: "Experience",
    forWhom: "Who it's for",
    work: "Portfolio",
    services: "Services",
    process: "Process",
    faq: "FAQ",
    contact: "Contacts",
  },

  fullName: "Alex Bondarenko",
  tagline: "designer & web developer",
  availability: "Available for projects",
  location: "Rivne, Ukraine",

  offer:
    "We build websites that sell. From the first sketch to release — design, frontend and AI in one pair of hands.",
  cta: "Discuss a project",
  ctaSecondary: "View work",
  roles: ["UI/UX design", "Graphic design", "Frontend", "Full-stack"],

  ticker: [
    "UI/UX Design",
    "Graphic Design",
    "Website Design",
    "15+ years of exp.",
    "Brand Design",
    "Application Design",
    "Alex Bondarenko",
  ],

  stats: [
    { value: "15+", label: "years of experience" },
    { value: "200+", label: "websites shipped" },
    { value: "6", label: "studios and companies" },
    { value: "100%", label: "satisfied clients" },
  ],

  about:
    "For over 15 years I've turned ideas into design that works for the business: websites, UX/UI, mobile apps, animation and branding. I've gone from junior designer to Lead — freelance and in studios. The goal is simple: modern, effective solutions that lift clients' sales.",

  experience: [
    {
      period: "2019—2026",
      role: "Lead Designer",
      company: "DesignPlanet",
      summary:
        "Website and mobile app design, interactive prototypes, animation and video for the company's projects.",
    },
    {
      period: "2015—2019",
      role: "Lead Designer",
      company: "4Writers",
      summary:
        "Managing and coordinating graphic projects; design of 80+ websites; motion graphics and video.",
    },
    {
      period: "2013—2015",
      role: "Senior Designer",
      company: "Yantar Polissya",
      summary:
        "Bringing websites up to modern standards, responsive design, close work with frontend development.",
    },
    {
      period: "2011—2013",
      role: "UI/UX Designer",
      company: "Writology",
      summary: "Website and app design — interfaces that are easy and pleasant to use.",
    },
    {
      period: "2009—2011",
      role: "Graphic Designer",
      company: "Wedes",
      summary:
        "Websites, landing pages, e-commerce, logos, advertising materials and banners.",
    },
    {
      period: "2007—2009",
      role: "Junior Graphic Designer",
      company: "Syteg Designs",
      summary:
        "Visual assets: product packaging, logos, corporate materials and advertising.",
    },
  ],

  forWhomSub: "Solutions built around your goal — from the first screen to the sale.",
  segments: [
    {
      title: "Small and medium business",
      pain: "The site looks dated and brings in no enquiries.",
      outcome: "A modern site that turns visitors into clients.",
    },
    {
      title: "Startups and SaaS",
      pain: "You need to ship a product fast, with strong UX.",
      outcome: "MVPs and landing pages ready for users and investors.",
    },
    {
      title: "E-commerce",
      pain: "Traffic is there — sales are not.",
      outcome: "Design and UX that lift conversion to purchase.",
    },
    {
      title: "Agencies and studios",
      pain: "You're short-handed on design or frontend.",
      outcome: "I extend your team as a dependable white-label partner.",
    },
  ],

  services: [
    {
      title: "UI/UX design",
      desc: "Interfaces that lead the user to act: research, prototypes, design systems.",
      tags: ["UX research", "Wireframes", "Prototypes", "Design system", "Responsive"],
    },
    {
      title: "Graphics and branding",
      desc: "Visual identity that sticks: logo, brand style, advertising materials.",
      tags: ["Logo", "Identity", "Banners", "Social media", "Guidelines"],
    },
    {
      title: "Frontend development",
      desc: "Fast, responsive sites on a modern stack with smooth animation.",
      tags: ["Next.js / React", "TypeScript", "GSAP / Motion", "Responsive", "SEO"],
    },
    {
      title: "Full-stack & AI",
      desc: "Databases, integrations and AI-accelerated development — more done in less time.",
      tags: ["Databases", "API / integrations", "AI tooling", "Deployment"],
    },
  ],

  processHeading: "How I run a project",
  process: [
    {
      title: "Brief and strategy",
      desc: "We work through the task, the goals and the audience, and shape a clear picture of the result.",
    },
    {
      title: "Design",
      desc: "From prototype to final visuals — signed off at every step.",
    },
    {
      title: "Development",
      desc: "Markup, animation and integrations. Clean code and high speed.",
    },
    {
      title: "Launch and support",
      desc: "Deployment, analytics and iteration to grow conversion.",
    },
  ],

  contact: {
    heading: "Ready to lift your sales?",
    sub: "Tell me about the project — I'll come back with a plan and timings within 24 hours.",
    cta: "Fill in the brief",
    pillars: [
      {
        title: "Fast reply",
        desc: "I answer within 24 hours, on whichever channel suits you.",
      },
      {
        title: "Clear next steps",
        desc: "After the brief — a detailed plan, an estimate and timings.",
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
    { name: "Ukrainian", level: "Native" },
    { name: "English", level: "B1 — Intermediate" },
    { name: "Russian", level: "Fluent" },
  ],
  education: {
    degree: "MSc in Applied Mathematics",
    school: "NUWEE — National University of Water and Environmental Engineering",
    years: "2002—2007",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  approach: {
    eyebrow: "Approach",
    heading:
      "No template websites. Only design and code that work for conversion and sales.",
    note: "Everything worth knowing about working together.",
  },

  brief: {
    heading: "Tell me about the project",
    sub: "A short brief — I'll reply within 24 hours.",
    projectTypes: [
      "Landing page",
      "Multi-page website",
      "Online store",
      "Branding / design",
      "Something else",
    ],
    budgets: ["under $1k", "$1–3k", "$3–7k", "$7k+"],
  },

  faqHeading: "Frequently asked questions",
  faqSub:
    "Got a question? I've gathered everything worth knowing about working together in one place.",
  faq: [
    {
      q: "How much does a website cost?",
      a: "It depends on scope and complexity. After a short brief I give a firm estimate and timings — with no hidden charges.",
    },
    {
      q: "How long does development take?",
      a: "A landing page — from 1–2 weeks; more complex projects — from 3 weeks. Exact timings are agreed at the start.",
    },
    {
      q: "Do you do both design and code?",
      a: "Yes, the full cycle: design + frontend + integrations in one pair of hands. Design only or development only if that's what you need.",
    },
    {
      q: "Can you update an existing website?",
      a: "Yes. I redesign existing sites and improve their performance and conversion.",
    },
    {
      q: "How do we start?",
      a: "Press “Discuss a project” and fill in the short brief — I'll reply within 24 hours with a plan and timings.",
    },
  ],

  // Project names stay as they are — they are proper nouns. The `type` label is
  // already English in both dictionaries.
  projects: [
    { name: "Yehor Shataylo", year: "2026", type: "Personal site" },
    { name: "AmberHats", year: "2024", type: "Fashion" },
    { name: "ManyLeads", year: "2024", type: "Technology" },
    { name: "Lelia", year: "2020", type: "E-commerce" },
    { name: "Natural-Backlink", year: "2024", type: "Technology" },
    { name: "AABO", year: "2023", type: "Mobile app" },
    { name: "AventuraLawyer", year: "2025", type: "Business" },
    { name: "VirtualEmployer", year: "2024", type: "Business" },
    { name: "MedEcho", year: "2023", type: "E-commerce" },
    { name: "UkrainianHelicopters", year: "2022", type: "Landing" },
  ],
};
