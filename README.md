# PrimeBooks Consulting — Website

Marketing website for **786 Trading and Consulting LLC (d/b/a Primebooks Consulting LLC)**.
Static site (plain HTML/CSS/JS) — no build step, no server, no database.

---

## Files

| File / folder | Purpose |
|---|---|
| `index.html` | The website (home page). |
| `404.html` | "Page not found" page. |
| `css/styles.css` | All styling. |
| `js/main.js` | Menu + scroll animations. |
| `robots.txt`, `sitemap.xml` | Search-engine hygiene (update the domain placeholder). |
| `customHttp.yml` | Security headers for AWS Amplify (see note under GitHub Pages). |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (do not remove). |
| `.gitignore` | Keeps OS/editor junk out of the repo. |

Keep the folder layout as-is: `index.html` at the top with `css/` and `js/` beside it.

**Contact:** the site has no form. Visitors reach you directly via the Email / Call / WhatsApp
buttons (hero, contact section, and footer) — email `hkhan@primebooks-consulting.com`,
phone/WhatsApp `+1 (646) 467-2492`. Nothing to configure or maintain.

---

## Option A — Put it on GitHub & publish with GitHub Pages (free)

Great for a fast, free live version.

### A1. Upload in the browser (no tools to install)
1. Sign in at https://github.com and click **New** to create a repository.
   - Name it e.g. `primebooks-website`. Set it **Public** (Pages is free for public repos). Click **Create repository**.
2. On the new repo page, click **uploading an existing file**.
3. Drag in **all the items** from this folder (including the `css` and `js` folders and the hidden `.nojekyll` file). Click **Commit changes**.
   - If you can't see `.nojekyll` in your file picker, create it in GitHub instead: **Add file → Create new file**, name it `.nojekyll`, leave it empty, and commit.
4. Go to **Settings → Pages**. Under **Build and deployment → Source**, choose **Deploy from a branch**, pick branch **main** and folder **/ (root)**, then **Save**.
5. Wait ~1 minute, refresh the Pages settings page, and you'll see your live link:
   `https://YOUR-USERNAME.github.io/primebooks-website/` — that's your site. 🎉

### A2. Custom domain on GitHub Pages
In **Settings → Pages → Custom domain**, type your domain and save; then add the DNS records GitHub shows you at your domain provider. Tick **Enforce HTTPS** once it's verified.

> **Note — links & the 404 page on a project URL.** When your site lives at
> `github.io/primebooks-website/` (a sub-path), the "Back to home" link on `404.html`
> (which points to `/`) goes to the GitHub root, not your site. Fix it by using a
> **custom domain** (recommended — then `/` is your site) or by editing `404.html` and
> changing `href="/"` to `href="/primebooks-website/"`. All the in-page menu links work either way.

> **Note — security headers on GitHub Pages.** GitHub Pages can't set custom HTTP headers,
> so the header-based protections in `customHttp.yml` (HSTS, X-Frame-Options, etc.) won't
> apply there. The **Content-Security-Policy is still enforced** via the `<meta>` tag inside
> `index.html`, and Pages serves everything over HTTPS. For the *full* header set, host on
> **AWS Amplify** or **CloudFront** (Option B) — `customHttp.yml` is already set up for that.

---

## Option B — AWS Amplify Hosting (recommended for full security headers)

Amplify gives HTTPS, a global CDN, **and** applies every header in `customHttp.yml` automatically.

**Connected to GitHub (recommended — auto-updates):** in the AWS Console →
**Amplify → Create new app → GitHub**, authorize and pick this repository. No build settings
are needed (it's a static site). Every push to GitHub redeploys the live site automatically.

**Or drag-and-drop (no Git):** zip the **contents** of this folder, then
**Amplify → Create new app → Deploy without Git → Drag and drop** → upload the zip → **Save and deploy**.

Custom domain, HTTPS certificate, and cost details are in `READ-ME-FIRST-Deployment-Guide.md`.

---

## Updating the site later
Edit the files, then:
- **GitHub Pages / Amplify-on-GitHub:** commit/upload the change to the repo — it redeploys automatically.
- **Amplify drag-drop:** upload a new zip.

## Security summary
No third-party/tracking code, no external JavaScript (only Google Fonts), no form/no server.
Strict Content-Security-Policy, HTTPS, clickjacking and MIME-sniffing protection, locked-down
browser permissions. Full details in `READ-ME-FIRST-Deployment-Guide.md`. Protect your GitHub/AWS
account with a strong password and 2-factor authentication.
