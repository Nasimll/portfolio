// Single source of truth for the site's copy — every section reads from here.

export const profile = {
  name: "Nasimjon Mullojonov",
  role: "Product Builder & Software Engineer",
  tagline:
    "I take products from concept to daily operations — designing, building, and shipping full-stack systems end to end.",
  location: "Warsaw, Poland",
  email: "nasimjonmullojonov@gmail.com",
  phone: "+48 575 416 431",
  resumeUrl: "/resume.pdf", // TODO: drop a resume PDF into /public to enable the download link
  social: {
    github: "https://github.com/Nasimll",
    linkedin: "https://linkedin.com/in/nasimmulladzhanov",
    twitter: "",
  },
};

export const about = {
  heading: "About me",
  paragraphs: [
    "I'm a Computer Engineering student and product-minded builder with hands-on experience owning a product from concept to daily operations at a recruitment-tech company. I personally designed and built the company's internal management system end-to-end — React, JavaScript, Google Apps Script, Google Sheets — then used it to drive a lead-generation funnel that grew traffic and social presence by 30–40%.",
    "I'm equally comfortable writing code and driving product strategy, bridging engineering, marketing, and operations, and leading cross-functional teams of up to 15 people to ship features and keep the product and brand experience consistent.",
  ],
};

export const stats = [
  { value: 460, suffix: "+", label: "leads generated" },
  { value: 34, suffix: "%", label: "traffic & social growth" },
  { value: 15, suffix: "", label: "person team led" },
  { value: 3, suffix: "", label: "languages spoken fluently" },
];

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "Product & Operations",
    items: [
      "Agile workflows",
      "Roadmap prioritization",
      "Cross-functional leadership",
      "KPI analysis",
      "Workflow automation",
      "Documentation",
    ],
  },
  {
    category: "Technical",
    items: [
      "JavaScript",
      "React",
      "C#",
      "SQL",
      "Java",
      "Python (basic)",
      "HTML/CSS (advanced)",
      "Google Apps Script",
      "OOP",
      "REST APIs",
    ],
  },
  {
    category: "Analytics & Marketing",
    items: [
      "Google Analytics",
      "Google Ads",
      "Meta Ads",
      "SEO",
      "Lead generation",
      "Social media strategy",
    ],
  },
  {
    category: "Design & Content",
    items: [
      "Figma",
      "Adobe Photoshop",
      "Canva",
      "CapCut",
      "Branding & visual identity",
      "Motion graphics",
    ],
  },
  {
    category: "Languages",
    items: ["English (C1)", "Russian (C2)", "Tajik (Native)", "Polish (A1)"],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Sadykov Group Sp. z o.o.",
    role: "Product Operations Manager",
    period: "Jan 2025 — Jul 2026",
    location: "Warsaw, Poland",
    description: [
      "Personally designed and built the company's internal recruitment management system from scratch — architecture, frontend, and backend — using React, JavaScript, JSON, and HTML/CSS, with Google Apps Script and Google Sheets as the backend.",
      "Owned the product roadmap and daily operations for the platform, coordinating engineering, design, and marketing to ship features while keeping product and brand experience consistent.",
      "Designed and launched a lead-generation funnel that drove approximately 400–500 leads and grew the company's traffic and social presence by 30–40%.",
      "Led and grew a cross-functional team of up to 15 people, including recruiting new members and coordinating closely with engineers and designers.",
      "Tracked SEO, engagement, and conversion KPIs via Google Analytics to guide product decisions, and ran paid acquisition through Google Ads and Meta Ads.",
    ],
  },
  {
    company: "WebD",
    role: "Front-End Developer",
    period: "2020 — 2021",
    location: "Dushanbe, Tajikistan",
    description: [
      "Worked as a front-end developer during studies, building web pages with HTML/CSS and designing branding materials, web graphics, and marketing assets for client projects.",
      "Collaborated with marketing and development teams to maintain consistent visual identity and improve user experience across web properties.",
      "Completed the WebD Academy program in Frontend Development & Web Design alongside client project work.",
    ],
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    school: "Vistula University, Warsaw, Poland",
    degree:
      "B.Eng., Computer Engineering — Focus: Algorithms & Data Structures, C#, SQL, Java, OOP, Software Engineering, Software Architecture",
    period: "Oct 2023 — Present (Expected Jan 2027)",
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Recruitment Operations Platform",
    description:
      "A full web application for Sadykov Group Sp. z o.o. that organizes and streamlines daily recruitment operations and core workflows, from vacancy posting to lead tracking.",
    tags: ["React", "JavaScript", "Google Apps Script", "Google Sheets"],
    href: "",
    repo: "",
  },
  {
    title: "Marketplace System",
    description:
      "A peer-to-peer platform for exchanging goods and services, covering listing creation and matching logic. Built as a personal project to strengthen OOP fluency in Java.",
    tags: ["Java", "OOP"],
    href: "",
    repo: "",
  },
  {
    title: "Product Sort",
    description:
      "A terminal-based application for sorting and organizing products into inventory storage. Built as a personal project to strengthen C# and OOP fundamentals.",
    tags: ["C#", "OOP"],
    href: "",
    repo: "",
  },
];
