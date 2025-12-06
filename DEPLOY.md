# 🚀 Vercel Deployment Guide

## Step 1: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (via GitHub)

2. Click **"Add New..."** → **"Project"**

3. Select the `valtykhoniuk/weather-app` repository from the list

4. Vercel will automatically detect it as a Next.js project

5. **DON'T click "Deploy" yet!** First, add the environment variable

---

## Step 2: Add Environment Variable

### Before deploying:

1. In the **"Environment Variables"** section, click **"Add"**

2. Add the variable:
   - **Name:** `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY`
   - **Value:** Your API key (from `.env.local` file)
   - **Environment:** Select all three options:
     - ☑️ Production
     - ☑️ Preview  
     - ☑️ Development

3. Click **"Save"**

---

## Step 3: Deploy

1. Check the settings:
   - **Framework Preset:** Next.js (automatic)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (automatic)
   - **Output Directory:** `.next` (automatic)

2. Click **"Deploy"**

3. Wait for the build to complete (usually 2-3 minutes)

4. After successful deployment, you'll get a URL like: `https://weather-app-xxx.vercel.app`

---

## Step 4: Verification

1. Open your deployment URL

2. Verify that:
   - ✅ Page loads correctly
   - ✅ City search works
   - ✅ Weather data displays
   - ✅ Adding/removing cities works

---

## 🔧 Troubleshooting

### Error "API key is invalid":
- Check that `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY` variable is added correctly
- Make sure the value exactly matches your API key
- After adding the variable, **Redeploy** the project

### Build error:
- Check logs in Vercel Dashboard → Deployments → your deployment → Logs
- Make sure all dependencies in `package.json` are correct

### Update environment variable:
1. Vercel Dashboard → your project → Settings → Environment Variables
2. Find `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY`
3. Click "Edit" → update value → "Save"
4. **Redeploy** (Deployments → three dots → Redeploy)

---

## 📝 Alternative Method (via Vercel CLI):

If you want to use the command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Sign in
vercel login

# Deploy
vercel

# Add environment variable
vercel env add NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
# Enter API key value, select all environments

# Deploy to production
vercel --prod
```

---

## ✅ Done!

After successful deployment, your project will be available at the Vercel URL.

**Important:** Every time you push changes to the `main`/`master` branch, Vercel will automatically create a new deployment!
