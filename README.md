# GHADA — Multilingual AI Financial Safety & Life-Assistance Platform

> **"Save First. Invest Second. Borrow Last."**  
> *Designed & Developed by **Surya Akhil***

---

## 🌟 Executive Overview

**GHADA** is an emergency-first, multilingual AI financial safety super-app engineered specifically for low and irregular income earners. 

Traditional fintech applications focus heavily on credit cards, high-risk investing, and debt consumption. GHADA flips this model upside down:
1. **SAVE FIRST** — Build an unshakeable ₹5,000 emergency cushion through daily micro-contributions (₹20–₹50).
2. **INVEST SECOND** — Grow wealth safely in low-risk digital assets only *after* basic safety is secured.
3. **BORROW LAST** — Minimize reliance on high-interest informal lenders by deploying a behavioral emergency cushion.

The platform combines an **intent-based multilingual AI engine**, **voice & document analysis**, a **signature animated AI Orb**, **natural language expense logging**, and an **interactive 5-pillar financial health score**.

---

## ✨ Key Features & Architecture

### 🧠 1. "Ask Ghada Anything" & Multilingual AI Orb
- **Signature AI Orb (`GhadaOrb.tsx`)**: Dynamic SVG animated orb reacting visually to idle, listening, thinking, and speaking states.
- **Multilingual & Code-Switching Engine (`languageDetector.ts`)**: Supports **English, Telugu (`తెలుగు`), Hindi (`हिन्दी`), Kannada (`ಕನ್ನಡ`), Tamil (`தமிழ்`), and Marathi (`मराठी`)** with automatic script range detection and Romanized code-switched parsing (e.g., *"Naaku emergency fund entha undali?"* or *"मुझे ₹5000 save करना है"*).
- **Voice & Speech Recognition (`VoiceInputButton.tsx`)**: Web Speech API integration with simulated fallback for hands-free voice input.
- **Global Command Palette (`⌘K` / `Ctrl + K`)**: Instant search overlay (`CommandPalette.tsx`) for fast navigation and quick AI queries.

### 🛡️ 2. Emergency Cushion & Behavioral Friction Lock
- **Progressive Milestone Ladder**: Visual progress ring, daily savings streak counter, and adaptive micro-savings suggestions.
- **Behavioral Withdrawal Lock**: Adds constructive friction during emergency withdrawals to prevent emotional spending while keeping funds accessible for genuine crises.
- **Automated Rebuild Mode**: Automatically activates a gentle step-by-step rebuilding plan after an emergency withdrawal.

### 📊 3. AI Budget Planner (`/budget`)
- **Automated 50/15/20/15 Allocation**: Splits income into **Essential Living (50%)**, **Emergency Savings (15%)**, **Flexible Spending (20%)**, and **Buffer Reserve (15%)**.
- **1-Click "Apply Budget Plan"**: Instantly saves custom budget allocations to local state.

### 📝 4. Natural Language Expense Tracker (`/expenses`)
- **Plain Text Logging**: Type queries like *"I spent ₹250 on fuel today"* or *"₹450 for groceries"* — GHADA automatically extracts the amount, category, and date.
- **Category Analytics**: Instant breakdown across Food, Transport, Utilities, and Personal categories.

### 💳 5. Debt Organizer & Repayment Planner (`/debt`)
- **Borrow Last Engine**: Tracks outstanding loans, interest rates (e.g. 18%+ informal lenders vs vehicle loans), and monthly EMIs.
- **Repayment Priority**: Guides users to clear high-interest informal debts first to break debt traps.

### 🔍 6. Statement & Document Analyzer (`/documents`)
- **AI File Translation**: Upload bank statements, utility bills, or insurance letters to receive plain-language summaries without financial jargon.

### 🚨 7. Stay Safe Scam & Fraud Checker (`/fraud-safety`)
- **SMS & OTP Threat Analyzer**: Paste suspicious SMS or UPI request messages to receive an instant risk assessment (SAFE, SUSPICIOUS, DANGEROUS) and safety guidelines.

### 📈 8. 5-Pillar Financial Health Score (`/health`)
- **Holistic Resilience Score (0–100)**: Evaluates Emergency Cushion, Savings Habit, Goal Progress, Budget Health, and Financial Awareness.

### 🏢 9. Enterprise Partner Portal (`/partner`)
- **B2B2C Corporate Safety Dashboard**: Analytics for employers (e.g., construction companies) to monitor worker enrollment, emergency fund progress, and corporate micro-matching contributions.

---

## 🎨 Luxury Design System

Designed with a high-contrast luxury fintech aesthetic inspired by **Revolut, CRED, and Mercury**:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| **Deep Obsidian** | `#0A0B10` | Main application background |
| **Glass Slate** | `#131520` | Elevated glassmorphism card surfaces |
| **Luminous Border** | `#2A2E45` | Subtle high-contrast container outlines |
| **Crisp Pure White** | `#FFFFFF` | Primary headings & high-legibility text |
| **Champagne Gold** | `#E5B869` | Accent highlights, buttons, and badges |
| **Coral Red** | `#EF4444` | Emergency alerts & fraud safety warnings |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Local Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/suryaakhil/ghada.git
   cd ghada
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to **`http://localhost:3000/`** (or `http://localhost:5173/`).

---

## ⚡ 1-Click Launchers (Windows)

For instant offline testing on Windows without opening terminal commands:

- **Double-Click `Double-Click-To-Open.bat`**: Launches the local server and opens your default browser to `http://localhost:3000/` automatically.
- **Double-Click `Click-To-Open.html`**: Browser redirect shortcut to the live application.

---

## 🔐 Demo Credentials

To test the authenticated user experience:

- **Username**: `Suryaakhilp`
- **Password**: `28022023`

*(Note: Clicking **"Auto-Fill"** on the Sign In page automatically populates these credentials).*

---

## 📂 Project Structure

```text
ghada/
├── dist/                      # Production build output
├── public/                    # Static assets & icons
├── src/
│   ├── components/
│   │   ├── common/            # GhadaOrb, CommandPalette, VoiceInputButton, Logo
│   │   ├── features/          # SaveModal, AskGhadaAnything, RebuildBanner, LanguageSelector
│   │   └── layout/            # Header, Footer, BottomNav
│   ├── context/
│   │   └── AppContext.tsx     # State Engine & LocalStorage Persistence (v2)
│   ├── data/
│   │   └── mockData.ts        # User profile, transactions, goals, translations, AI knowledge base
│   ├── pages/                 # 17 Pages (Landing, Login, Dashboard, Hub, Budget, Expenses, Debt, etc.)
│   ├── services/
│   │   ├── aiEngine.ts        # Intent classification & tool caller
│   │   └── languageDetector.ts# Native script range detection & code-switching
│   ├── types/
│   │   └── index.ts           # Unified TypeScript interface definitions
│   ├── App.tsx                # React Router & Protected Route Guards
│   ├── main.tsx               # Entry point with Error Boundary fallback
│   └── index.css              # Tailwind base layer & background light flares
├── Double-Click-To-Open.bat   # 1-Click Windows batch launcher
├── Click-To-Open.html         # 1-Click browser redirect file
├── tailwind.config.js         # Custom luxury dark theme configuration
├── vite.config.ts             # Vite server config
└── package.json               # Dependencies & build scripts
```

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Routing**: [React Router v6](https://reactrouter.com/)

---

## 📜 License & Credit

Designed & Developed with ❤️ by **Surya Akhil**.  
*All rights reserved. GHADA — Save First. Invest Second. Borrow Last.*
