# Verovyn Health Services — GitHub Pages Website

A responsive, static, multi-page B2B healthcare website for medical and dental revenue cycle management, with an original light-themed design, locally packaged healthcare imagery, AI-workflow illustrations, and founder profiles.

## What's included

- **27 separate content HTML pages**, plus a custom `404.html` — not hash-based fake pages or homepage scroll anchors.
- **Home**: `index.html` — concise overview, sample dashboard, service previews, AI positioning, target audiences.
- **Solutions**: `solutions/index.html` plus ten individual service-detail pages.
- **AI Platform**: `ai-platform/index.html` with six interactive *synthetic* AI agent workflow examples.
- **Who We Serve**: `who-we-serve/index.html` plus six segment-detail pages.
- **About**: `about/index.html` with co-founders Dev Kumar and Dr. Rohan Diwakar and provided profile photos.
- **Insights**: `insights/index.html` plus three original editorial pages.
- **Contact**: `contact/index.html` with client-side validation, local draft generation, and optional hosted-form configuration.
- **Privacy information**: `privacy/index.html` — *starter disclosure requiring review before publication*.
- Shared CSS, JavaScript, logos, images, favicon, and GitHub Pages `.nojekyll` marker.

## Deploy to GitHub Pages

1. Create a GitHub repository (for example, `verovyn-website`).
2. Upload **the contents of this folder**, keeping `index.html`, `assets/`, `solutions/`, and the other folders in the repository root.
3. In GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch **main** and folder **/(root)**, then save.
6. After GitHub publishes the site, test the homepage and all navigation links. Relative paths work for both project repositories and custom domains.
7. To connect a custom domain later, use the **Custom domain** field under Pages and follow GitHub's DNS verification guidance.

**Local preview:** Open `index.html` in a browser or run a static web server from the folder (for example, `python -m http.server 8000`) and visit `http://localhost:8000`.

## Configure contact details and enquiry delivery

The included contact form **does not send anything by default**; it prepares a draft locally and can open the visitor's email application. This is intentional until a verified business email / hosted-form service is configured.

Edit **`assets/js/site-config.js`**:

```js
window.VEROVYN_CONFIG = {
  contactEmail: "",      // e.g., a verified company inbox
  formEndpoint: ""       // optional HTTPS form-handler URL, such as a configured Formspree endpoint
};
```

- `contactEmail` populates the draft's mailto recipient. Set it to an **actual confirmed** Verovyn address.
- When `formEndpoint` is an HTTPS URL, the form attempts an AJAX JSON POST and reports success **only if the server returns a success status**. You must configure, test, and review the provider's data practices before enabling it.
- Avoid collecting any protected health information. The contact page explicitly warns visitors not to enter PHI.
- A GitHub Pages website is static. GitHub itself does not process or email form submissions.

## Before the public launch

- [ ] Confirm the legal business name and company/service claims with the co-founders.
- [ ] Confirm both co-founder bios and permission to publish their headshots.
- [ ] Add and verify the company email address and/or hosted enquiry endpoint.
- [ ] Finalize the privacy policy and other required legal pages with professional review.
- [ ] Review any AI capability as **current, pilot, or planned** before representing it as live.
- [ ] Check the responsive layout and forms again on the deployed domain.
- [ ] Set the final domain and add domain-specific canonical URLs and sitemap once the actual domain is known.
- [ ] Confirm and configure the contact form endpoint for real lead submissions (currently draft-only).

## Design and content integrity

- Dashboard figures on the homepage are explicitly **illustrative sample data**, not Verovyn operational results.
- The AI agent explorer is a **synthetic interface demonstration**, not a live payer/claims connection.
- There are no fabricated client testimonials, service guarantees, customer logos, operating metrics, contact addresses, phone numbers, or performance statistics.
- Images are locally stored and include previously created original healthcare-operation visuals and the founder portraits contained in the supplied Verovyn source material.
- The website uses system font stacks and does not require Google Fonts or any network-hosted image. All photos, logos, styles, and scripts ship with this ZIP.

## Directory guide

```text
index.html
.nojekyll
robots.txt
README.md
assets/
  css/site.css
  js/site.js
  js/site-config.js
  images/*.webp
  images/verovyn-original-logo.png
  images/verovyn-logo-horizontal.webp
  favicon.png
  IMAGES.md
solutions/
  index.html
  [10 service pages].html
ai-platform/index.html
who-we-serve/
  index.html
  [6 industry pages].html
about/index.html
insights/
  index.html
  [3 article pages].html
contact/index.html
privacy/index.html
```

Site creation: October 2026.

## Photo policy
The requested generic exterior office-building images were removed. The bundled images feature healthcare professionals, billing workflows, and AI-enabled revenue operations. All assets reside in `assets/images/` for editing or replacement. The original supplied Verovyn logo is included, along with a compact horizontal composition using the same original artwork.

## Final package validation
- All images, CSS, JS, and branding are local files inside the ZIP.
- No third-party CSS, fonts, or scripts are loaded at runtime.
- Desktop and mobile layout smoke tests completed for main navigation pages.
- AI agent explorer is a demonstration using synthetic sample workflows; it does not handle real patient data.
- Contact enquiries remain draft-only until you configure a verified destination/form endpoint.
- All generic exterior office-building photographs have been excluded.
