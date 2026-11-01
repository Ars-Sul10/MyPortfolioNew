/**
 * Global Navbar Component for Muhammad Arsyi Sulthoni's Portfolio
 * Automatically injects the unified, responsive top navbar across all pages.
 */
(function() {
  "use strict";

  function initNavbar() {
    // Target container
    let container = document.getElementById('navbar-placeholder');
    if (!container) {
      container = document.getElementById('site-header');
    }

    // Determine current page and active states
    const path = window.location.pathname.toLowerCase().replace(/\\/g, '/');
    const page = path.split('/').pop() || 'index.html';

    const isHome = page === '' || page === 'index.html';
    const isAbout = page === 'about.html';
    const isProject = page.includes('project') || page.includes('nextjs');

    // Build link destinations based on current location
    const prefix = isHome ? '' : 'index.html';
    const homeLink = isHome ? '#hero' : 'index.html';
    const projectsLink = `${prefix}#projects`;
    const experienceLink = `${prefix}#experience`;
    const skillsLink = `${prefix}#skills`;
    const aboutLink = 'about.html';
    const cvLink = 'https://drive.google.com/file/d/1YG0CBTh2mdHyaIRCbWvTXhzPyCuhYjBQ/view?usp=sharing';
    const readCvOnline = 'https://drive.google.com/file/d/1j3ZpN1cozGoVXOqOxxK4GUiekuj-Y75X/view?usp=sharing';

    const html = `
  <!-- ======= Collapsible Mobile Navbar ======= -->
  <div class="collapse custom-navmenu" id="main-navbar">
    <div class="container py-4">
      <div class="row align-items-center">
        <div class="col-md-4 mb-3 mb-md-0">
          <ul class="custom-menu">
            <li class="${isHome ? 'active' : ''}"><a href="${homeLink}"><i class="bi bi-house-door me-2"></i>Home</a></li>
            <li class="${isProject ? 'active' : ''}"><a href="${projectsLink}"><i class="bi bi-grid me-2"></i>Projects</a></li>
            <li><a href="${experienceLink}"><i class="bi bi-briefcase me-2"></i>Experience</a></li>
            <li><a href="${skillsLink}"><i class="bi bi-cpu me-2"></i>Skills</a></li>
            <li class="${isAbout ? 'active' : ''}"><a href="${aboutLink}"><i class="bi bi-person me-2"></i>About Me</a></li>
          </ul>
        </div>
        <div class="col-md-4 mb-3 mb-md-0">
          <h4 class="h6 text-muted text-uppercase fw-bold mb-2">Connect Directly</h4>
          <p class="mb-1"><i class="bi bi-linkedin text-primary me-2"></i><a href="https://www.linkedin.com/in/muhammad-arsyi-sulthoni-816a971b7/" target="_blank" rel="noopener">LinkedIn Profile</a></p>
          <p class="mb-0"><i class="bi bi-envelope text-primary me-2"></i><a href="mailto:sulthoniars@gmail.com">sulthoniars@gmail.com</a></p>
        </div>
        <div class="col-md-4 text-md-end">
          <a href="${readCvOnline}" target="_blank" rel="noopener" class="btn-primary-custom">
            <i class="bi bi-file-earmark-pdf"></i> Read My CV Online
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- ======= Header / Navbar ======= -->
  <nav class="custom-navbar" id="navbar">
    <div class="container d-flex align-items-center justify-content-between">
      
      <!-- Brand Logo & Name -->
      <a class="navbar-brand-wrap" href="${isHome ? '#hero' : 'index.html'}">
        <img src="assets/img/person_1.jpg" alt="Muhammad Arsyi Sulthoni" class="brand-avatar">
        <div class="brand-info">
          <span class="brand-name">Arsyi Sulthoni</span>
          <span class="brand-title">IT Programmer &amp; Data Analyst</span>
        </div>
      </a>

      <!-- Desktop Nav Items -->
      <ul class="nav-links-desktop d-none d-lg-flex">
        <li><a href="${homeLink}" class="${isHome ? 'active' : ''}">Home</a></li>
        <li><a href="${projectsLink}" class="${isProject ? 'active' : ''}">Projects</a></li>
        <li><a href="${experienceLink}">Experience</a></li>
        <li><a href="${skillsLink}">Skills</a></li>
        <li><a href="${aboutLink}" class="${isAbout ? 'active' : ''}">About Me</a></li>
      </ul>

      <!-- Desktop CTA & Mobile Hamburger -->
      <div class="d-flex align-items-center gap-2">
        <a href="${cvLink}" target="_blank" rel="noopener" class="nav-cta-btn d-none d-sm-inline-flex">
          <i class="bi bi-file-earmark-text"></i> View CV
        </a>
        <button class="navbar-toggler-btn burger" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span></span>
        </button>
      </div>

    </div>
  </nav>
    `;

    if (container) {
      container.outerHTML = html;
    } else {
      const existingNav = document.getElementById('navbar');
      const existingMenu = document.getElementById('main-navbar');
      if (existingNav) existingNav.remove();
      if (existingMenu) existingMenu.remove();
      document.body.insertAdjacentHTML('afterbegin', html);
    }

    // Initialize interactive navbar behaviors
    setupNavbarInteractions();
  }

  function setupNavbarInteractions() {
    const navbar = document.getElementById('navbar');
    const burger = document.querySelector('.burger');
    const mainNavbar = document.getElementById('main-navbar');
    const backToTop = document.querySelector('.back-to-top');

    // Sticky shadow on scroll
    function handleScroll() {
      if (!navbar) return;
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
        if (backToTop) backToTop.classList.add('active');
      } else {
        navbar.classList.remove('scrolled');
        if (backToTop) backToTop.classList.remove('active');
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Sync burger active state with Bootstrap collapse
    if (mainNavbar && burger) {
      mainNavbar.addEventListener('show.bs.collapse', function() {
        burger.classList.add('active');
      });
      mainNavbar.addEventListener('hide.bs.collapse', function() {
        burger.classList.remove('active');
      });

      // Close mobile menu on clicking any navigation anchor
      const menuLinks = mainNavbar.querySelectorAll('a');
      menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(mainNavbar);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }
        });
      });
    }
  }

  // Mount navbar on document ready or immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();

