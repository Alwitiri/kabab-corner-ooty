/* ===== Kabab Corner — shared behaviour ===== */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // Image fallback: keep the warm gradient placeholder if a photo fails
  document.addEventListener("error", (e) => {
    const t = e.target;
    if (t.tagName === "IMG" && !t.dataset.failed) { t.dataset.failed = 1; t.removeAttribute("src"); t.classList.add("ph"); }
  }, true);

  // Header on scroll (+ expose its height to CSS for sticky bars)
  const header = $(".site-header");
  const setHeaderH = () => header && document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);
    setHeaderH();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", setHeaderH);
  onScroll();

  // Mobile nav (slide-in panel with backdrop, locks page scroll)
  const toggle = $(".menu-toggle"), links = $(".nav-links");
  if (toggle && links) {
    const backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    document.body.appendChild(backdrop);
    const setNav = (open) => {
      links.classList.toggle("open", open);
      backdrop.classList.toggle("open", open);
      document.body.classList.toggle("no-scroll", open);
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      toggle.setAttribute("aria-expanded", open);
    };
    toggle.addEventListener("click", () => setNav(!links.classList.contains("open")));
    backdrop.addEventListener("click", () => setNav(false));
    $$("a", links).forEach((a) => a.addEventListener("click", () => setNav(false)));
  }

  // Mobile bottom action bar: Call · Menu/Home · Book · WhatsApp
  if (typeof RESTAURANT !== "undefined") {
    const onMenu = /menu\.html/.test(location.pathname);
    const bar = document.createElement("nav");
    bar.className = "mobile-bar";
    bar.setAttribute("aria-label", "Quick actions");
    bar.innerHTML = `
      <a href="tel:${RESTAURANT.phone.replace(/\s/g, "")}"><i class="fa-solid fa-phone"></i><span>Call</span></a>
      ${onMenu
        ? `<a href="index.html"><i class="fa-solid fa-house"></i><span>Home</span></a>`
        : `<a href="menu.html"><i class="fa-solid fa-book-open"></i><span>Menu</span></a>`}
      <a href="#" data-book class="primary"><i class="fa-regular fa-calendar-check"></i><span>Book</span></a>
      <a href="https://wa.me/${RESTAURANT.whatsapp}" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i><span>WhatsApp</span></a>`;
    document.body.appendChild(bar);
    document.body.classList.add("has-mobile-bar");
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  // Toast
  const toast = document.createElement("div");
  toast.className = "toast";
  document.body.appendChild(toast);
  let tt;
  window.showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove("show"), 2200);
  };

  // Footer contact details from data.js
  if (typeof RESTAURANT !== "undefined") {
    $$("[data-r]").forEach((el) => { el.textContent = RESTAURANT[el.dataset.r]; });
    $$("[data-tel]").forEach((el) => { el.href = "tel:" + RESTAURANT.phone.replace(/\s/g, ""); });
    const q = encodeURIComponent(RESTAURANT.mapQuery);
    $$("[data-map]").forEach((el) => { el.src = `https://maps.google.com/maps?q=${q}&z=15&output=embed`; });
    $$("[data-directions]").forEach((el) => { el.href = `https://www.google.com/maps/dir/?api=1&destination=${q}`; });
  }
  const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

  // Open a WhatsApp chat with the restaurant, message pre-filled. Returns the link.
  window.openWhatsApp = (text) => {
    const url = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(text)}`;
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url; // popup blocked → open in same tab
    return url;
  };

  // ===== Booking modal =====
  const modal = $("#bookModal");
  if (modal) {
    const form = $("form", modal), body = $(".modal-body", modal), success = $(".success", modal);
    const open = () => {
      modal.classList.add("open");
      body.hidden = false; success.hidden = true;
      const d = $("#bDate", modal);
      const today = new Date().toISOString().split("T")[0];
      d.min = today; if (!d.value) d.value = today;
      setTimeout(() => $("#bName", modal).focus(), 50);
    };
    const close = () => modal.classList.remove("open");
    $$("[data-book]").forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); open(); }));
    $$("[data-close]", modal).forEach((b) => b.addEventListener("click", close));
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const dt = new Date(data.date + "T" + data.time);
      const day = dt.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      const time = dt.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

      // Build the WhatsApp message and open a chat with the restaurant
      const lines = [
        "*Table Booking Request - Kabab Corner*",
        "",
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Date: ${day}`,
        `Time: ${time}`,
        `Guests: ${data.guests}`,
      ];
      if (data.note && data.note.trim()) lines.push(`Request: ${data.note.trim()}`);
      const url = openWhatsApp(lines.join("\n"));

      $(".success-msg", modal).innerHTML =
        `Thank you, ${data.name.replace(/[<>&]/g, "")}! WhatsApp has opened with your booking for ${data.guests} on ${day} at ${time}. ` +
        `Just press <strong>Send</strong> and we'll confirm shortly.<br /><br />` +
        `<a class="gold" href="${url}" target="_blank" rel="noopener">WhatsApp didn't open? Tap here.</a>`;
      body.hidden = true; success.hidden = false;
      form.reset();
    });
  }
})();
