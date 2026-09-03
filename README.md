# Atharva Jadhav — VS Code Themed Portfolio

A personal portfolio site styled as a VS Code editor window, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Editing Your Content

All personal content lives in the `data/` folder — edit these files to update the site without touching any component code:

- `data/experience.ts` — work experience timeline entries
- `data/education.ts` — education history
- `data/skills.ts` — skills grouped by category, plus certifications
- `data/projects.ts` — project sections and cards

Contact details (email, phone, LinkedIn, GitHub) live in `components/pages/Contact.tsx`.
Your name, title, and summary live in `components/pages/Welcome.tsx`.

## Project Structure

```
app/                    Next.js app router entry (layout, page, global styles)
components/
  shell/                The "IDE" chrome: title bar, menu bar, activity bar,
                         explorer sidebar, tab bar, breadcrumb, status bar,
                         command palette (Cmd/Ctrl+P), main content router
  pages/                One component per "file": Welcome, Experience,
                         Skills, Projects, Education, Contact
  ui/                   Small shared UI pieces (file-type icons)
data/                   Typed content files (edit these to update the site)
lib/                    Types, the file registry, and the Zustand tab/editor store
```

## Build for Production

```bash
npm run build
npm run start
```

## Deploying

This is a standard Next.js app — it deploys as-is to Vercel, Netlify, or any Node hosting.
Push this folder to a GitHub repo and import it on vercel.com for the easiest path.
