document.addEventListener("DOMContentLoaded", () => {
  // Loader
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
      document.body.classList.remove("loading");
    }, 500);
  }, 2000);

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Tilt Effect for Cards
  const cards = document.querySelectorAll(".about-card, .service-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

  // Mobile Menu Toggle
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

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  document.querySelectorAll("section, .about-card, .service-card").forEach((el) => {
    observer.observe(el);
  });

  // Counter Animation for Statistics
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2000;
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
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }

  // Form Submission
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Simple form validation and submission
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const phone = contactForm.querySelector('input[type="tel"]').value;
      const service = contactForm.querySelector('select').value;

      if (name && phone && service) {
        // Here you would normally send the data to a server
        alert("شكراً لك! تم إرسال طلب الحجز بنجاح. سنتواصل معك قريباً.");
        contactForm.reset();
      } else {
        alert("يرجى ملء جميع الحقول المطلوبة.");
      }
    });
  }

  // Parallax Effect for Hero Section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector(".hero-visual");
    if (heroVisual && scrolled < window.innerHeight) {
      heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  });

  // Scroll to Top Button
  const scrollToTopBtn = document.getElementById("scrollToTop");
  
  if (scrollToTopBtn) {
    // Show/hide button based on scroll position (near footer)
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollBottom = scrollTop + windowHeight;
      
      // Show button when near footer (within 500px from bottom)
      const distanceFromBottom = documentHeight - scrollBottom;
      
      if (distanceFromBottom < 500 && scrollTop > windowHeight) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
      
      // Hide button if scrolled back up a bit from footer
      if (distanceFromBottom > 600) {
        scrollToTopBtn.classList.remove("visible");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    // Custom smooth scroll function with easing
    const smoothScrollToTop = () => {
      const startPosition = window.pageYOffset;
      const startTime = performance.now();
      const duration = 1500; // 1.5 seconds for ultra smooth scroll
      
      // Easing function - cubic bezier for smooth acceleration and deceleration
      const easeInOutCubic = (t) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
      
      // Start ultra smooth scroll immediately
      smoothScrollToTop();
      
      // Remove launching class after animation completes
      setTimeout(() => {
        scrollToTopBtn.classList.remove("launching");
      }, 1200);
    });
  }

  // Observe testimonial cards for animation
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card) => {
    observer.observe(card);
  });
});
