import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Projects migrated from the original static index.html.
// Tech stacks are inferred (REST APIs are Node/Express); adjust freely in /admin.
const projects = [
  {
    title: "Contact Manager",
    description:
      "A REST API for managing contacts with full CRUD and authentication. Documented with Swagger UI.",
    category: "API",
    techStack: ["Node.js", "Express", "MongoDB", "Swagger"],
    githubUrl: "https://github.com/Agrim-Ani/Contact_Manager-Backend",
    demoUrl: "https://contact-manager-backend-z9l4.onrender.com/api-docs/",
    featured: true,
    order: 1,
  },
  {
    title: "Scriptable Widget Server Endpoints",
    description: "Backend REST endpoints powering Scriptable iOS widgets.",
    category: "API",
    techStack: ["Node.js", "Express"],
    githubUrl: "https://github.com/Agrim-Ani/Scriptable-widget-v01",
    order: 2,
  },
  {
    title: "Meeting Rooms Backend",
    description: "REST API for booking and managing meeting rooms.",
    category: "API",
    techStack: ["Node.js", "Express", "MySQL"],
    githubUrl: "https://github.com/Agrim-Ani/Meeting_room-Database",
    order: 3,
  },
  {
    title: "Community Builder",
    description: "Backend REST API for building and managing online communities.",
    category: "API",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/Agrim-Ani/CommunityBuilder",
    order: 4,
  },
  {
    title: "Invoice Creator",
    description: "REST API to generate and manage invoices.",
    category: "API",
    techStack: ["Node.js", "Express"],
    githubUrl: "https://github.com/Agrim-Ani/invoice_creater-Backend",
    order: 5,
  },
  {
    title: "Student Info",
    description: "REST API for managing student information records.",
    category: "API",
    techStack: ["Node.js", "Express"],
    githubUrl: "https://github.com/Agrim-Ani/Student_Info-Backend",
    order: 6,
  },
  {
    title: "User Authentication Demonstration",
    description: "A backend demonstrating secure user authentication flows.",
    category: "API",
    techStack: ["Node.js", "Express", "JWT"],
    githubUrl: "https://github.com/Agrim-Ani/User_Authentication-Backend",
    order: 7,
  },
  {
    title: "Basic RESTful API",
    description: "A foundational RESTful API demonstrating core REST principles.",
    category: "API",
    techStack: ["Node.js", "Express"],
    githubUrl: "https://github.com/Agrim-Ani/RESTful_API-Basic",
    order: 8,
  },
  {
    title: "GitHub Spotlight",
    description: "A Scriptable iOS widget showing your top 5 GitHub repositories.",
    category: "Scriptable Widget",
    techStack: ["JavaScript", "Scriptable", "GitHub API"],
    githubUrl: "https://github.com/Agrim-Ani/GithubTopRepos/tree/main",
    order: 9,
  },
  {
    title: "Task Scheduler",
    description: "A Scriptable iOS widget for scheduling and tracking tasks.",
    category: "Scriptable Widget",
    techStack: ["JavaScript", "Scriptable"],
    githubUrl: "https://github.com/Agrim-Ani/Task_Scheduler/tree/main",
    order: 10,
  },
  {
    title: "npm-calculator",
    description: "A published npm package exposing basic arithmetic functions.",
    category: "npm package",
    techStack: ["JavaScript", "npm"],
    githubUrl: "https://github.com/Agrim-Ani/npm-calculator/tree/main",
    order: 11,
  },
];

async function main() {
  console.log("Seeding projects…");
  for (const p of projects) {
    // Idempotent-ish: skip if a project with the same title already exists.
    const existing = await prisma.project.findFirst({ where: { title: p.title } });
    if (existing) {
      console.log(`  • skip (exists): ${p.title}`);
      continue;
    }
    await prisma.project.create({ data: p });
    console.log(`  • created: ${p.title}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
