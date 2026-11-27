/**
 * GLORY EBUKA OGBONNA — PORTFOLIO CORE SCRIPTS
 * Vanilla JavaScript (No Frameworks or Dependencies)
 * Handles Theming, Micro-Interactions, Page Transitions, Spotlights,
 * Counters, Filtering, Accordions, and Accessible Form Validation.
 */

let liveClockIntervalId = null;
let inspirationDocClickBound = false;

function initDynamicComponents() {
  initScrollProgress();
  initSmartHeader();
  initNavControls();
  initCustomCursor();
  initPageTransitions();
  initLiveClock();
  initCopyEmail();
  initBackToTop();
  initAmbientCodeBackdrop();
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Re-bind idempotent component-dependent handlers when components.js mounts
document.addEventListener('componentsMounted', () => {
  initDynamicComponents();
});

function initApp() {
  initDynamicComponents();
  initCardSpotlight();
  initMagneticElements();
  initScrollReveal();
  initAnimatedCounters();
  initProjectFiltering();
  initFaqAccordion();
  initContactForm();
  initInspirationTree();
  initHeroTyping();
  initProjectDetail();
}

/* ==========================================================================
   1. Custom Cursor with Follower
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('cursor-follower');

  if (!cursor || !follower || cursor.dataset.bound) return;

  // Check if pointer is fine (desktop/mouse)
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  cursor.dataset.bound = 'true';
  document.body.classList.add('has-custom-cursor');

  let mouseX = -100;
  let mouseY = -100;
  let followerX = -100;
  let followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  }, { passive: true });

  // Smooth lerp follower loop
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(animateFollower);
  }
  requestAnimationFrame(animateFollower);

  // Hover state detection
  const interactiveSelectors = 'a, button, input, textarea, select, .filter-btn, .accordion-trigger, [role="button"], .spotlight-card';
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    if (el.dataset.cursorBound) return;
    el.dataset.cursorBound = 'true';
    el.addEventListener('mouseenter', () => follower.classList.add('hovered'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hovered'));
  });
}

/* ==========================================================================
   3. Smart Header & Sidebar Dock Transition on Scroll
   ========================================================================== */
function initSmartHeader() {
  const header = document.getElementById('header');
  if (!header || header.dataset.bound) return;
  header.dataset.bound = 'true';

  function handleScroll() {
    const scrollY = window.scrollY;

    // Transition into docked sidebar mode when scrolled down past 90px
    if (scrollY > 90) {
      header.classList.add('docked-sidebar');
      header.classList.add('scrolled');
    } else {
      header.classList.remove('docked-sidebar');
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initScrollProgress() {
  const bar = document.getElementById('nav-progress');
  if (!bar || bar.dataset.bound) return;
  bar.dataset.bound = 'true';

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

function initNavControls() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu && !hamburgerBtn.dataset.bound) {
    hamburgerBtn.dataset.bound = 'true';

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => closeMenu());
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
        hamburgerBtn.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 992 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    }, { passive: true });
  }

  function openMenu() {
    navMenu.classList.add('open');
    hamburgerBtn.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }
}

/* ==========================================================================
   4. Card Spotlight & Magnetic Interactions
   ========================================================================== */
