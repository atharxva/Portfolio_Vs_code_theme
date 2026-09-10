import { SkillCategory } from "@/lib/types";

export const SKILLS: SkillCategory[] = [
  {
    id: "languages",
    title: "Programming Languages",
    skills: [
      { name: "C++", icon: "cpp" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Kotlin", icon: "kotlin" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: "html5" },
      { name: "CSS3", icon: "css3" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "ShadCN UI", icon: "shadcn" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express.js", icon: "express" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Supabase", icon: "supabase" },
      { name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    id: "core",
    title: "Core Concepts & Tools",
    skills: [
      { name: "Data Structures & Algorithms", icon: "dsa" },
      { name: "System Design", icon: "systemdesign" },
      { name: "AWS", icon: "aws" },
      { name: "Docker", icon: "docker" },
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
  {
    id: "soft",
    title: "Soft Skills",
    skills: [
      { name: "Problem Solving", icon: "problem_solving" },
      { name: "Team Collaboration", icon: "collaboration" },
      { name: "Adaptability", icon: "adaptability" },
      { name: "Time Management", icon: "time_management" },
      { name: "Critical Thinking", icon: "thinking" },
    ],
  },
];

export const CERTIFICATIONS = [
  { name: "Java Programming", issuer: "IIT Bombay" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services" },
];
