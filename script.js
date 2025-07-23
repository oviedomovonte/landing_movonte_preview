// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar background on scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  // Add fade-in class to sections for scroll animations
  const sections = document.querySelectorAll(
    ".services, .about, .features, .cta"
  );
  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // Service cards animation
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add("fade-in");
    observer.observe(card);
  });

  // Feature items animation
  const featureItems = document.querySelectorAll(".feature-item");
  featureItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.15}s`;
    item.classList.add("fade-in");
    observer.observe(item);
  });

  // Counter animation for stats
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + "+";
    }, 20);
  };

  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector(".stat-number");
          const targetValue = parseInt(statNumber.textContent);
          animateCounter(statNumber, targetValue);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".stat").forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Parallax effect for hero background orbs
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    const orbs = document.querySelectorAll(".gradient-orb");
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.3;
      orb.style.transform = `translateY(${rate * speed}px)`;
    });
  });

  // Button hover effects
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .nav-cta"
  );
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Floating elements animation
  const floatingElements = document.querySelectorAll(".float-element");
  floatingElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.5}s`;
  });

  // Hero graphic hover effect
  const heroGraphic = document.querySelector(".hero-graphic");
  if (heroGraphic) {
    heroGraphic.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(2deg)";
    });

    heroGraphic.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  }

  // Service card tilt effect
  serviceCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // Typing effect for hero title (optional enhancement)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing effect after a delay
    setTimeout(typeWriter, 500);
  }

  // Add loading animation
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Smooth reveal for sections
  const revealSections = () => {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.pageYOffset;

      if (scrollY > sectionTop - windowHeight + sectionHeight / 4) {
        section.classList.add("revealed");
      }
    });
  };

  window.addEventListener("scroll", revealSections);
  revealSections(); // Initial check

  // Performance optimization: throttle scroll events
  let ticking = false;

  const updateOnScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Scroll-based animations here
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", updateOnScroll);
});

// Utility functions
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Resize handler
const handleResize = debounce(() => {
  // Handle responsive adjustments
  const heroContent = document.querySelector(".hero-content");
  if (window.innerWidth <= 768 && heroContent) {
    heroContent.style.gridTemplateColumns = "1fr";
  } else if (heroContent) {
    heroContent.style.gridTemplateColumns = "1fr 1fr";
  }
}, 250);

window.addEventListener("resize", handleResize);
