/**
* Template Name: MyPortfolio - v4.0.1
* Enhanced for Professional Portfolio UI
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Navbar scrolled & Back to top toggle
   */
  const toggleScrolled = () => {
    const navbar = select('.custom-navbar');
    const backtotop = select('.back-to-top');
    if (window.scrollY > 40) {
      if (navbar) navbar.classList.add('scrolled');
      if (backtotop) backtotop.classList.add('active');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backtotop) backtotop.classList.remove('active');
    }
  };

  window.addEventListener('load', toggleScrolled);
  window.addEventListener('scroll', toggleScrolled);

  /**
   * burgerMenu toggle
   */
  const burgerMenu = select('.burger')
  if (burgerMenu) {
    on('click', '.burger', function(e) {
      burgerMenu.classList.toggle('active');
    })
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('#portfolio-grid');
    if (portfolioContainer && typeof Isotope !== 'undefined') {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.item',
        layoutMode: 'fitRows',
        percentPosition: true
      });

      // Recalculate layout after all images load
      const images = portfolioContainer.querySelectorAll('img');
      images.forEach(img => {
        if (img.complete) return;
        img.addEventListener('load', () => {
          portfolioIsotope.layout();
        });
      });

      let portfolioFilters = select('#filters a, .portfolio-filters a', true);

      on('click', '#filters a, .portfolio-filters a', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('active');
        });
        this.classList.add('active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          if (typeof AOS !== 'undefined') {
            AOS.refresh();
          }
        });
      }, true);
    }
  });

  /**
   * Testimonials slider
   */
  window.addEventListener('load', () => {
    if (select('.testimonials-slider') && typeof Swiper !== 'undefined') {
      new Swiper('.testimonials-slider', {
        speed: 700,
        loop: true,
        autoplay: {
          delay: 6000,
          disableOnInteraction: false
        },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        }
      });
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });

})();