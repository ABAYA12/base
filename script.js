(function () {
  // Update footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Handle contact form submission
  var form = document.getElementById("contact-form");
  if (!form || !window.fetch) return;
  var status = document.getElementById("form-status");
  var btn = form.querySelector('button[type="submit"]');
  var label = btn.textContent;
  var WA = "https://wa.me/233241892746?text=Hello%20TradeBase%2C%20I%27d%20like%20to%20know%20more";

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

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
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
