/* ==========================================================================
   LUXDENT — site shell
   Progressive enhancement only: every section is usable with JS disabled.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function on(el, evt, fn, opts) {
    if (el) el.addEventListener(evt, fn, opts);
  }

  /* --- Header: raise on scroll ------------------------------------------ */

  (function header() {
    var el = document.querySelector("[data-header]");
    if (!el) return;

    var ticking = false;

    function apply() {
      el.classList.toggle("is-raised", window.scrollY > 12);
      ticking = false;
    }

    on(window, "scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    }, { passive: true });

    apply();
  })();

  /* --- Mobile navigation ------------------------------------------------- */

  (function nav() {
    var toggle = document.querySelector("[data-nav-toggle]");
    var panel = document.querySelector("[data-nav]");
    if (!toggle || !panel) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("has-nav-open", open);
    }

    on(toggle, "click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Any nav link closes the panel; the browser handles the jump itself.
    panel.querySelectorAll("a[href]").forEach(function (link) {
      on(link, "click", function () { setOpen(false); });
    });

    on(document, "keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    // Leaving the mobile breakpoint should never strand a locked body.
    var wide = window.matchMedia("(min-width: 921px)");
    var onChange = function (e) { if (e.matches) setOpen(false); };
    if (wide.addEventListener) wide.addEventListener("change", onChange);
    else if (wide.addListener) wide.addListener(onChange);
  })();

  /* --- Scrollspy --------------------------------------------------------- */

  (function scrollspy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll("[data-nav] a[href^='#']")
    );
    if (!links.length || !("IntersectionObserver" in window)) return;

    var byId = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = id && document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var visible = new Set();

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // Highlight the topmost section currently on screen.
      var current = sections.filter(function (s) { return visible.has(s.id); })[0];
      links.forEach(function (l) { l.classList.remove("is-current"); });
      if (current && byId[current.id]) {
        byId[current.id].classList.add("is-current");
      }
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { io.observe(s); });
  })();

  /* --- Reveal on scroll -------------------------------------------------- */

  (function reveal() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
    if (!items.length) return;

    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });
  })();

  /* --- FAQ: one answer open at a time ------------------------------------ */

  (function faq() {
    var list = document.querySelectorAll("[data-faq] details");
    list.forEach(function (item) {
      on(item, "toggle", function () {
        if (!item.open) return;
        list.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  })();

  /* --- Booking form ------------------------------------------------------ */

  (function booking() {
    var form = document.querySelector("[data-booking]");
    if (!form) return;

    var status = form.querySelector("[data-booking-status]");
    var phone = form.querySelector("input[type='tel']");

    /* Format as +7 (999) 123-45-67 while preserving a usable caret at the end. */
    if (phone) {
      on(phone, "input", function () {
        var digits = phone.value.replace(/\D/g, "");
        if (digits[0] === "8") digits = "7" + digits.slice(1);
        if (digits[0] !== "7") digits = "7" + digits;
        digits = digits.slice(0, 11);

        var out = "+7";
        if (digits.length > 1) out += " (" + digits.slice(1, 4);
        if (digits.length >= 4) out += ") " + digits.slice(4, 7);
        if (digits.length >= 8) out += "-" + digits.slice(7, 9);
        if (digits.length >= 10) out += "-" + digits.slice(9, 11);
        phone.value = out;
      });

      on(phone, "focus", function () {
        if (!phone.value) phone.value = "+7 ";
      });
    }

    function fieldError(field, message) {
      var wrap = field.closest(".field");
      if (!wrap) return;
      var slot = wrap.querySelector("[data-error]");
      wrap.classList.toggle("has-error", Boolean(message));
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (slot) slot.textContent = message || "";
    }

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      on(field, "input", function () { fieldError(field, ""); });
    });

    on(form, "submit", function (e) {
      e.preventDefault();

      var ok = true;
      var first = null;

      var name = form.querySelector("#booking-name");
      var tel = form.querySelector("#booking-phone");
      var consent = form.querySelector("#booking-consent");

      if (name && name.value.trim().length < 2) {
        fieldError(name, "Укажите, как к вам обращаться");
        first = first || name;
        ok = false;
      }
      if (tel && tel.value.replace(/\D/g, "").length !== 11) {
        fieldError(tel, "Введите номер полностью");
        first = first || tel;
        ok = false;
      }
      if (consent && !consent.checked) {
        fieldError(consent, "Нужно согласие на обработку данных");
        first = first || consent;
        ok = false;
      }

      if (!ok) {
        if (status) {
          status.textContent = "Проверьте отмеченные поля.";
          status.className = "booking__status is-error";
        }
        if (first) first.focus();
        return;
      }

      /* No backend in this build — the form reports success and resets so the
         flow can be demonstrated end to end. Wire to the CRM endpoint here. */
      if (status) {
        status.textContent =
          "Заявка принята. Администратор перезвонит в течение 15 минут.";
        status.className = "booking__status is-success";
      }
      form.reset();
    });
  })();

  /* --- Footer year ------------------------------------------------------- */

  (function year() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = String(new Date().getFullYear());
  })();
})();