function initCardSpotlight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach((card) => {
    if (card.dataset.spotlightBound) return;
    card.dataset.spotlightBound = 'true';
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initMagneticElements() {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  const magneticItems = document.querySelectorAll('.magnetic');
  magneticItems.forEach((item) => {
    if (item.dataset.magneticBound) return;
    item.dataset.magneticBound = 'true';
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   5. Scroll-Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   6. Animated Number Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter-target'), 10) || 0;
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1600;
        const start = 0;
        const startTime = performance.now();

        function step(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.floor(start + (target - start) * easeOut);
          el.textContent = currentVal + suffix;

          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target + suffix;
          }
        }

        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
}

/* ==========================================================================
   7. Filterable Projects (projects.html)
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.catalog-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach((btn) => {
    if (btn.dataset.filterBound) return;
    btn.dataset.filterBound = 'true';
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      // Set active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter cards
      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.classList.remove('hidden-item');
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.classList.add('hidden-item');
        }
      });
    });
  });
}

/* ==========================================================================
   8. FAQ Accordion (services.html)
   ========================================================================== */
function initFaqAccordion() {
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');
  if (!accordionTriggers.length) return;

  accordionTriggers.forEach((trigger) => {
    if (trigger.dataset.accordionBound) return;
    trigger.dataset.accordionBound = 'true';
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const contentId = trigger.getAttribute('aria-controls');
      const content = document.getElementById(contentId);

      // Close all other accordions for sleek single-open behavior
      accordionTriggers.forEach((otherTrigger) => {
        if (otherTrigger !== trigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
          const otherContent = document.getElementById(otherTrigger.getAttribute('aria-controls'));
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        if (content) content.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.style.maxHeight = `${content.scrollHeight + 30}px`;
      }
    });
  });
}

/* ==========================================================================
   9. Accessible Contact Form Validation (contact.html)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || form.dataset.bound) return;
  form.dataset.bound = 'true';

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nameInput) nameInput.addEventListener('input', () => validateName(false));
  if (emailInput) emailInput.addEventListener('input', () => validateEmail(false));
  if (messageInput) messageInput.addEventListener('input', () => validateMessage(false));

  function validateName(showErrorOnEmpty = true) {
    const val = nameInput.value.trim();
    if (!val) {
      if (showErrorOnEmpty) showError(nameInput, nameError, 'Please provide your full name.');
      return false;
    }
    if (val.length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters long.');
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail(showErrorOnEmpty = true) {
    const val = emailInput.value.trim();
    if (!val) {
      if (showErrorOnEmpty) showError(emailInput, emailError, 'Email address is required.');
      return false;
    }
    if (!emailRegex.test(val)) {
      showError(emailInput, emailError, 'Please enter a valid email address (e.g. name@domain.com).');
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validateMessage(showErrorOnEmpty = true) {
    const val = messageInput.value.trim();
    if (!val) {
      if (showErrorOnEmpty) showError(messageInput, messageError, 'Please write a message.');
      return false;
    }
    if (val.length < 10) {
      showError(messageInput, messageError, 'Message should be at least 10 characters.');
      return false;
    }
    clearError(messageInput, messageError);
    return true;
  }

  function showError(input, errorEl, msg) {
    input.classList.add('input-error');
    if (errorEl) errorEl.textContent = msg;
  }

  function clearError(input, errorEl) {
    input.classList.remove('input-error');
    if (errorEl) errorEl.textContent = '';
  }

  let formattedInquiry = '';
  const alertTitle = document.getElementById('form-alert-title');
  const alertMsg = document.getElementById('form-alert-msg');
  const mailtoBtn = document.getElementById('mailto-inquiry-btn');
  const whatsappInquiryBtn = document.getElementById('whatsapp-inquiry-btn');
  const whatsappSubmitBtn = document.getElementById('whatsapp-submit-btn');
  const copyInquiryBtn = document.getElementById('copy-inquiry-btn');
  const WHATSAPP_BASE_URL = 'https://wa.me/2349051106189';

  function buildValidatedInquiry() {
    const isNameOk = validateName(true);
    const isEmailOk = validateEmail(true);
    const isMessageOk = validateMessage(true);

    if (!isNameOk || !isEmailOk || !isMessageOk) {
      if (alertBox) alertBox.classList.add('hidden');
      if (!isNameOk) nameInput.focus();
      else if (!isEmailOk) emailInput.focus();
      else messageInput.focus();
      return null;
    }

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const senderMessage = messageInput.value.trim();

    formattedInquiry = [
      `Name: ${senderName}`,
      `Email: ${senderEmail}`,
      `Message:\n${senderMessage}`
    ].join('\n');

    const subject = `Portfolio Inquiry from ${senderName}`;
    const mailtoUrl = `mailto:celestinebukason5@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedInquiry)}`;
    const whatsappText = `Hello Ogbonna Glory Chukwuebuka, here is my inquiry from your portfolio:\n\n${formattedInquiry}`;
    const whatsappUrl = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(whatsappText)}`;

    if (mailtoBtn) mailtoBtn.setAttribute('href', mailtoUrl);
    if (whatsappInquiryBtn) whatsappInquiryBtn.setAttribute('href', whatsappUrl);

    return { mailtoUrl, whatsappUrl };
  }

  if (copyInquiryBtn && !copyInquiryBtn.dataset.bound) {
    copyInquiryBtn.dataset.bound = 'true';
    copyInquiryBtn.addEventListener('click', () => {
      if (!formattedInquiry) return;
      const origText = copyInquiryBtn.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(formattedInquiry).then(() => {
          copyInquiryBtn.textContent = 'Copied to Clipboard ✓';
          setTimeout(() => {
            copyInquiryBtn.textContent = origText;
          }, 2200);
        }).catch(() => fallbackCopyInquiry(origText));
      } else {
        fallbackCopyInquiry(origText);
      }
    });
  }

  function fallbackCopyInquiry(origText) {
    const temp = document.createElement('textarea');
    temp.value = formattedInquiry;
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand('copy');
      if (copyInquiryBtn) {
        copyInquiryBtn.textContent = 'Copied to Clipboard ✓';
        setTimeout(() => {
          copyInquiryBtn.textContent = origText;
        }, 2200);
      }
    } catch (err) {}
    document.body.removeChild(temp);
  }

  if (whatsappInquiryBtn && !whatsappInquiryBtn.dataset.bound) {
    whatsappInquiryBtn.dataset.bound = 'true';
    whatsappInquiryBtn.addEventListener('click', (e) => {
      if (!buildValidatedInquiry()) {
        e.preventDefault();
        return;
      }
      if (alertTitle) alertTitle.textContent = 'WhatsApp Draft Opened';
      if (alertMsg) {
        alertMsg.textContent =
          'Your inquiry opened in WhatsApp (it was not sent as an email). You can still open your email app or copy the formatted message below.';
      }
    });
  }

  if (whatsappSubmitBtn && !whatsappSubmitBtn.dataset.bound) {
    whatsappSubmitBtn.dataset.bound = 'true';
    whatsappSubmitBtn.addEventListener('click', () => {
      const payload = buildValidatedInquiry();
      if (!payload) return;

      window.open(payload.whatsappUrl, '_blank', 'noopener,noreferrer');

      if (alertTitle) alertTitle.textContent = 'WhatsApp Draft Opened';
      if (alertMsg) {
        alertMsg.textContent =
          'Your validated inquiry opened in WhatsApp (not transmitted over email). You can also open your email app or copy your message below.';
      }
      if (alertBox) {
        alertBox.classList.remove('hidden');
        alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const payload = buildValidatedInquiry();
    if (!payload) return;

    if (alertTitle) alertTitle.textContent = 'Inquiry Ready';
    if (alertMsg) {
      alertMsg.textContent =
        'This static form validates your inquiry locally rather than sending automatically via a server. Open it in your email app, continue via WhatsApp, or copy it below.';
    }

    if (alertBox) {
      alertBox.classList.remove('hidden');
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ==========================================================================
   10. Page-to-Page Smooth Transitions
   ========================================================================== */
function initPageTransitions() {
  const overlay = document.getElementById('page-transition-overlay');
  if (!overlay) return;

  const links = document.querySelectorAll('a[href$=".html"]');
  links.forEach((link) => {
    if (link.dataset.transitionBound) return;
    link.dataset.transitionBound = 'true';
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Do not intercept external links, new tabs, or anchor jumps
      if (
        link.target === '_blank' ||
        e.ctrlKey ||
        e.metaKey ||
        href.startsWith('http') ||
        href.startsWith('#')
      ) {
        return;
      }

      e.preventDefault();
      overlay.classList.add('active');

      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });
}

/* ==========================================================================
   11. Back to Top Smooth Scroll
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn || btn.dataset.bound) return;
  btn.dataset.bound = 'true';
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   12. Live Local Time Clock (WAT / Africa:Lagos)
   ========================================================================== */
function initLiveClock() {
  const clockEl = document.getElementById('live-time-display');
  if (!clockEl || clockEl.dataset.bound) return;
  clockEl.dataset.bound = 'true';

  if (liveClockIntervalId) {
    clearInterval(liveClockIntervalId);
    liveClockIntervalId = null;
  }

  function tick() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = `${timeStr} WAT`;
    } catch (e) {
      const now = new Date();
      clockEl.textContent = `${now.toTimeString().split(' ')[0]} Local`;
    }
  }

  tick();
  liveClockIntervalId = setInterval(tick, 1000);
}

/* ==========================================================================
   13. Copy Email to Clipboard Shortcut
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn || copyBtn.dataset.bound) return;
  copyBtn.dataset.bound = 'true';

  const emailToCopy = 'celestinebukason5@gmail.com';

  copyBtn.addEventListener('click', () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(emailToCopy).then(() => {
        showCopiedState();
      }).catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
  });

  function showCopiedState() {
    const origHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = '<span>Copied! ✓</span>';
    copyBtn.style.borderColor = 'var(--accent)';
    copyBtn.style.color = 'var(--accent-text)';

    setTimeout(() => {
      copyBtn.innerHTML = origHTML;
      copyBtn.style.borderColor = '';
      copyBtn.style.color = '';
    }, 2400);
  }

  function fallbackCopy() {
    const tempInput = document.createElement('input');
    tempInput.value = emailToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showCopiedState();
    } catch (err) {}
    document.body.removeChild(tempInput);
  }
}

/* ==========================================================================
   14. Inspiration Tree Interactions (Mobile Tap Support)
   ========================================================================== */
function initInspirationTree() {
  const treeNodes = document.querySelectorAll('.tree-node');
  if (!treeNodes.length) return;

  treeNodes.forEach((node) => {
    if (node.dataset.treeBound) return;
    node.dataset.treeBound = 'true';
    node.addEventListener('click', () => {
      // Toggle focus/open state on mobile
      const isOpen = node.classList.contains('active-node');
      treeNodes.forEach((n) => n.classList.remove('active-node'));
      if (!isOpen) {
        node.classList.add('active-node');
      }
    });
  });

  if (!inspirationDocClickBound) {
    inspirationDocClickBound = true;
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.tree-node')) {
        document.querySelectorAll('.tree-node').forEach((n) => n.classList.remove('active-node'));
      }
    });
  }
}

