📖 Project Overview
This Habit Tracker is a full‑stack web application designed to help users build consistency in their daily routines. It combines secure authentication, structured habit logging, and motivational features into one seamless experience.

🔐 Authentication (Firebase Auth)
Implemented Firebase Authentication for secure sign‑up and login.

Each user has a personalized account, ensuring their habits and progress are private and protected.

Provides a reliable entry point for tracking habits across sessions and devices.

📂 Data Storage (Firestore)
Used Cloud Firestore to store:

Daily habit logs (whether a habit was completed on a given day).

User‑defined habits (custom list of habits per account).

Firestore’s real‑time updates ensure the dashboard reflects changes instantly.

Enables persistent, cloud‑based tracking that scales with users.

🌟 Motivation (ZenQuotes API)
Integrated ZenQuotes API to display a daily motivational quote.

Adds inspiration alongside progress tracking, encouraging users to stay consistent.

Keeps the experience engaging and uplifting, not just functional.

🎯 Use Case
Problem: People struggle to build and maintain habits due to lack of structure, accountability, and motivation.

Solution: This app provides:

A personalized dashboard with secure login.

Daily habit tracking stored in the cloud.

Visual progress indicators (monthly completion percentage, habit grid).

Motivational quotes to inspire consistency.

🚀 Why This Project Matters
Accountability: Secure login ties progress to each user.

Clarity: Visual dashboards make progress easy to understand.

Motivation: Daily quotes encourage persistence.

Simplicity: Easy to add habits, check them off, and see results.

Scalability: Built on Firebase + Firestore, ensuring reliability for many users.

Modern UX: Responsive design and dark mode support for a smooth experience across devices.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




