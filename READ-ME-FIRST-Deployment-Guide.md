# PrimeBooks Consulting — Website Deployment & Security Guide

Everything you need to put this website live. Written for someone with **no IT background** —
just follow the steps in order.

**Legal entity:** 786 Trading and Consulting LLC (d/b/a Primebooks Consulting LLC)

---

## 1. What's in this folder

| File / folder | What it is |
|---|---|
| `index.html` | Your website (the home page). |
| `404.html` | A friendly "page not found" page. |
| `css/styles.css` | All the styling (colors, fonts, layout). |
| `js/main.js` | The small bit of code that runs the menu and animations. |
| `customHttp.yml` | Security settings AWS applies automatically. **Keep this file.** |
| `robots.txt`, `sitemap.xml` | Help search engines list your page (update the domain placeholder). |
| `.nojekyll`, `.gitignore` | Housekeeping for GitHub. |
| `README.md` | Quick-start (GitHub + AWS). |
| `READ-ME-FIRST-Deployment-Guide.md` | This guide. |

**Keep the folder structure as-is.** `index.html` stays at the top, with `css` and `js` next to it.

---

## 2. Two ways to go live

- **GitHub Pages** — free and quick. Great for getting online fast. (Doesn't support custom
  security headers, but the site still runs over HTTPS and the Content-Security-Policy still applies.)
- **AWS Amplify Hosting** — recommended. HTTPS, global CDN, **and** it applies all the security
  headers in `customHttp.yml` automatically.

You can start on GitHub Pages and move to Amplify later — the same files work for both.
Step-by-step GitHub instructions are in `README.md`. AWS steps are below.

---

## 3. Deploy on AWS Amplify

You'll need an **AWS account** (free to create at https://aws.amazon.com). A small brochure site
like this typically costs only a few dollars a month or less.

### Easiest: connect your GitHub repo (auto-updates)
1. Put the site on GitHub first (see `README.md`, Option A1).
2. Sign in to https://console.aws.amazon.com → search **Amplify** → open **AWS Amplify**.
3. **Create new app → GitHub** → authorize → pick your repository and the **main** branch.
4. Leave build settings as-is (it's a static site) → **Save and deploy**.
5. After ~1 minute you get a live `https://…amplifyapp.com` link with HTTPS. Every time you
   change the site on GitHub, Amplify updates it automatically.

### Or: drag-and-drop (no GitHub)
1. Zip the **contents** of this folder (select the files inside — `index.html`, `404.html`,
   `css`, `js`, `customHttp.yml`, etc. — and compress). When you open the zip you should see
   `index.html` right there, not another folder.
2. **Amplify → Create new app → Deploy without Git → Drag and drop** → upload the zip → **Save and deploy**.

> If the security headers ever don't apply from the zip, set them by hand: Amplify → your app →
> **Hosting → Custom headers**, paste the contents of `customHttp.yml`, and save.

---

## 4. Your own domain (e.g., www.primebooks-consulting.com)

Optional, any time after Section 3.

1. **Get a domain** (inside AWS via **Route 53**, or from GoDaddy/Namecheap/etc.).
2. In **Amplify → Hosting → Custom domains → Add domain**, type your domain and follow the prompts.
   Amplify creates a free **SSL certificate** and shows you **DNS records** to add.
3. Add those DNS records (Route 53 can do it for you; otherwise add them at your provider).
4. Wait for verification (15 min–a few hours). Your site then answers on your domain over HTTPS.
5. **After the domain is live,** update the placeholder in `robots.txt` and `sitemap.xml`
   (`YOUR-DOMAIN.com` → your real domain) and re-deploy.

---

## 5. How visitors contact you

There is **no contact form** — by design, so there's nothing to break or maintain. Visitors reach
you directly through the **Email / Call / WhatsApp** buttons that appear in the hero, the contact
section, and the footer:

- **Email:** hkhan@primebooks-consulting.com
- **Call / WhatsApp:** +1 (646) 467-2492

These are normal links: email opens the visitor's mail app addressed to you, the number dials on a
phone, and WhatsApp opens a chat to your number. If you ever want an on-page form that emails you
automatically, that can be added later with a form service — just ask.

---

## 6. Confirm your site is secure (2-minute check)

Once live (best on Amplify, which sets the headers):
1. Go to **https://securityheaders.com**, paste your site's address, **Scan** → aim for **A/A+**.
2. Go to **https://www.ssllabs.com/ssltest/**, paste your domain → aim for **A** on HTTPS/SSL.

If a score is lower than expected, it's almost always because the custom headers weren't applied —
redo the note at the end of Section 3.

---

## 7. What it costs

Amplify for a small site is usually **free to a few dollars a month**; the AWS free tier typically
covers a new site's first year of normal traffic. A domain is about **$12–$15/year**. GitHub Pages
is free. Set a **billing alert** in AWS (**Billing → Budgets**) if you want a safety net.

---

## 8. What was done for security (summary)

- **No contact form, no server, no database** — nothing for an attacker to break into.
- **No third-party/tracking code and no external JavaScript** — the only outside resource is Google Fonts.
- **Strict Content-Security-Policy** — the browser only runs this site's own code.
- **HTTPS enforced** with **HSTS**; **clickjacking** and **MIME-sniffing** protection; locked-down
  browser features (`Permissions-Policy`); sensible referrer/cross-origin policies.

> The most important thing on your side: protect your **GitHub and AWS accounts with strong passwords
> and two-factor authentication (MFA)**.

---

### Alternative hosting (for a technical helper)
Classic **S3 + CloudFront**: private S3 bucket (block public access), upload these files, CloudFront in
front using **Origin Access Control (OAC)**, an **ACM** certificate for HTTPS, **Default root object**
`index.html`, 403/404 responses pointing to `/404.html`, and a **CloudFront Response Headers Policy**
with the headers from `customHttp.yml`. Amplify is recommended unless you have a reason not to use it.

---

*Questions on any step? Send me the step number and what you're seeing, and I'll walk you through it.*
