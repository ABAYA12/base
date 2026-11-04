/*
  TOKENS USED IN THIS FILE:
  233246699008 - WhatsApp fallback link in the form error message
  (The Formspree endpoint is NOT repeated here; it is read from form.action in index.html.)
*/
(function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  var form = document.getElementById("contact-form");
  if (!form || !window.fetch) return;
  var status = document.getElementById("form-status");
  var btn = form.querySelector('button[type="submit"]');
  var label = btn.textContent;
  var WA = "https://wa.me/233246699008?text=Hello%20TradeBase%2C%20I%27d%20like%20to%20know%20more";

  function show(type, html) {
    status.className = "status " + type;
    status.innerHTML = html;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending...";
    status.className = "status";
    status.textContent = "";

    // Endpoint comes from the form's action attribute in index.html.
    // Keep the configured endpoint in the form action only.
    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Bad response");
        show("ok", "Thank you, we've received your message and will reply shortly.");
        form.reset();
      })
      .catch(function () {
        show("err", 'Sorry, that didn\'t send. Please try again or <a href="' + WA + '" target="_blank" rel="noopener">message us on WhatsApp</a>.');
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
  });
})();
