# Attennda

> [!NOTE]
> Not to be confused with the Portuguese word, "Atenda."

Attendance tracking designed for public events and sets, not educational institutions. | It seems like every attendance tracking software nowadays is either paid or centered around schools and private institutions. Attennda's here to fix that.

# Installation & Deployment

## Hosting locally (not for production)
Requirements:
  - A computer running Windows, macOS, or Linux.
  - Node.js 22
  - Git

```
git pull https://github.com/columnlabs/Attennda
cd Attennda
npm i
npm run dev
```

## Deploying for production with Vercel
Requirements:
  - An account with [Vercel](https://vercel.com/)
  - A web browser!

To deploy Attennda to Vercel for production hosting, fork this repo into your personal account or clone it and push it to an organization you're part of, and the open [Vercel](https://vercel.com/), log into your dashboard, and select the cloned repo when creating a new project. After a few minutes, Vercel will spit out your Attennda link.

---
Alternatively, you can build and deploy Attennda from the command line on a Linux, Windows, or macOS machine. You will need to have Node.js v22 installed.

Step 1. Install Vercel with npm
  - ``npm i -g vercel``

Step 2. Log into Vercel
  - ``vercel login``

Step 3. Build and deploy
  - For non-production/testing: ``vercel``
  - For production: ``vercel deploy --prod``