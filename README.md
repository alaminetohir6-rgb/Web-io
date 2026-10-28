# AL-Amine.io — complete website package

This package contains the updated AL-Amine.io website and its supporting PWA files. The Google Search Console HTML verification tag is included in `site/index.html`.

## Files
- `site/index.html` — full website, styling, scripts, logo and page content; includes the Google verification meta tag.
- `site/manifest.webmanifest` — installable web-app metadata.
- `site/sw.js` — service worker for basic offline caching.
- `site/icons/` — app icons and favicon assets.
- `site/robots.txt` — crawler instructions.

## Publish on GitHub Pages
1. Download and extract this ZIP.
2. Open the existing GitHub repository for the website.
3. Upload the **contents of the `site` folder** into the repository folder that GitHub Pages publishes (usually the repository root). Do not upload only the ZIP file.
4. Keep the names exactly as provided, especially `index.html`, `manifest.webmanifest`, `sw.js`, and the `icons` folder.
5. Commit the changes and wait for GitHub Pages to finish publishing.
6. Open the live website and check it loads. Then return to Google Search Console and click Verify for the HTML-tag method.

## Important
The files are prepared together, but this ZIP has not been uploaded to GitHub and Google has not verified the live website. The HTML-tag method requires the meta tag in the published homepage's `<head>`. If you choose Google's HTML-file method instead, download and upload the exact verification file Google provides; that is a different method.

This is the website/PWA source package. It does not include a built Android APK/AAB or an iOS App Store build.


## Suggestions & Design Feedback
The site now includes a Suggestions & Design Feedback section in the navigation. Visitors can select a feedback category and service/page, describe requested changes, optionally add a contact number, and open a prefilled WhatsApp message. Visitors must review and tap Send themselves. Feedback is not saved to a database by this static GitHub Pages version.


## Service requests and suggestions
The website includes a “Suggest / Request a Service” section. Visitors can request a service that is not listed, propose a new service or feature, describe what they need, and prepare a WhatsApp message to the selected business number. Messages are only sent when the visitor confirms them in WhatsApp; this static site does not store requests in a database.
