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

## Step 2: Create a Cloudflare API Token with Minimal Permissions

For security best practices, we'll create a custom API token with only the permissions needed for Cloudflare Pages deployment.

1. **Navigate to API Tokens**
   - Click on your profile icon (top right)
   - Select **My Profile**
   - Click on the **API Tokens** tab in the left sidebar
   - Or go directly to: [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)

2. **Create a Custom Token**
   - Click **Create Token**
   - Click **Create Custom Token** (do NOT use a template)

3. **Configure Minimal Permissions**

   Set ONLY these permissions for the token:

   | Permission Type | Resource         | Permission Level |
   | --------------- | ---------------- | ---------------- |
   | Account         | Cloudflare Pages | Edit             |

   **How to add this permission:**
   - Under **Permissions**, click **+ Add more**
   - In the first dropdown, select **Account**
   - In the second dropdown, select **Cloudflare Pages**
   - In the third dropdown, select **Edit**

   > **✅ Security Note**: This is the absolute minimum permission required for deploying to Cloudflare Pages via GitHub Actions. Do NOT add additional permissions.

4. **Configure Account Resources** (Optional but Recommended)
   - Under **Account Resources**, select **Include** → **Specific account**
   - Choose your specific Cloudflare account from the dropdown
   - This limits the token to only work with your specific account

5. **Set Token Settings**
   - **Token name**: `GitHub Actions Resume Deployment`
   - **TTL (Time to Live)**:
     - **Recommended**: Set to **1 year** for automatic rotation
     - Or set to **Never expire** if you prefer (requires manual rotation)
   - **IP Address Filtering**: Leave blank (GitHub Actions uses dynamic IPs)

6. **Review and Create Token**
   - Click **Continue to summary**
   - Verify the summary shows:
     - ✅ Permissions: `Account - Cloudflare Pages - Edit`
     - ✅ Account Resources: Your specific account (if configured)
     - ✅ No additional permissions listed
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

## Step 7: Redirect www to Root Domain (Recommended)

To ensure that visiting `www.yuriolive.com` redirects to `yuriolive.com`, follow these steps:

1. **Add www to Pages Custom Domains**
   - Go to **Workers & Pages** > your project > **Custom domains**.
   - Click **Set up a custom domain** and add `www.yuriolive.com`.
   - Cloudflare will likely say it's ready. This step is important because it ensures Cloudflare generates a valid SSL certificate for the `www` subdomain.

2. **Create a Redirect Rule**
   - In the Cloudflare sidebar, go to **Rules** > **Redirect Rules**.
   - Click **Create rule**.
   - **Rule name**: `Redirect www to Root`.
   - **When incoming requests match**:
     - Field: `Hostname`
     - Operator: `equals`
     - Value: `www.yuriolive.com` (use your actual domain)
   - **Then incoming requests are redirected...**:
     - Type: `Dynamic`
     - Expression: `concat("https://yuriolive.com", http.request.uri.path)`
     - Status code: `301` (Permanent Redirect)
     - Preserve query string: Checked
   - Click **Deploy**.

This setup ensures that all traffic to the `www` version of your site is automatically and securely redirected to the root domain.

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
