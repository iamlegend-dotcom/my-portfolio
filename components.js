/**
 * Glory Ebuka Ogbonna — Portfolio
 * components.js: Single Source of Truth for Shared UI Components
 * Works cleanly from local file system (file:///) without fetch()
 */

(function () {
  'use strict';

  // Detect current active page filename
  function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return filename.toLowerCase();
  }

  // Generate Navigation Bar HTML
  function getNavbarHTML() {
    const currentPage = getCurrentPage();

    const navItems = [
      { 
        name: 'Home', 
        href: 'index.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>`
      },
      { 
        name: 'About', 
        href: 'about.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`
      },
      { 
        name: 'Projects', 
        href: 'projects.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`
      },
      { 
        name: 'Services', 
        href: 'services.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
      },
      { 
        name: 'Inspiration', 
        href: 'inspiration.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`
      },
      { 
        name: 'Contact', 
        href: 'contact.html',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
      }
    ];

    const linksHTML = navItems
      .map((item) => {
        let isActive = false;
        if (currentPage === item.href) {
          isActive = true;
        } else if (
          (currentPage === '' || currentPage === 'index.html') &&
          item.href === 'index.html'
        ) {
          isActive = true;
        } else if (
          currentPage === 'project-detail.html' &&
          item.href === 'projects.html'
        ) {
          isActive = true;
        }

        return `
          <li class="nav-item">
            <a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}" ${
          isActive ? 'aria-current="page"' : ''
        } title="${item.name}">
              <span class="nav-icon" aria-hidden="true">${item.icon}</span>
              <span class="nav-text">${item.name}</span>
            </a>
          </li>
        `;
      })
      .join('');

    return `
      <!-- Top Scroll / Reading Progress Indicator -->
      <div class="nav-progress" id="nav-progress" aria-hidden="true"></div>

      <header class="site-header" id="header">
        <div class="container nav-inner">
          <a href="index.html" class="brand magnetic" aria-label="Ogbonna Glory Chukwuebuka Homepage">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-text">
              <span class="brand-name">Ogbonna Glory<span class="brand-surname"> Chukwuebuka</span></span>
              <span class="brand-subtitle">Full-Stack &amp; UI Developer</span>
            </span>
          </a>

          <nav class="nav-menu" id="nav-menu" aria-label="Primary navigation">
            <ul class="nav-list">
              ${linksHTML}
            </ul>
            <div class="mobile-menu-actions">
              <a href="contact.html" class="btn btn-ice-sm btn-block">Let's Talk</a>
            </div>
          </nav>

          <div class="nav-actions">
            <a href="contact.html" class="btn btn-ice-sm nav-cta magnetic">
              <span>Let's Talk</span>
            </a>

            <!-- Mobile Hamburger Toggle -->
            <button id="hamburger-btn" class="icon-btn hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu" type="button">
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
            </button>
          </div>
        </div>
      </header>
    `;
  }

  // Generate Footer HTML
  function getFooterHTML() {
    const currentYear = new Date().getFullYear();

    return `
      <footer class="site-footer">
        <div class="container footer-inner">
          <div class="footer-top">
            <div class="footer-brand">
              <a href="index.html" class="brand">
                <span class="brand-mark" aria-hidden="true"></span>
                <span class="brand-text">
                  <span class="brand-name">Ogbonna Glory Chukwuebuka</span>
                  <span class="brand-subtitle">Full-Stack &amp; UI Developer</span>
                </span>
              </a>
              <p class="footer-tagline">
                Building fast, accessible web applications with Python, Django, HTML, CSS, and JavaScript. Based in Abia State, Nigeria.
              </p>
              <div class="footer-status-pill">
                <span class="pulse-indicator"></span>
                <span>Available for engineering roles &amp; select projects</span>
              </div>
            </div>

            <div class="footer-nav-columns">
              <div class="footer-col">
                <span class="footer-col-title">Navigation</span>
                <ul class="footer-links">
                  <li><a href="index.html">Home</a></li>
                  <li><a href="about.html">About & Career</a></li>
                  <li><a href="projects.html">Featured Projects</a></li>
                  <li><a href="services.html">Services & Capabilities</a></li>
                  <li><a href="inspiration.html">Inspiration & Vault</a></li>
                  <li><a href="contact.html">Get in Touch</a></li>
                </ul>
              </div>

              <div class="footer-col">
                <span class="footer-col-title">Connect</span>
                <ul class="footer-links">
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub ↗</a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X ↗</a></li>
                  <li><a href="mailto:celestinebukason5@gmail.com">Email ↗</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-meta-info">
              <p>&copy; <span id="current-year">${currentYear}</span> Ogbonna Glory Chukwuebuka. All rights reserved.</p>
              <div class="footer-live-clock" title="Current Local Time in Nigeria (WAT / UTC+1)">
                <span class="clock-dot"></span>
                <span>Abia State, NG: <strong id="live-time-display">--:--:-- WAT</strong></span>
              </div>
            </div>
            
            <div class="footer-bottom-actions">
              <button type="button" class="btn btn-ghost-sm copy-email-btn" id="copy-email-btn" title="Copy celestinebukason5@gmail.com to clipboard">
                <span>Copy Email</span>
              </button>
              <a href="#" class="back-top-link" id="back-to-top-btn">
                <span>Back to Top</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // Inject Custom Cursor Markup
  function injectCustomCursor() {
    if (!document.getElementById('custom-cursor')) {
      const cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.id = 'custom-cursor';
      cursor.setAttribute('aria-hidden', 'true');

      const follower = document.createElement('div');
      follower.className = 'cursor-follower';
      follower.id = 'cursor-follower';
      follower.setAttribute('aria-hidden', 'true');

      document.body.appendChild(cursor);
      document.body.appendChild(follower);
    }
  }

  // Inject Page Transition Overlay
  function injectTransitionOverlay() {
    if (!document.getElementById('page-transition-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'page-transition-overlay';
      overlay.id = 'page-transition-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.prepend(overlay);
    }
  }

  // Inject Global Fixed Alternate-Reverse Ambient Code Backdrop
  function injectAmbientCodeBackdrop() {
    if (!document.getElementById('ambient-code-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.className = 'ambient-code-backdrop';
      backdrop.id = 'ambient-code-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');

      const gap = '<span class="ambient-spacer" aria-hidden="true"></span>';

      backdrop.innerHTML = `
        <div class="ambient-code-track track-forward" data-direction="1">
          <div class="ambient-code-stream">
            <span>class DeveloperProfile:</span>${gap}<span>stack = ["Python", "Django"]</span>${gap}<span class="code-accent">DeveloperProfile.build()</span>${gap}<span>origin = "Abia State"</span>${gap}<span>class DeveloperProfile:</span>${gap}<span>stack = ["Python", "Django"]</span>
          </div>
        </div>
        <div class="ambient-code-track track-reverse" data-direction="-1">
          <div class="ambient-code-stream">
            <span>const ui = "structured";</span>${gap}<span class="code-accent" id="ambient-reverse-typed">Django.WSGI.serve()</span>${gap}<span>[HTML · CSS · JS]</span>${gap}<span>const ui = "structured";</span>${gap}<span>[HTML · CSS · JS]</span>
          </div>
        </div>
      `;

      document.body.prepend(backdrop);
    }
  }

  // Execute Component Mount on DOMContentLoaded
  function mountComponents() {
    // Mount Navbar
    const headerRoot = document.getElementById('site-header-root');
    if (headerRoot) {
      headerRoot.innerHTML = getNavbarHTML();
    }

    // Mount Footer
    const footerRoot = document.getElementById('site-footer-root');
    if (footerRoot) {
      footerRoot.innerHTML = getFooterHTML();
    }

    // Mount UI overlays & global ambient backdrop
    injectAmbientCodeBackdrop();
    injectCustomCursor();
    injectTransitionOverlay();

    // Trigger custom event so script.js knows components are mounted
    document.dispatchEvent(new CustomEvent('componentsMounted'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountComponents);
  } else {
    mountComponents();
  }
})();
