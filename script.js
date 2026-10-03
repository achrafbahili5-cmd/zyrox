/* ============================================================
   ZYROX — portfolio scripts
   Sticky navbar · mobile menu · scroll reveal · active links
   ============================================================ */
(function () {
  "use strict";

  var body = document.body;
  var navbar = document.getElementById("navbar");
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navLinks");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Sticky navbar state ---------- */
  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  function isMobile() {
    return window.matchMedia("(max-width: 900px)").matches;
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Close after choosing an anchor
  menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", function (e) {
    if (body.classList.contains("nav-open") && !navbar.contains(e.target)) {
      setMenu(false);
    }
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) setMenu(false);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  // Stagger children of .stagger groups
  document.querySelectorAll(".stagger").forEach(function (group) {
    var i = 0;
    group.querySelectorAll(".reveal").forEach(function (el) {
      el.style.setProperty("--reveal-delay", Math.min(i * 90, 540) + "ms");
      i += 1;
    });
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    // Safety net: reveal anything still hidden after load (e.g. very tall items)
    window.addEventListener("load", function () {
      window.setTimeout(function () {
        revealEls.forEach(function (el) {
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("visible");
          }
        });
      }, 400);
    });
  }

  /* ---------- Active nav link ---------- */
  var navAnchors = Array.prototype.slice.call(
    menu.querySelectorAll('a[href^="#"]')
  );
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));

  function setActive(id) {
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
