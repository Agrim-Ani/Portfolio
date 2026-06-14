import { prisma } from "@/lib/prisma";
import type { ProjectDTO } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Always render fresh data so newly added projects appear immediately.
export const dynamic = "force-dynamic";

async function getProjects(): Promise<ProjectDTO[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    return projects.map(({ createdAt, updatedAt, ...rest }) => rest);
  } catch (err) {
    // DB not configured yet — render the site with an empty grid rather than crashing.
    console.error("[projects] failed to load:", err);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
