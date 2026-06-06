# ⚙️ Technical Architecture & Developer Notes

## High-Level Architecture
This platform is built as a highly responsive, modern Single Page Application (SPA) utilizing a managed Backend-as-a-Service (BaaS) architecture for speed, scalability, and zero-maintenance operations.

### Frontend Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript (Strict Mode)
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (Utility-first, highly customized design system)
- **Icons:** Lucide React
- **Animations:** Framer Motion (used for liquid-smooth transitions and micro-interactions)

### Backend & Infrastructure
- **Database:** Firebase Firestore (NoSQL, realtime capabilities)
- **Authentication:** Firebase Auth (Google OAuth + Email/Password infrastructure)
- **Hosting Target:** Vercel (or Google Cloud Run)

## Core Modules

### 1. `AuthContext` (State Management)
- Manages global user state in real-time using Firestore `onSnapshot`.
- Handles automatic profile creation upon first Google OAuth login.
- Injects a hardcoded master admin role (`lakshya.automate@gmail.com`) for foundational control.

### 2. Admin Panel (`/admin/*`)
- **Global Inventory Management:** The master switchboard. Admins upload base products (PLR vault) here.
- **Data Model:** Products have metadata (thumbnails, descriptions, pricing).

### 3. User Dashboard (`/app/*`)
- **Store Builder:** Allows users to define branding (slug, name, bio, logo).
- **Catalog Selector:** The marketplace where users "claim" global products to be displayed on their personal storefront.
- **Onboarding Flow:** Forced redirect logic ensures a user must configure their store before browsing the catalog.

### 4. Public Storefront (`/s/:slug`)
- **Dynamic Routing:** Resolves the store data based on the URL parameter (`slug`).
- **Data Hydration:** Fetches the store document, then fetches the specific products the user has selected.
- **Conversion UI:** Implements the "Blink" checkout modal—a carefully designed bottom-sheet/modal intended for mobile-first impulse purchasing.

## Security Considerations
- **Firestore Security Rules:** (Must be deployed) to ensure users can only modify their own `users` document and admin operations are restricted.
- **OAuth Scopes:** We intentionally minimized Google OAuth scopes to standard `email` and `profile` to avoid the "App not verified" friction during onboarding. Sensitive scopes (Drive, Gmail) have been stripped.
