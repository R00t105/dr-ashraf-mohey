document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // PREMIUM LOADER ANIMATION
  // ============================================
  const loader = document.getElementById("loader");

  // Simulate loading time with premium animation
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");

      // Trigger entrance animations
      triggerEntranceAnimations();
    }, 600);
  }, 2500);

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    },
    { passive: true },
  );

  // ============================================
  // 3D TILT EFFECT FOR CARDS
  // ============================================
  const cards = document.querySelectorAll(
    ".about-card, .service-card, .testimonial-card, .branch-card, .contact-card",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navOverlay = document.querySelector(".nav-overlay");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      navOverlay.classList.toggle("active");

      // Prevent body scroll when menu is open
      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // SCROLL ANIMATIONS - INTERSECTION OBSERVER
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document
    .querySelectorAll(
      "section, .about-card, .service-card, .testimonial-card, .branch-card, .contact-card, .stat-item",
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      observer.observe(el);
    });

  // ============================================
  // COUNTER ANIMATION FOR STATISTICS
  // ============================================
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  };

  // Observe statistics section
  const statsSection = document.getElementById("statistics");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".stat-number").forEach((stat) => {
              animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    statsObserver.observe(statsSection);
  }

  // ============================================
  // SCROLL TO TOP BUTTON - ROCKET ANIMATION
  // ============================================
  const scrollToTopBtn = document.getElementById("scrollToTop");

  if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;
      const distanceFromBottom = documentHeight - scrollBottom;

      if (distanceFromBottom < 500 && scrollTop > windowHeight) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Custom smooth scroll function with easing
    const smoothScrollToTop = () => {
      const startPosition = window.pageYOffset;
      const startTime = performance.now();
      const duration = 1500;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        window.scrollTo(0, startPosition * (1 - ease));

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    // Scroll to top on click with rocket animation
    scrollToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Add launching animation
      scrollToTopBtn.classList.add("launching");
      scrollToTopBtn.classList.remove("visible");

      // Start smooth scroll
      smoothScrollToTop();

      // Remove launching class after animation completes
      setTimeout(() => {
        scrollToTopBtn.classList.remove("launching");
      }, 1200);
    });
  }

  // ============================================
  // PARALLAX EFFECT FOR HERO SECTION
  // ============================================
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && !window.matchMedia("(pointer: coarse)").matches) {
    window.addEventListener(
      "mousemove",
      (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;

        heroVisual.style.transform = `translate(${xPos}px, ${yPos}px)`;
      },
      { passive: true },
    );
  }

  // ============================================
  // TEXT REVEAL ANIMATION FOR HERO TITLE
  // ============================================
  function triggerEntranceAnimations() {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
      const words = heroTitle.querySelectorAll(".word");
      words.forEach((word, index) => {
        word.style.opacity = "0";
        word.style.transform = "translateY(50px)";
        word.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;

        setTimeout(
          () => {
            word.style.opacity = "1";
            word.style.transform = "translateY(0)";
          },
          500 + index * 200,
        );
      });
    }

    // Animate hero content
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      const elements = heroContent.querySelectorAll(
        ".subtitle, .hero-desc, .cta-group",
      );
      elements.forEach((el, index) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = `opacity 0.8s ease ${0.8 + index * 0.15}s, transform 0.8s ease ${0.8 + index * 0.15}s`;

        setTimeout(
          () => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          },
          800 + index * 150,
        );
      });
    }
  }

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================
  const magneticButtons = document.querySelectorAll(
    ".btn-primary, .btn-secondary",
  );

  if (!window.matchMedia("(pointer: coarse)").matches) {
    magneticButtons.forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0, 0) scale(1)";
      });
    });
  }

  // ============================================
  // SOCIAL BUTTONS HOVER EFFECT
  // ============================================
  const socialBtns = document.querySelectorAll(".social-btn");

  socialBtns.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.zIndex = "10";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.zIndex = "";
    });
  });

  // ============================================
  // PRELOADER FOR IMAGES
  // ============================================
  const images = document.querySelectorAll("img");
  let loadedImages = 0;

  images.forEach((img) => {
    if (img.complete) {
      loadedImages++;
    } else {
      img.addEventListener("load", () => {
        loadedImages++;
      });
    }
  });

  // ============================================
  // FORM VALIDATION (if forms exist)
  // ============================================
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const phone = contactForm.querySelector('input[type="tel"]').value;

      if (name && phone) {
        // Show success message
        showNotification(
          "شكراً لك! تم إرسال طلب الحجز بنجاح. سنتواصل معك قريباً.",
          "success",
        );
        contactForm.reset();
      } else {
        showNotification("يرجى ملء جميع الحقول المطلوبة.", "error");
      }
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: ${type === "success" ? "var(--primary)" : "#ef4444"};
      color: white;
      padding: 1rem 2rem;
      border-radius: var(--radius-lg);
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 9999;
      opacity: 0;
      transition: all 0.4s ease;
      font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(-50%) translateY(0)";
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(-50%) translateY(-20px)";
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 3000);
  }

  // ============================================
  // KEYBOARD NAVIGATION SUPPORT
  // ============================================
  document.addEventListener("keydown", (e) => {
    // ESC to close mobile menu
    if (e.key === "Escape") {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      navOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // ============================================
  // REDUCED MOTION SUPPORT
  // ============================================
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    // Disable complex animations
    document
      .querySelectorAll(".hero-ring, .loader-ring, .scanner")
      .forEach((el) => {
        el.style.animation = "none";
      });
  }

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================
  // Use requestAnimationFrame for smooth animations
  let ticking = false;

  function updateAnimations() {
    // Update any continuous animations here
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
      }
    },
    { passive: true },
  );

  console.log("🚀 Premium Medical Website Loaded Successfully!");
});
