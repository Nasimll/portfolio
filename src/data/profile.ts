// TODO: Replace every placeholder value below with real content from the resume.
// This is the single source of truth for the site's copy — sections read from here,
// so filling this in is enough to update the whole site.

export const profile = {
  name: "Your Name",
  role: "AI Engineer & Product Builder",
  tagline:
    "I design and ship AI-powered products — from prototype to production.",
  location: "Tajikistan", // TODO: city, country
  email: "you@example.com", // TODO
  resumeUrl: "/resume.pdf", // TODO: drop a resume PDF into /public
  social: {
    github: "https://github.com/your-handle", // TODO
    linkedin: "https://linkedin.com/in/your-handle", // TODO
    twitter: "", // TODO (optional)
  },
};

export const about = {
  heading: "About me",
  paragraphs: [
    // TODO: 2-3 short paragraphs about your background, what you build, and what drives you.
    "I'm a software engineer focused on AI engineering and product building — turning ideas into working MVPs and shipping technical products end to end.",
    "TODO: add a paragraph about your background, studies, and how you got into AI/software engineering.",
  ],
};

export type SkillGroup = {
  category: string;
  items: string[];
};

// TODO: replace with real skills from the resume, grouped however makes sense.
export const skills: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript", "Python", "JavaScript"] },
  { category: "AI / ML", items: ["LLM engineering", "RAG", "Agents", "PyTorch"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "REST/GraphQL APIs"] },
  { category: "Tools", items: ["Git", "Docker", "CI/CD"] },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
};

// TODO: replace with real work experience from the resume, most recent first.
export const experience: ExperienceItem[] = [
  {
    company: "Company Name",
    role: "Job Title",
    period: "2023 — Present",
    location: "Remote",
    description: [
      "TODO: what you built, shipped, or improved.",
      "TODO: a measurable outcome or impact.",
    ],
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
};

// TODO: replace with real education from the resume.
export const education: EducationItem[] = [
  {
    school: "University Name",
    degree: "Degree, Field of Study",
    period: "20XX — 20XX",
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
};

// TODO: replace with real projects from the resume/portfolio.
export const projects: Project[] = [
  {
    title: "Project One",
    description: "TODO: one or two sentences on what this project does and the problem it solves.",
    tags: ["Next.js", "AI"],
    href: "",
    repo: "",
  },
  {
    title: "Project Two",
    description: "TODO: one or two sentences on what this project does and the problem it solves.",
    tags: ["TypeScript", "Product"],
    href: "",
    repo: "",
  },
];
