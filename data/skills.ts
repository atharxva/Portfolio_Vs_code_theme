import { SkillCategory } from "@/lib/types";

export const SKILLS: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "C++" },
      { name: "Python" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "Kotlin" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React.js" },
      { name: "Next.js" },
      { name: "ShadCN UI" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [{ name: "Node.js" }, { name: "Express.js" }, { name: "Python" }],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Supabase" },
      { name: "PostgreSQL" },
    ],
  },
  {
    id: "core",
    title: "Core Concepts & Tools",
    skills: [
      { name: "Data Structures & Algorithms" },
      { name: "System Design" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "Git" },
      { name: "GitHub" },
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving" },
      { name: "Team Collaboration" },
      { name: "Adaptability" },
      { name: "Time Management" },
      { name: "Critical Thinking" },
    ],
  },
];

export const CERTIFICATIONS = [
  { name: "Java Programming", issuer: "IIT Bombay" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
];
