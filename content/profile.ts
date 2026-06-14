/**
 * Single source of truth for bio / experience / education / skills / socials.
 * Projects live in the database (managed via /admin); everything here is rarely
 * changing résumé content. Sourced from public/resume/AgrimSangotra_Resume.tex.
 *
 * Experience bullet points support **bold** markers (rendered by components/Experience.tsx)
 * — used to highlight numeric results.
 */

export const profile = {
  name: "Agrim Sangotra",
  title: "Backend Developer",
  tagline:
    "Backend developer @HCLTech building on Azure cloud services, working directly with Microsoft Dev Team.",
  email: "agrimsangotra30@gmail.com",
  phone: "+91 9469199281",
  location: "Noida, Uttar Pradesh, India",
  resumeFile: "/api/resume", // streams public/resume/AgrimSangotra_Resume.pdf
  avatar: "/images/my-avatar.png",

  socials: {
    github: "https://github.com/Agrim-Ani",
    linkedin: "https://www.linkedin.com/in/agrim-sangotra-203015210",
  },

  about: [
    "I'm Agrim Sangotra, a backend developer at HCLTech working directly with the Microsoft's Network Watcher Traffic Analytics team. I build GenAI powered backend services including REST APIs that integrate custom Azure AI Foundry models to automate work that used to be manual.",
    "My work also spans accross real-time deployment-health dashboards backed by Geneva/Kusto queries, release automation, and large scale infrastructure remediation across multiple Azure clouds and 60+ regions, consistently cutting manual effort and keeping releases healthy.",
    "I'm fluent across the backend stack — Node.js, Express, NestJS, TypeScript — with strong relational and NoSQL database experience (PostgreSQL, MongoDB, Cosmos DB) and a solid grounding in cloud, CI/CD, GenAI integration, and authentication (JWT, OAuth 2.0).",
  ],
} as const;

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Backend Developer",
    company: "HCLTech · directly with the Microsoft team",
    period: "Sep 2024 – Present",
    points: [
      // GenAI + Dev
      "Cut vendor reporting time by **90%** — built backend REST APIs integrating a custom Azure AI Foundry (GenAI) model to auto-summarize remediation tasks and automate SFI report-mail generation.",
      // Dev
      "Cut manual release verification by **70%** — built Geneva/Kusto-backed APIs powering real-time deployment-health dashboards and Ev2 release/rollout tracking.",
      // Dev + Infra
      "Remediated infrastructure across **60+ regions** and multiple Azure clouds with **11+** Azure Runbook automations and **8** Ev2 deployment pipelines, enabling zero-touch operations.",
      "Owned **13** SFI security workstreams at **100%** on-time resolution and expanded Managed Identity to **60+ regions** for passwordless authentication.",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "Mapsense",
    period: "Feb 2024 – Sep 2024",
    points: [
      "Sustained **99%** production uptime building the end-to-end backend for a Location Intelligence platform.",
      "Accelerated registration by **30%** by implementing OAuth 2.0 Google Sign-In; built profile APIs for invites, uploads, and geo-data workflows.",
      "Improved location-data precision by **40%** with services for path retrieval, road snapping, and session tracking; helped land the first enterprise client (The Nature Conservancy).",
    ],
  },
];

export type EducationItem = {
  institution: string;
  detail: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    institution: "National Institute of Technology, Srinagar",
    detail: "B.Tech in Information Technology · CGPA 7.83",
    period: "2020 – 2024",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "C++", "C#", "PowerShell"] },
  { label: "Backend & Web", items: ["Node.js", "Express.js", "NestJS", "REST APIs", "WebSockets", "JWT / OAuth 2.0"] },
  { label: "GenAI & Cloud", items: ["Azure AI Foundry", "Azure", "Docker", "CI/CD"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL"] },
  { label: "Tools & Practices", items: ["Postman", "Jira", "Copilot CLI", "Git"] },
];
