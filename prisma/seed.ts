import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Curated project set (exported from the admin-managed database).
// Re-run with `npm run db:seed`; existing projects (matched by title) are skipped.
const projects = [
  {
    title: "Broadcast",
    description:
      "Engineered a real time broadcasting server featuring user authentication, custom room creation and invitation systems to facilitate interactive group communication.",
    category: "API",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/Agrim-Ani/Broadcasting-Server",
    liveUrl: "https://broadcasting-server.onrender.com/",
    demoUrl: "https://broadcasting-server.onrender.com/",
    imageUrl: "/images/Project-Broadcast.png",
    featured: true,
    order: 1,
  },
  {
    title: "Contact Manager",
    description:
      "A REST API for managing contacts with full CRUD and authentication. Documented with Swagger UI.",
    category: "API",
    techStack: ["Node.js", "Express", "MongoDB", "Swagger"],
    githubUrl: "https://github.com/Agrim-Ani/Contact_Manager-Backend",
    demoUrl: "https://contact-manager-backend-z9l4.onrender.com/api-docs/",
    imageUrl: "/images/swagger.png",
    featured: true,
    order: 1,
  },
  {
    title: "Meeting Rooms Backend",
    description: "REST API for booking and managing meeting rooms.",
    category: "API",
    techStack: ["Node.js", "Express", "MySQL"],
    githubUrl: "https://github.com/Agrim-Ani/Meeting_room-Database",
    imageUrl: "/images/github.png",
    order: 3,
  },
  {
    title: "Community Builder",
    description: "Backend REST API for building and managing online communities.",
    category: "API",
    techStack: ["Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/Agrim-Ani/CommunityBuilder",
    imageUrl: "/images/github.png",
    order: 4,
  },
  {
    title: "Invoice Creator",
    description: "REST API to generate and manage invoices.",
    category: "API",
    techStack: ["Node.js", "Express"],
    githubUrl: "https://github.com/Agrim-Ani/invoice_creater-Backend",
    imageUrl: "/images/github.png",
    order: 5,
  },
  {
    title: "Student Info",
    description: "REST API for managing student information records.",
    category: "API",
    techStack: ["Node.js", "Express"],
    githubUrl: "https://github.com/Agrim-Ani/Student_Info-Backend",
    imageUrl: "/images/github.png",
    order: 6,
  },
  {
    title: "User Authentication Demonstration",
    description: "A backend demonstrating secure user authentication flows.",
    category: "API",
    techStack: ["Node.js", "Express", "JWT"],
    githubUrl: "https://github.com/Agrim-Ani/User_Authentication-Backend",
    imageUrl: "/images/github.png",
    order: 7,
  },
  {
    title: "npm-calculator",
    description: "A published npm package exposing basic arithmetic functions.",
    category: "npm package",
    techStack: ["JavaScript", "npm"],
    githubUrl: "https://github.com/Agrim-Ani/npm-calculator/tree/main",
    imageUrl: "/images/npm.png",
    order: 11,
  },
];

async function main() {
  console.log("Seeding projects…");
  for (const p of projects) {
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
