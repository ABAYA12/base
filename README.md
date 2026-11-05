# TradeBase Website

Static marketing and contact website for **TradeBase** — WhatsApp-based sales record-keeping for informal traders and trade associations in Ghana. Built with plain HTML, CSS, and vanilla JavaScript with zero external dependencies or build steps.

## File Structure

```text
├── index.html     # Homepage (hero, how it works, benefits, FAQ)
├── contact.html   # Contact page (Formspree inquiry form and WhatsApp/email links)
├── style.css      # Shared layout and component styles
├── script.js      # Footer year update and async contact form handling
├── robots.txt     # Search engine crawler rules
├── sitemap.xml    # XML sitemap for search indexing
└── README.md      # Project documentation
```

## Configuration

### Changing the WhatsApp Number
Find and replace `233241892746` with your full international phone number (country code + number, digits only, no `+` or spaces) in:
1. `index.html` (header button, hero button, floating button)
2. `contact.html` (header button, contact card button, floating button)
3. `script.js` (`WA` fallback URL variable)

### Changing the Formspree ID
In `contact.html`, locate the `<form id="contact-form">` element and update the `action` URL with your Formspree form ID:
```html
<form id="contact-form" class="card" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Changing the Contact Email or Site URL
- **Email**: Update `example@trade.com` in `contact.html`.
- **Site URL**: If moving to a custom domain, replace `https://tbase.netlify.app` in `index.html`, `contact.html`, `robots.txt`, and `sitemap.xml`.

## Deploying on Netlify

1. Connect the Git repository to Netlify (or drag and drop the project folder in the Netlify Deploys dashboard).
2. In **Site configuration → Build & deploy → Build settings**:
   - **Build command**: Leave blank (empty)
   - **Publish directory**: `.` (or leave blank)
3. Trigger a deploy. Netlify will serve `index.html` directly from the repository root.
