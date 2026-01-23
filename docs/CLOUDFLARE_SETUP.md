# Cloudflare Pages Setup Guide

This guide walks you through the step-by-step process of configuring Cloudflare Pages for your resume deployment.

## Prerequisites

- A Cloudflare account (free tier works fine)
- GitHub repository with this project
- Admin access to your GitHub repository

## Step 1: Get Your Cloudflare Account ID

1. **Log in to Cloudflare**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Sign in with your credentials

2. **Find Your Account ID**
   - On the main dashboard, scroll down to the right sidebar
   - You'll see **Account ID** listed under your account name
   - Click the copy icon to copy your Account ID
   - Save this for later - you'll need it for GitHub secrets

   > **Alternative method**: Go to any Workers & Pages section, and your Account ID will be visible in the URL or sidebar.

## Step 2: Create a Cloudflare API Token

1. **Navigate to API Tokens**
   - Click on your profile icon (top right)
   - Select **My Profile**
   - Click on the **API Tokens** tab in the left sidebar
   - Or go directly to: [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

2. **Create a New Token**
   - Click **Create Token**
   - Look for **Edit Cloudflare Workers** template or **Create Custom Token**

3. **Configure Token Permissions**

   If using a custom token, set these permissions:
   - **Account** → **Cloudflare Pages** → **Edit**

   > **Note**: For stricter security, you can also limit the token to specific accounts.

4. **Set Token Settings**
   - **Token name**: `GitHub Actions Resume Deployment` (or any name you prefer)
   - **TTL (Time to Live)**: Choose an expiration or set to never expire
   - **IP Address Filtering**: (Optional) Leave blank unless you want to restrict by IP

5. **Create and Copy Token**
   - Click **Continue to summary**
   - Review the permissions
   - Click **Create Token**
   - **⚠️ IMPORTANT**: Copy the token immediately - you won't be able to see it again!
   - Save this token securely - you'll need it for GitHub secrets

## Step 3: Configure GitHub Repository Secrets

1. **Go to Repository Settings**
   - Navigate to your GitHub repository
   - Click **Settings** (top menu)
   - In the left sidebar, click **Secrets and variables** → **Actions**

2. **Add CLOUDFLARE_API_TOKEN**
   - Click **New repository secret**
   - **Name**: `CLOUDFLARE_API_TOKEN`
   - **Value**: Paste the API token you copied from Step 2
   - Click **Add secret**

3. **Add CLOUDFLARE_ACCOUNT_ID**
   - Click **New repository secret** again
   - **Name**: `CLOUDFLARE_ACCOUNT_ID`
   - **Value**: Paste the Account ID you copied from Step 1
   - Click **Add secret**

## Step 4: Verify GitHub Actions Workflow

Your repository already includes the workflow file at `.github/workflows/deploy.yml`. Make sure it exists and has the correct configuration.

The workflow will automatically:

- Trigger on every push to the `main` branch
- Build your resume (JSON, HTML, and PDF)
- Deploy to Cloudflare Pages

## Step 5: Deploy to Cloudflare Pages

### Option A: Automatic Deployment (Recommended)

1. **Push to Main Branch**

   ```bash
   git add .
   git commit -m "Configure Cloudflare Pages deployment"
   git push origin main
   ```

2. **Monitor the Deployment**
   - Go to your GitHub repository
   - Click on the **Actions** tab
   - You should see a workflow run in progress
   - Click on it to view the deployment logs

3. **Get Your Site URL**
   - Once the deployment succeeds, check the workflow logs
   - Look for the deployment URL in the "Deploy to Cloudflare Pages" step
   - Your site will be available at: `https://resume-xxx.pages.dev`
   - You can also find it in the Cloudflare dashboard under **Workers & Pages**

### Option B: Manual Deployment

If you prefer to deploy manually without GitHub Actions:

1. **Authenticate Wrangler** (first time only)

   ```bash
   npx wrangler login
   ```

   This will open a browser window to authenticate with Cloudflare.

2. **Build and Deploy**

   ```bash
   npm run generate:all
   npm run deploy
   ```

3. **Follow the Prompts**
   - Wrangler will ask you to confirm the project name
   - Select your Cloudflare account
   - The deployment will proceed

## Step 6: Configure Custom Domain (Optional)

If you want to use a custom domain instead of `*.pages.dev`:

1. **Add Custom Domain in Cloudflare**
   - Go to your Cloudflare dashboard
   - Click **Workers & Pages**
   - Select your `resume` project
   - Go to the **Custom domains** tab
   - Click **Set up a custom domain**

2. **Enter Your Domain**
   - Enter your custom domain (e.g., `resume.yourdomain.com`)
   - Cloudflare will automatically configure the DNS records if your domain is managed by Cloudflare
   - If not, you'll need to add a CNAME record manually

3. **Wait for DNS Propagation**
   - DNS changes can take a few minutes to a few hours
   - Once complete, your resume will be accessible at your custom domain

## Troubleshooting

### Deployment Fails with "Unauthorized" Error

- Double-check that `CLOUDFLARE_API_TOKEN` is set correctly in GitHub secrets
- Verify your API token has the correct permissions (Cloudflare Pages → Edit)
- Make sure the token hasn't expired

### Deployment Fails with "Account Not Found"

- Verify `CLOUDFLARE_ACCOUNT_ID` is correct
- Make sure you copied the Account ID, not the Zone ID

### PDF Generation Fails in CI

- The workflow uses `npm run` instead of `bun run` to avoid Playwright compatibility issues
- Make sure Playwright browsers are installed (the workflow does this automatically)

### Build Succeeds but Site Doesn't Update

- Check if the deployment actually succeeded in the GitHub Actions logs
- Try a hard refresh in your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Check the Cloudflare Pages dashboard for deployment history

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [GitHub Actions for Cloudflare Pages](https://github.com/cloudflare/wrangler-action)

## Security Best Practices

1. **Never commit API tokens** to your repository
2. **Use GitHub secrets** for all sensitive credentials
3. **Rotate API tokens** periodically
4. **Limit token permissions** to only what's needed (Cloudflare Pages → Edit)
5. **Set token expiration** if you want automatic rotation

---

🎉 **Congratulations!** Your resume is now deployed to Cloudflare Pages with automatic CI/CD.
