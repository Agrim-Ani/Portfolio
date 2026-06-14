// Serializable shape of a Project as sent to the client (dates as ISO strings).
export type ProjectDTO = {
  id: string;
  title: string;
  description: string;
  category: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  featured: boolean;
  order: number;
};

export type ContactMessageDTO = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};
