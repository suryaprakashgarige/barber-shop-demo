# ✂️ GroomRoom — Barbershop Demo Site

> A production-grade barbershop demo template built under **SOLVREX** — designed to attract real clients and ship fast.

---

## 🧾 Project Overview

**GroomRoom** is a modern, conversion-focused barbershop website featuring a standout AI-powered Face Scanner tool. Built as a niche demo template under the SOLVREX agency brand, this site is designed to be cloned and customized per client in under a few hours.

| Detail | Info |
|---|---|
| **Brand** | SOLVREX (Demo Template) |
| **Niche** | Barbershop / Men's Grooming |
| **Demo Name** | GroomRoom |
| **Deployment** | Vercel |
| **Status** | ✅ Live & Deployed |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Animations | GSAP + ScrollTrigger |
| AI Face Detection | MediaPipe Face Mesh |
| Age & Gender Model | face-api.js |
| Deployment | Vercel |
| Version Control | GitHub |

---

## ✨ Key Features

### 🤖 Dual-AI FaceScanner
The star feature of GroomRoom. A browser-based face analysis tool that:
- Detects **face shape** using MediaPipe Face Mesh landmarks
- Estimates **age** and **gender** using face-api.js models
- Auto-fills a **copyable AI image prompt** via `fillPrompt()` so users can generate their ideal haircut look in any AI image tool (Midjourney, DALL·E, etc.)
- Runs **100% in-browser** — zero API cost, zero backend required

### 💈 Core Pages & Sections
- **Hero** — Full-screen cinematic intro with GSAP scroll animation
- **Services** — Haircuts, beard trims, hot towel shaves with pricing cards
- **FaceScanner** — AI face shape detector with prompt generator
- **Gallery** — Before/after showcase grid
- **Barbers** — Team profiles with specialties
- **Booking** — Appointment form (ready to connect to Calendly or custom backend)
- **Testimonials** — Client reviews with star ratings
- **Footer** — Contact info, social links, map embed

---

## 📁 Project Structure

```
groomroom/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main landing page (all sections)
│   └── globals.css         # Tailwind v4 global styles
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── FaceScanner.tsx     # ⭐ Core AI feature
│   ├── Gallery.tsx
│   ├── Barbers.tsx
│   ├── Booking.tsx
│   ├── Testimonials.tsx
│   └── Footer.tsx
├── lib/
│   ├── faceShape.ts        # Face shape detection logic (MediaPipe)
│   ├── promptBuilder.ts    # fillPrompt() AI prompt generator
│   └── utils.ts            # shadcn utility functions
├── public/
│   ├── models/             # face-api.js model weights (local)
│   └── images/             # Gallery, barber photos
├── .env.local              # Environment variables (if any)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/groomroom.git
cd groomroom

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open(https://thegroomroom-iota.vercel.app/) in your browser.

---

## 🔧 Known Issues & Fixes

### `@studio-freight/react-lenis` Deprecation
During initial deployment, a stale `package-lock.json` referenced the deprecated `@studio-freight/react-lenis` package causing Vercel build failures.

**Fix applied:**
```bash
# Remove stale lock file
rm package-lock.json

# Reinstall with updated package (lenis is now under @darkroom.engineering)
npm install
npm install @darkroom.engineering/lenis
```

---

## 🚢 Deployment (Vercel)

```bash
# Push to GitHub first
git add .
git commit -m "deploy: groomroom barbershop site"
git push origin main
```

Then in Vercel:
1. Import the GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. No environment variables required for base demo
4. Click **Deploy**

---

## 🎨 Customization Guide (For Clients)

When adapting this template for a real barbershop client, update the following:

| What to Change | Where |
|---|---|
| Business name & logo | `app/layout.tsx`, `Navbar.tsx` |
| Brand colors | `tailwind.config.ts` + `globals.css` |
| Services & pricing | `components/Services.tsx` |
| Barber profiles & photos | `components/Barbers.tsx` + `/public/images/` |
| Booking form destination | `components/Booking.tsx` (Calendly link or API) |
| Google Maps embed | `components/Footer.tsx` |
| Social media links | `components/Footer.tsx` |
| SEO metadata | `app/layout.tsx` |

**Estimated customization time: 2–3 hours**

---

## 🤖 FaceScanner — Technical Notes

The FaceScanner runs entirely client-side with no external API calls.

**Libraries used:**
- `@mediapipe/face_mesh` — 468-point facial landmark detection
- `face-api.js` — Age & gender estimation models (loaded from `/public/models/`)

**Key function:**
```ts
// lib/promptBuilder.ts
export function fillPrompt(faceShape: string, age: number, gender: string): string {
  return `A ${gender}, approximately ${age} years old, with a ${faceShape} face shape. 
  Show a modern barbershop haircut that flatters this face shape. 
  Professional photography, studio lighting, clean background.`;
}
```

The generated prompt is displayed in a copyable text box so the user can paste it directly into Midjourney, ChatGPT, or any AI image generator.

---

## 💼 SOLVREX Notes

This site is **Demo Template #3** in the SOLVREX niche template library.

| # | Niche | Status |
|---|---|---|
| 1 | Photography Studio | 🔄 In Progress |
| 2 | Food Truck | 🔄 In Progress |
| **3** | **Barbershop (GroomRoom)** | **✅ Done** |
| 4 | Wellness / Spa | 🔄 In Progress |
| 5 | Home Remodeling | 🔄 In Progress |
| 6 | Tutoring | 🔄 In Progress |
| 7 | Event Planning | 🔄 In Progress |
| 8 | Dog Training | 🔄 In Progress |

---

## 📞 Contact / Agency

Built by **SOLVREX** — web services for local businesses.

- 🌐 Website: [solvrex.com](https://solvrex.com)
- 📧 Email: contact@solvrex.com
- 💼 Two tracks: **Niche Demo Templates** (local business) · **Solvrex Premium** (high-end builds)

---

*This is a demo template. Business name, photos, and content are placeholders for demonstration purposes only.*