/* ==========================================================================
   15. Hero Technical Visual Auto-Typing Animation
   ========================================================================== */
function initHeroTyping() {
  const codeEl = document.getElementById('hero-typed-code');
  if (!codeEl || codeEl.dataset.typed) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  codeEl.dataset.typed = 'true';

  const preEl = codeEl.closest('pre');
  if (preEl) {
    preEl.style.minHeight = `${preEl.offsetHeight}px`;
  }

  // Collect all text nodes while preserving syntax-highlighting span wrappers
  const walker = document.createTreeWalker(codeEl, NodeFilter.SHOW_TEXT, null);
  const textEntries = [];
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.length > 0) {
      textEntries.push({ node, fullText: node.nodeValue });
      node.nodeValue = '';
    }
  }

  if (!textEntries.length) return;

  codeEl.classList.add('typing-cursor');

  let entryIdx = 0;
  let charIdx = 0;

  function typeNext() {
    if (entryIdx >= textEntries.length) return;

    const current = textEntries[entryIdx];
    charIdx++;
    current.node.nodeValue = current.fullText.slice(0, charIdx);

    const typedChar = current.fullText[charIdx - 1];
    if (charIdx >= current.fullText.length) {
      entryIdx++;
      charIdx = 0;
    }

    const delay = typedChar === '\n' ? 45 : 16;
    if (entryIdx < textEntries.length) {
      setTimeout(typeNext, delay);
    }
  }

  setTimeout(typeNext, 250);
}

