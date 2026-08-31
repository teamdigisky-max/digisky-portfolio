# DigiSky Portfolio

Updated portfolio with all 34 supplied project URLs.

## What was fixed
- All 34 portfolio projects now have their supplied website URL.
- Clicking a project opens the real website in a new tab.
- Portfolio thumbnails are generated from the project URL using Thum.io, with a local fallback thumbnail if the screenshot service is unavailable.
- Existing `localStorage` data is migrated so the supplied URLs cannot be overwritten by the older blank project links.
- Custom projects can still be added and edited from `/admin`.
- Public pages do not show the admin panel; open `/admin` only when you need to edit content.

## Run locally
```bash
npm install
npm run dev
```

## Admin
Open `/admin` after starting the app. Changes are saved in the browser's localStorage.

## Thumbnail note
The live thumbnails use Thum.io's URL screenshot endpoint. Its public service currently provides a free allowance, so thumbnails work without adding a screenshot API key. For a high-traffic production portfolio, download/store the screenshots locally later to avoid depending on a third-party screenshot service.
