# LIORA Life Science website (redesign)

A bilingual (English default, Simplified Chinese) static site. No build step and no server code.

## Files
- `index.html` – the whole site. Sections are switched by the URL hash: `#home`, `#about`, `#treatments`, `#livra`, `#academy`, `#creation`, `#journal`, `#app`, `#contact`, `#legal` (plus `#refund`, `#privacy`, `#terms`, `#join`).
- `assets/styles.css`, `assets/app.js` – design system, language switch, router, rewards calculator, WhatsApp contact form, hero animation.
- `assets/img/` – every image the site uses. Nothing is loaded from the old WordPress site.
- `.nojekyll` – tells GitHub Pages to serve the files as they are.

## Deploy
**GitHub Pages:** push this folder to the root of a repository, then in the repo go to Settings → Pages → Build and deployment → Source: *Deploy from a branch*, choose `main` and `/ (root)`, and save. The `CNAME` file already contains liora.com.my, so GitHub will show it under *Custom domain*. Then point the domain's DNS at GitHub Pages: four `A` records for `@` to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, plus a `CNAME` record for `www` to `<your-github-username>.github.io`. Then tick *Enforce HTTPS*.

Any other static host (Cloudflare Pages, Netlify, cPanel public_html) works too: upload the folder as is.

## Editing text
Every piece of copy appears twice, side by side:
`<span lang="en">English</span><span lang="zh">中文</span>`. Edit both. The language toggle (top right) remembers the visitor's choice; `?lang=zh` opens the site in Chinese.

## Join flow
Hero button, sticky mobile bar, `#join` section and `#app` page all lead to:
1. Register: https://app.liora.com.my/register
2. Download: App Store https://apps.apple.com/my/app/liora-life-science/id6761354941 · Google Play https://play.google.com/store/apps/details?id=com.liora.user.app

## Before launch, please confirm
- **Public email**: the old site hides it behind Cloudflare email protection, so it could not be read. Add it to the Contact section and footer if you want it shown. The contact form currently prepares a WhatsApp message to +60 17-407 3963.
- **LIVRA one-line descriptors** (scalp & hair, body care, skin radiance, intimate care, essence) are inferred from the product names; product details stay in the original slide images.
- **Legal pages** are condensed from the current policies. Paste in the full verbatim text if your lawyer requires it. Chinese visitors see a note that the English version prevails.
- **Wellness Tips intros and the three habits per article**, the exosome explainer, the "How a visit works" steps and the app FAQ are new copy written for this redesign. The "Open the full guide" card strips (4 guides × 8 cards, EN/中文, inline SVG icons) are also new and replace the old WordPress infographic images, so the Wellness Tips page no longer depends on WordPress. The five LIVRA product guides (Regrow & Replenish, Body Series, Radiance Velvet, Intimate, Revitalize Essence) were rebuilt the same way, using wording transcribed from the owner's own LIVRA slides (copies are on the owner's PC in D:\OneDrive\Liora\Website\livra-slides).
- Google Play: `com.liora.user.app` (developer LIORA LIFE SCIENCE SDN. BHD.) was used; `com.liora.my.app` returned 404.

## Photo credits
Free photos from Unsplash (Unsplash License, free for commercial use, no attribution required): hero portrait `photo-1581182800629`, breakfast `photo-1494390248081`, sleep `photo-1531353826977`, yoga `photo-1544367567`, yogurt bowl `photo-1501959915551`. All other images are LIORA's own from liora.com.my.

## Brand assets (added 2026-10-01)
- Theme follows the logo: orange #F58220 on white (orange text uses #C2600E for legibility), gold #ECBF24 highlights, LIVRA gold #D8BB42 in the LIVRA ritual section.
- `assets/img/` holds the uploaded logo (cropped; white version used in dark mode), team photo and product images, resized for the web (1000 px, team 1536 px).
- The LIVRA ritual (Recode Cleanser 100 ml, Bloom Toner 120 ml, Caviar Essence 30 ml, CoreLift Cream 120 g) now leads the LIVRA section and the home page. The order and sizes come from the product boxes; the "cleanse, tone, treat, seal" wording is new copy.

## Wellness Tips photos
`assets/img/wellness/` holds 12 free Unsplash photos (Unsplash License): clean-1 photo-1547496502, clean-2 photo-1494390248081, clean-3 photo-1606757819934, sleep-1 photo-1686828752370, sleep-2 photo-1585128719715, sleep-3 photo-1520206183501, move-1 photo-1571019613454, move-2 photo-1544367567, move-3 photo-1546483875, morning-1 photo-1552650272, morning-2 photo-1501959915551, morning-3 photo-1597586594276.

## Link previews (WhatsApp, Facebook)
`index.html` has Open Graph tags pointing at `https://liora.com.my/assets/img/og-image.jpg` (1200×630, LIORA logo). Previews only work once the site is live on liora.com.my. WhatsApp caches previews, so a link shared before the switch may keep its old preview for a while. Facebook's Sharing Debugger (developers.facebook.com/tools/debug) can force a refresh.