/* ==========================================================================
   16. Dynamic Project Case Study Loader (project-detail.html)
   ========================================================================== */
function initProjectDetail() {
  const root = document.getElementById('case-study-root');
  if (!root) return;

  const projectsData = {
    'bright-school': {
      title: 'Bright International Secondary School Website',
      metaName: 'Bright International Secondary School',
      eyebrow: '01 / Education · School Website',
      metaCategory: 'Education / Institutional',
      metaStack: 'HTML, CSS, JavaScript',
      metaStatus: 'Live on GitHub Pages',
      liveUrl: 'https://iamlegend-dotcom.github.io/bright-international-school/',
      overview:
        "An institutional website designed to present Bright International Secondary School's academic programs, admissions path, campus life, and student/staff portal access in a clear, structured layout.",
      visualLabel: '// BRIGHT INTERNATIONAL SECONDARY SCHOOL — HERO VIEW',
      visualBadge: 'Desktop Interface',
      image: 'assets/images/bright-international-school.jpg',
      imageAlt: 'Bright International Secondary School website hero and navigation interface',
      background: [
        'Secondary schools communicate with multiple distinct audiences—prospective parents reviewing admission criteria, current students looking for academic details, alumni, and staff members. Without a centralized, clear website, essential information such as enrollment steps and school sections becomes difficult to locate.',
        'This website was built to give Bright International Secondary School a clear digital entry point that establishes trust immediately and organizes academic, admission, and community sections into one coherent navigation bar.'
      ],
      design: [
        'The landing view uses full-bleed campus photography paired with a high-contrast dark scrim so the main welcome heading, school motto ("Building Future Leaders Through Quality Education & Character Development"), and primary actions remain legible on first load.',
        'Primary navigation organizes top-level school pathways—Home, About, Academics, Gallery, Alumni, Admission, Contact, and Login—alongside a dedicated "Enroll Now" call to action button in both the header and hero for direct prospective student inquiries.'
      ],
      tech: [
        { label: 'Markup', name: 'HTML5', desc: 'Semantic header, navigation, hero landmark, and accessible button and link structure.' },
        { label: 'Styling', name: 'CSS3', desc: 'Full-bleed background layering, contrast overlays, responsive typography, and action button styling.' },
        { label: 'Interactivity', name: 'JavaScript', desc: 'Client-side interactive UI behavior and navigation support across viewports.' }
      ],
      gallery: [
        {
          src: 'assets/images/bright-international-school.jpg',
          alt: 'Bright International Secondary School homepage hero and navigation bar',
          caption: 'Homepage hero view showing navigation links, campus photography backdrop, and enrollment calls to action.'
        }
      ],
      prev: { key: 'alpha-clinic', label: 'Alpha Clinic' },
      next: { key: 'vantrex', label: 'Vantrex Market' }
    },

    'vantrex': {
      title: 'Vantrex Investment Website (Vantrex Market)',
      metaName: 'Vantrex Market',
      eyebrow: '02 / Finance & Investment · Web Interface',
      metaCategory: 'Finance / Investment Platform',
      metaStack: 'HTML, CSS, JavaScript',
      metaStatus: 'Live on GitHub Pages',
      liveUrl: 'https://iamlegend-dotcom.github.io/Vantrex-market/',
      overview:
        'The Vantrex Market cryptocurrency investing interface built around transparent plan presentation, plain-language reporting, wallet connection actions, and a live-style market snapshot card.',
      visualLabel: '// VANTREX MARKET — HERO & MARKET SNAPSHOT',
      visualBadge: 'Desktop Interface',
      image: 'assets/images/vantrex-market.jpg',
      imageAlt: 'Vantrex Market crypto investment website hero and market snapshot card',
      background: [
        'Cryptocurrency and investment platforms frequently overwhelm visitors with dense jargon and hidden terms. Visitors evaluating an investment platform need upfront clarity on plans, risk transparency, and how assets are tracked.',
        'Vantrex Market addresses this need directly with plain-language positioning ("Crypto investing for people who read the fine print") paired with straightforward account actions and an immediate view of key digital assets.'
      ],
      design: [
        'The interface uses a dark navy canvas with high-contrast white headlines and a bright green accent highlighting the core promise. Top navigation separates informational routes (Plans, How It Works, Market, About, FAQ, Contact) from primary account triggers (Connect Wallet and Sign Up).',
        'On the right side of the hero, a structured Market Snapshot card displays Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Cardano (ADA) with mini trend sparklines, indicative prices, 24-hour percentage shifts, and a 30-day portfolio index summary.'
      ],
      tech: [
        { label: 'Markup', name: 'HTML5', desc: 'Structured semantic navigation, hero messaging, and financial data table/card rows.' },
        { label: 'Styling', name: 'CSS3', desc: 'Dark-mode layout hierarchy, dual-column hero alignment, button states, and card borders.' },
        { label: 'Interactivity', name: 'JavaScript', desc: 'Client-side interaction controls, snapshot presentation logic, and navigation behavior.' }
      ],
      gallery: [
        {
          src: 'assets/images/vantrex-market.jpg',
          alt: 'Vantrex Market interface showing hero messaging and Market snapshot card',
          caption: 'Vantrex Market landing screen featuring clear-pricing hero copy, Connect Wallet / Sign Up actions, and the BTC/ETH/SOL/ADA market snapshot panel.'
        }
      ],
      prev: { key: 'bright-school', label: 'Bright School' },
      next: { key: 'alpha-clinic', label: 'Alpha Clinic' }
    },

    'alpha-clinic': {
      title: 'Alpha Clinic Website',
      metaName: 'Alpha Clinic',
      eyebrow: '03 / Healthcare · Clinic Website',
      metaCategory: 'Healthcare / Cardiology Clinic',
      metaStack: 'Python, Django, HTML, CSS, JavaScript',
      metaStatus: 'Live on GitHub Pages',
      liveUrl: 'https://iamlegend-dotcom.github.io/alpha-clinic/',
      overview:
        'A healthcare and cardiology clinic website designed to present clinical services, appointment scheduling entry points, and patient portal access in a clear, trustworthy interface.',
      visualLabel: '// ALPHA CLINIC — HERO & DEPARTMENT PREVIEW',
      visualBadge: 'Desktop Interface',
      image: 'assets/images/alpha-clinic.jpg',
      imageAlt: 'Alpha Clinic website hero, Appointment CTA, Patient Portal, and Cardiology section',
      background: [
        'Patients seeking specialized care need to quickly understand what medical services a clinic provides, book appointments easily, and access patient resources without digging through cluttered pages.',
        'Alpha Clinic was built to deliver a calm, high-contrast web presence for clinical services, placing primary patient actions ("Appointment" and "Patient Portal") directly in the top navigation alongside department highlights.'
      ],
      design: [
        'The hero pairs a deep forest-green surface on the left ("Strong Hearts. Healthier Lives.") with clinical photography and a Cardiology highlight overlay card on the right, topped by a clean white navigation bar (Home, About, Service, Pages, Contact).',
        'Built with Python and Django on the server alongside semantic HTML, responsive CSS, and JavaScript on the frontend, keeping reusable templates cleanly separated from clinic content.'
      ],
      tech: [
        { label: 'Backend Language', name: 'Python', desc: 'Server-side application logic and request handling.' },
        { label: 'Web Framework', name: 'Django', desc: 'URL routing, views, template inheritance, and structured backend organization.' },
        { label: 'Markup & Styling', name: 'HTML5 & CSS3', desc: 'Semantic document structure, two-column hero layout, and responsive styling.' },
        { label: 'Interactivity', name: 'JavaScript', desc: 'Client-side UI controls, department slide navigation, and form handling.' }
      ],
      gallery: [
        {
          src: 'assets/images/alpha-clinic.jpg',
          alt: 'Alpha Clinic homepage hero showing top navigation bar, Appointment and Patient Portal actions, and Cardiology card',
          caption: 'Alpha Clinic landing interface with Appointment and Patient Portal calls to action, clinical hero messaging, and Cardiology department preview.'
        }
      ],
      prev: { key: 'vantrex', label: 'Vantrex Market' },
      next: { key: 'bright-school', label: 'Bright School' }
    }
  };

  const params = new URLSearchParams(window.location.search);
  const rawKey = params.get('project') || 'bright-school';
  const key = projectsData[rawKey] ? rawKey : 'bright-school';
  const data = projectsData[key];

  // Update page title & switcher active states
  document.title = `${data.metaName} — Case Study | Ogbonna Glory Chukwuebuka`;
  document.querySelectorAll('.case-switch-link').forEach((link) => {
    const isMatch = link.getAttribute('data-project-key') === key;
    link.classList.toggle('active', isMatch);
    if (isMatch) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  // Populate A. Introduction & Metadata
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('cs-category', data.eyebrow);
  setText('cs-title', data.title);
  setText('cs-overview', data.overview);
  setText('cs-meta-name', data.metaName);
  setText('cs-meta-category', data.metaCategory);
  setText('cs-meta-stack', data.metaStack);
  const statusEl = document.getElementById('cs-meta-status');
  if (statusEl) {
    if (data.liveUrl) {
      statusEl.innerHTML = `<a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" class="editorial-link">View Live Site &nearr;</a>`;
    } else {
      statusEl.textContent = data.metaStatus;
    }
  }
  const liveBtn = document.getElementById('cs-live-btn');
  if (liveBtn && data.liveUrl) {
    liveBtn.href = data.liveUrl;
  }
  setText('cs-visual-label', data.visualLabel);
  setText('cs-visual-badge', data.visualBadge);

  // Populate Primary Visual (Screenshot or Honest Pending State)
  const canvas = document.getElementById('cs-visual-canvas');
  if (canvas) {
    if (data.image) {
      canvas.innerHTML = `<img src="${data.image}" alt="${data.imageAlt}" class="case-study-screenshot" id="cs-hero-img" />`;
    } else {
      canvas.innerHTML = `
        <div class="case-pending-box">
          <span class="pending-tag">// VISUAL PREVIEW PENDING</span>
          <strong class="pending-title">${data.metaName} Screenshot Not Yet Supplied</strong>
          <p class="pending-note">No screenshot file was provided for ${data.metaName} yet. Once added to the assets directory, it will render here cleanly without cropping.</p>
        </div>
      `;
    }
  }

  // Populate B. Background & C. Design/Development
  const renderParagraphs = (id, paragraphs) => {
    const el = document.getElementById(id);
    if (el) {
      el.innerHTML = paragraphs.map((p) => `<p>${p}</p>`).join('');
    }
  };
  renderParagraphs('cs-background-copy', data.background);
  renderParagraphs('cs-design-copy', data.design);

  // Populate D. Technologies
  const techGrid = document.getElementById('cs-tech-grid');
  if (techGrid) {
    techGrid.innerHTML = data.tech
      .map(
        (t) => `
          <div class="case-tech-item glass-card">
            <span class="case-tech-label">${t.label}</span>
            <h3>${t.name}</h3>
            <p>${t.desc}</p>
          </div>
        `
      )
      .join('');
  }

  // Populate E. Project Gallery
  const gallerySection = document.getElementById('cs-gallery-section');
  const galleryGrid = document.getElementById('cs-gallery-grid');
  if (galleryGrid && gallerySection) {
    if (data.gallery.length > 0) {
      gallerySection.style.display = '';
      galleryGrid.innerHTML = data.gallery
        .map(
          (item) => `
            <figure class="gallery-figure glass-card">
              <img src="${item.src}" alt="${item.alt}" class="gallery-img" loading="lazy" />
              <figcaption class="gallery-caption">${item.caption}</figcaption>
            </figure>
          `
        )
        .join('');
    } else {
      galleryGrid.innerHTML = `
        <div class="case-pending-box glass-card" style="grid-column: 1 / -1;">
          <span class="pending-tag">// GALLERY SLOT READY</span>
          <strong class="pending-title">Additional Interface Screenshots Pending</strong>
          <p class="pending-note">This gallery layout is structured to display single or multi-screen project screenshots once supplied.</p>
        </div>
      `;
    }
  }

  // Populate F. Prev / Next Navigation
  const prevBtn = document.getElementById('cs-prev-btn');
  const nextBtn = document.getElementById('cs-next-btn');
  if (prevBtn) {
    prevBtn.href = `project-detail.html?project=${data.prev.key}`;
    prevBtn.innerHTML = `&larr; Previous: ${data.prev.label}`;
  }
  if (nextBtn) {
    nextBtn.href = `project-detail.html?project=${data.next.key}`;
    nextBtn.innerHTML = `<span>Next: ${data.next.label}</span><span aria-hidden="true">&rarr;</span>`;
  }
}

/* ==========================================================================
   17. Global Scroll-Linked Reverse-Parallax Ambient Code Backdrop
   ========================================================================== */
function initAmbientCodeBackdrop() {
  const backdrop = document.getElementById('ambient-code-backdrop');
  if (!backdrop || backdrop.dataset.bound) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  backdrop.dataset.bound = 'true';

  const tracks = Array.from(backdrop.querySelectorAll('.ambient-code-track'));
  const reverseTypedEl = document.getElementById('ambient-reverse-typed');

  // Alternate reverse-typing / forward-typing sequence for the highlighted token
  if (reverseTypedEl) {
    const snippets = [
      'Django.WSGI.serve()',
      'Ogbonna.Glory.build()',
      'Python.Engine.run()',
      'Layout.Grid.render()'
    ];
    let sIdx = 0;
    let cIdx = snippets[0].length;
    let deleting = true;

    function cycleAmbientType() {
      const word = snippets[sIdx];
      if (deleting) {
        cIdx--;
        reverseTypedEl.textContent = word.slice(0, Math.max(0, cIdx)) || ' ';
        if (cIdx <= 0) {
          deleting = false;
          sIdx = (sIdx + 1) % snippets.length;
          setTimeout(cycleAmbientType, 450);
          return;
        }
        setTimeout(cycleAmbientType, 55);
      } else {
        cIdx++;
        reverseTypedEl.textContent = word.slice(0, cIdx);
        if (cIdx >= word.length) {
          deleting = true;
          setTimeout(cycleAmbientType, 2200);
          return;
        }
        setTimeout(cycleAmbientType, 75);
      }
    }

    setTimeout(cycleAmbientType, 1800);
  }

  // Smooth 60fps lerp scroll-linked opposing parallax (zero modulo jump)
  let targetScroll = window.scrollY || 0;
  let currentScroll = targetScroll;
  let phase = 0;

  window.addEventListener(
    'scroll',
    () => {
      targetScroll = window.scrollY || 0;
    },
    { passive: true }
  );

  function animateTracks() {
    currentScroll += (targetScroll - currentScroll) * 0.08;
    phase += 0.004;

    tracks.forEach((track, idx) => {
      const dir = parseFloat(track.getAttribute('data-direction')) || 1;
      const speedFactor = idx === 1 ? 0.28 : 0.22;
      const ambientWave = Math.sin(phase + idx) * 28;
      const xOffset = (currentScroll * speedFactor + ambientWave) * dir;
      const yOffset = currentScroll * 0.025 * dir;

      track.style.transform = `translate3d(${-xOffset}px, ${yOffset}px, 0)`;
    });

    requestAnimationFrame(animateTracks);
  }

  requestAnimationFrame(animateTracks);
}
