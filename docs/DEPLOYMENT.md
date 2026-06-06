# 🚀 Vercel Deployment Guide

Deploying this application to Vercel's free tier is the perfect way to get online immediately with zero budget. Vercel provides seamless deployment for Vite-based React applications.

## Prerequisites
1. A GitHub, GitLab, or Bitbucket account.
2. A free Vercel account (signup at [vercel.com](https://vercel.com)).
3. Your Firebase configuration variables (found in your Firebase console).

## Step-by-Step Deployment

### Step 1: Push Code to a Repository
1. Initialize a git repository in your local project folder if you haven't already.
2. Commit your code.
3. Push the codebase to a new public or private repository on GitHub.

### Step 2: Import to Vercel
1. Log in to your Vercel dashboard.
2. Click **Add New...** -> **Project**.
3. Locate your GitHub repository from the list and click **Import**.

### Step 3: Configure Project Settings
Vercel will usually auto-detect that it is a Vite project. Verify the following:
- **Framework Preset:** Vite
- **Build Command:** `npm run build` (or `vite build`)
- **Output Directory:** `dist`

### Step 4: Environment Variables (Crucial Step)
You **must** provide the Firebase configuration to Vercel, just like you have in your local `.env` file. You cannot deploy successfully without these.

Expand the **Environment Variables** section and add the following keys and values matching your Firebase project:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

*Note: Ensure you use the exact names as defined in your local `.env` file or `firebase.ts` file.*

### Step 5: Deploy
1. Click the **Deploy** button.
2. Vercel will install dependencies, run the build command, and assign a free sub-domain (e.g., `your-app-name.vercel.app`).
3. Within 1-2 minutes, your app will be live globally on their edge network.

## Post-Deployment Checklist

### 1. Update Firebase Authorized Domains
Since your app is now running on a new Vercel domain, Google Sign-In will fail unless you whitelist the domain.
1. Go to the Firebase Console -> **Authentication** -> **Settings**.
2. Go to **Authorized domains**.
3. Add your new Vercel URL (e.g., `your-app.vercel.app`).

### 2. Client-Side Routing Fix (If necessary)
Because this is a Single Page Application (SPA), if users navigate directly to a sub-page (like `/s/store-name`) and refresh, they might hit a 404. 
Vite projects on Vercel usually handle this automatically with `vercel.json`, but if you encounter 404s on direct links, create a `vercel.json` file in the root of your project:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
Commit and push this, and Vercel will auto-redeploy.
