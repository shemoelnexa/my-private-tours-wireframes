/* ============================================
   MyPrivateTours.com — Wireframe Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mega Menu (hover dropdowns with close delay) ---
  const megaItems = document.querySelectorAll('.nav__has-mega');
  let closeTimer = null;

  megaItems.forEach(item => {
    const menu = item.querySelector('.mega-menu');
    if (!menu) return;

    item.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
      // Close any other open megas first
      megaItems.forEach(other => {
        if (other !== item) other.querySelector('.mega-menu')?.classList.remove('active');
      });
      menu.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => menu.classList.remove('active'), 150);
    });

    // Keep menu open when hovering over the dropdown itself
    menu.addEventListener('mouseenter', () => {
      clearTimeout(closeTimer);
    });

    menu.addEventListener('mouseleave', () => {
      closeTimer = setTimeout(() => menu.classList.remove('active'), 150);
    });
  });

  // Close mega menu when mouse leaves the nav entirely
  const navEl = document.querySelector('.nav');
  if (navEl) {
    navEl.addEventListener('mouseleave', () => {
      clearTimeout(closeTimer);
      document.querySelectorAll('.mega-menu.active').forEach(m => m.classList.remove('active'));
    });
  }

  // Region sidebar hover — highlight active region
  document.querySelectorAll('.mega-menu__regions a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.closest('.mega-menu__regions').querySelectorAll('a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // --- Mobile Hamburger (original BEM class pattern) ---
  const hamburgerBem = document.querySelector('.nav__hamburger');
  const mobileNavBem = document.querySelector('.nav .mobile-nav');
  if (hamburgerBem && mobileNavBem) {
    hamburgerBem.addEventListener('click', () => {
      mobileNavBem.classList.toggle('active');
      hamburgerBem.classList.toggle('active');
    });
  }

  // --- Mobile Hamburger (new pattern: .hamburger / .mobile-nav) ---
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.site-header .mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // --- Mobile City Accordions (original BEM class pattern) ---
  document.querySelectorAll('.mobile-nav__city-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      const accordion = toggle.nextElementSibling;
      if (accordion) accordion.classList.toggle('active');
    });
  });

  // --- Mobile Accordion (new pattern: .accordion-trigger / .accordion-panel) ---
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const panel = trigger.nextElementSibling;
      if (!panel) return;
      const isOpen = panel.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // --- FAQ Accordion (original BEM class pattern) ---
  document.querySelectorAll('.faq-item__question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });

  // --- FAQ Accordion (new pattern: .faq-question / .faq-answer) ---
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      // Close all in same list
      item.closest('.faq-list')?.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Cookie Banner (original BEM pattern) ---
  const cookieBannerBem = document.querySelector('.cookie-banner');
  if (cookieBannerBem && !cookieBannerBem.id) {
    const dismissed = sessionStorage.getItem('cookieDismissed');
    if (!dismissed) {
      setTimeout(() => cookieBannerBem.classList.add('active'), 1000);
    }
    cookieBannerBem.querySelectorAll('[data-cookie-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        cookieBannerBem.classList.remove('active');
        sessionStorage.setItem('cookieDismissed', 'true');
      });
    });
  }

  // --- Cookie Banner (new pattern: #cookieBanner with #cookieAccept / #cookieDecline) ---
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const dismissed = sessionStorage.getItem('cookieDismissed');
    if (!dismissed) {
      setTimeout(() => cookieBanner.classList.add('visible'), 1200);
    }
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');
    [acceptBtn, declineBtn].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        cookieBanner.classList.remove('visible');
        sessionStorage.setItem('cookieDismissed', 'true');
      });
    });
  }

  // --- Lightbox ---
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => lightbox.classList.add('active'));
    });
    lightbox.querySelector('.lightbox__close')?.addEventListener('click', () => {
      lightbox.classList.remove('active');
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  // --- WhatsApp Tooltip ---
  const waWidget = document.querySelector('.whatsapp-widget');
  if (waWidget) {
    waWidget.addEventListener('click', () => {
      window.open('https://wa.me/1234567890?text=Hi!%20I%20want%20to%20book%20a%20private%20tour.', '_blank');
    });
  }

  // --- Filter Bar Interaction ---
  document.querySelectorAll('.filter-bar__select').forEach(select => {
    select.addEventListener('change', () => {
      // Visual feedback on filter change
      select.style.borderColor = '#1a1a1a';
      setTimeout(() => { select.style.borderColor = ''; }, 1500);
    });
  });

  // --- Attraction Strip Active State ---
  document.querySelectorAll('.attraction-strip__btn').forEach(btn => {
    btn.addEventListener('mousedown', () => btn.classList.add('active'));
    btn.addEventListener('mouseup', () => {
      setTimeout(() => btn.classList.remove('active'), 200);
    });
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- Tour card click → tour detail ---
  document.querySelectorAll('.tour-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  // --- City card click → city page ---
  document.querySelectorAll('.city-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  // --- Blog card click → article ---
  document.querySelectorAll('.blog-card[data-href]').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = card.dataset.href;
    });
  });

  // --- Pagination click ---
  document.querySelectorAll('.pagination__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pagination__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

});
