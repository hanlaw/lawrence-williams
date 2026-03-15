/* ============================================================
   Williams Lawrence — Website JavaScript
   ============================================================ */

/**
 * Smooth active state on nav links as the user scrolls
 * through sections.
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Fade-in animation for cards and timeline items
 * as they enter the viewport.
 */
function initFadeIn() {
  const targets = document.querySelectorAll(
    '.portfolio-card, .tl-item, .award-item, .download-card, .contact-link'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el, index) => {
    // Stagger delay per element
    el.style.transitionDelay = `${index * 40}ms`;
    observer.observe(el);
  });
}

/**
 * Adds a subtle "scroll progress" accent line at the top
 * of the page (thin accent-colored bar).
 */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: #2ec4b6;
    z-index: 999;
    transition: width 0.1s linear;
    pointer-events: none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
}

/**
 * Smooth scroll for all internal anchor links
 * (CSS scroll-behavior handles most, but this adds
 * an offset for the fixed nav bar).
 */
function initSmoothScroll() {
  const NAV_HEIGHT = 72; // px — adjust if nav height changes

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Initialise everything when DOM is ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollSpy();
  initFadeIn();
  initScrollProgress();
  initSmoothScroll();
});
