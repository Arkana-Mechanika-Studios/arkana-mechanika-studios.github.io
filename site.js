(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');

  const closeNavigation = () => {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
  };

  navToggle?.addEventListener('click', () => {
    const next = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(next));
    navMenu?.classList.toggle('is-open', next);
  });

  navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeNavigation();
  });

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });

  document.querySelectorAll('.video-lite[data-video]').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.video;
      if (!id) return;
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      iframe.title = button.getAttribute('aria-label') || 'YouTube video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      button.replaceChildren(iframe);
      button.removeAttribute('data-video');
    }, { once: true });
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealItems.forEach(item => observer.observe(item));
  }
})();
