# TradeBase

Simple, lightweight, framework-free static marketing website for TradeBase — WhatsApp record-keeping for informal traders in Ghana.

## Structure

- `index.html` — Homepage and marketing landing page
- `contact.html` — Contact and inquiry page
- `style.css` — Stylesheet
- `script.js` — Vanilla JavaScript (form submission & interactions)
- `netlify.toml` — Netlify configuration with security and cache headers
- `robots.txt` & `sitemap.xml` — SEO indexing files
- `PLACEHOLDERS.txt` — Notes on configuration tokens (e.g. `{{SITE_URL}}`)

## Development

No build tools, bundlers, or Node.js dependencies are required. You can preview the site using any static web server:

```sh
# Using Python
python -m http.server 8000

# Or open index.html directly in any browser
```

## Deployment

The site is configured for zero-build deployment on Netlify via `netlify.toml` (`publish = "."`).
