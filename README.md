# Crown James Cedeño — Portfolio

A premium Sky Blue + White portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Lenis smooth scroll.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's included

- **Hero** — rotating role text, magnetic buttons, floating profile card, animated blobs
- **About** — count-up stats, education & internship cards
- **Projects** — RiceSure & PZAM Cups, with a detail modal (problem / solution / features / lessons / recognitions)
- **Awards & Recognition** — 3 animated cards (floating icon, hover glow, scroll reveal) built from your real RiceSure recognitions: TechnoFair 2026 (2nd Runner-Up), CRD Conversazione 2026 (2nd Best Research Paper), ICMIP 2026 Sapporo (Conference Presenter)
- **Skills** — 5 categorized cards straight from your resume (Frontend, Backend, Database, AI Tools, Tools & Platforms)
- **Certifications** — premium 10-card grid (`data/certifications.ts`), each with image, title, organization, date, View + Download buttons. All 10 are placeholders right now, tagged with a "Placeholder" badge, ready to swap out
- **Contact** — floating-label form + your real contact details, sticky glass Navbar, minimal Footer
- Custom cursor, animated page loader, Lenis smooth scroll, scroll-reveal animations throughout

## Before you deploy

1. **Profile photo**: the hero currently shows a "CJ" placeholder card. Drop a real photo into `public/profile/` and swap it into `sections/Hero/Hero.tsx`.
2. **Project screenshots**: add real screenshots for RiceSure and PZAM Cups to `public/projects/` and reference them in `sections/Projects/Projects.tsx` / `ProjectModal.tsx` (currently using gradient placeholders with initials).
3. **Live demo links**: add `live` URLs in `data/projects.ts` if either project is deployed somewhere.
4. **The 10 certifications**: edit each entry in `data/certifications.ts` — set the real `title`, `organization`, `date`, `image` (drop the file in `public/certificates/`), `certificateUrl`, `downloadUrl`, and set `isPlaceholder: false` to remove the badge. The grid layout doesn't need any changes.
5. **Awards accuracy**: `data/awards.ts` currently reflects your 3 RiceSure recognitions exactly as listed on your resume. If you have more official award detail (certificates, formal titles), update the `description` fields there.
6. **Contact form**: the form currently shows a success state on submit but doesn't send anywhere yet. Wire it to an API route + email service (e.g. Resend) or a form backend (e.g. Formspree) in `sections/Contact/Contact.tsx`.
7. **LinkedIn/Facebook**: `data/profile.ts` has empty strings for these — add them if you want the links live in Contact/Footer.

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import the repo at vercel.com/new — Next.js is auto-detected, zero config needed.

## Stack

Next.js 15 · TypeScript · Tailwind CSS · Framer Motion · Lenis · Lucide React
