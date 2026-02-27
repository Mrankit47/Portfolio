document.addEventListener("DOMContentLoaded", function () {
  // ===== LOADER =====
  const loader = document.getElementById("loader");
  window.addEventListener("load", () => {
    // Reduced loader timeout for snappier experience
    setTimeout(() => loader.classList.add("hide"), 800);
  });

  // ===== CUSTOM CURSOR =====
  const cursor = document.getElementById("cursor");
  const cursorBlur = document.getElementById("cursor-blur");
  let mx = 0,
    my = 0,
    bx = 0,
    by = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });
  (function animBlur() {
    bx += (mx - bx) * 0.1;
    by += (my - by) * 0.1;
    cursorBlur.style.left = bx + "px";
    cursorBlur.style.top = by + "px";
    requestAnimationFrame(animBlur);
  })();
  document.querySelectorAll("a,button,.service-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2)";
      cursor.style.opacity = "0.5";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursor.style.opacity = "1";
    });
  });

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById("navbar");
  const backTop = document.getElementById("back-to-top");
  // ===== SCROLL PROGRESS BAR =====
  const progressBar = document.getElementById("scroll-progress");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    backTop.classList.toggle("show", window.scrollY > 300);
    updateActiveNav();
    revealElements();

    // scroll progress
    const scrolled =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;
    if (progressBar) progressBar.style.width = scrolled + "%";
  });
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  // ===== HAMBURGER =====
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((el) => {
      el.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // ===== ACTIVE NAV =====
  function updateActiveNav() {
    document.querySelectorAll("section[id]").forEach((sec) => {
      const top = sec.offsetTop - 140;
      const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
      if (
        link &&
        window.scrollY >= top &&
        window.scrollY < top + sec.offsetHeight
      ) {
        document
          .querySelectorAll(".nav-link")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }

  // ===== TYPEWRITER =====
  const words = [
    "Web Developer",
    "UI/UX Designer",
    "Frontend Dev",
    "Creative Coder",
  ];
  const typeEl = document.getElementById("typewriter");
  let wi = 0,
    ci = 0,
    deleting = false;
  function type() {
    const word = words[wi];
    typeEl.textContent = word.slice(0, ci);
    if (!deleting) {
      if (ci < word.length) {
        ci++;
        setTimeout(type, 100);
      } else {
        deleting = true;
        setTimeout(type, 2000);
      }
    } else {
      if (ci > 0) {
        ci--;
        setTimeout(type, 60);
      } else {
        deleting = false;
        wi = (wi + 1) % words.length;
        setTimeout(type, 400);
      }
    }
  }
  typeEl && setTimeout(type, 1800);

  // ===== ENHANCED REVEAL ON SCROLL =====
  function revealElements() {
    // Select all elements that have a class starting with "reveal"
    const revealers = document.querySelectorAll(
      '[class^="reveal"]:not(.active), [class*=" reveal"]:not(.active)',
    );

    revealers.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const triggerPoint = window.innerHeight - 80;

      if (rect.top < triggerPoint) {
        el.classList.add("active");

        // Stagger children if it's a grid/container
        if (el.classList.contains("stagger-children")) {
          const children = el.children;
          Array.from(children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.15}s`;
            child.classList.add("active"); // In case children also have reveal classes
          });
        }
      }
    });
  }
  // Initialize on load with a slight delay
  setTimeout(revealElements, 400);

  // Scroll-driven continuous 3D tilt on sections
  window.addEventListener("scroll", () => {
    document.querySelectorAll(".section").forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight; // 0 → 1
      const clamp = Math.min(Math.max(progress, 0), 1);
      const rotX = (1 - clamp) * 8; // 8deg → 0deg as section scrolls in
      const scaleV = 0.96 + clamp * 0.04;
      sec.style.transform = `perspective(1200px) rotateX(${rotX}deg) scale(${scaleV})`;
      sec.style.transformOrigin = "top center";
    });
  });

  // ===== BLOB PARALLAX =====
  document.addEventListener("mousemove", (e) => {
    // Only run if not on touch
    if (window.matchMedia("(pointer: fine)").matches) {
      const mx = (e.clientX / innerWidth - 0.5) * 20;
      const my = (e.clientY / innerHeight - 0.5) * 20;
      document.querySelectorAll(".blob").forEach((b, i) => {
        b.style.transform = `translate(${mx * (i + 1) * 0.5}px,${my * (i + 1) * 0.5}px)`;
      });
    }
  });

  // ===== TILT ON CARDS =====
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = "transform .1s";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform .5s";
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (t) {
        e.preventDefault();
        window.scrollTo({ top: t.offsetTop - 80, behavior: "smooth" });
      }
    });
  });

  // ===== CONTACT FORM — STANDARD SUBMIT =====
  // No AJAX here to prevent verification errors and allow standard Formspree flow
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function () {
      const submitBtn = document.getElementById("submit-btn");
      const btnText = document.getElementById("btn-text");
      const btnIcon = document.getElementById("btn-icon");
      const btnLoader = document.getElementById("btn-loader");

      // Show loader briefly
      btnText.textContent = "Sending...";
      btnIcon.style.display = "none";
      btnLoader.style.display = "inline-block";
    });
  }
});
