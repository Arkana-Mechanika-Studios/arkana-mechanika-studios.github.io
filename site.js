(() => {
  const discordUrl = 'https://discord.gg/RBfmZNAg9P';

  const tutorials = [
    {
      episode: 'Episode 01',
      title: 'Your first combat scene',
      description: 'Create the initial scene and establish the basic RPG Combat Toolkit combat setup.',
      videoId: 'bbx2s-UHMsg',
      url: 'https://www.youtube.com/watch?v=bbx2s-UHMsg'
    },
    {
      episode: 'Episode 02',
      title: 'The Grid and the Grid Manager',
      description: 'Understand the spatial foundation used for cells, movement, occupancy, ranges, and targeting.',
      videoId: '61uMNZN9s_s',
      url: 'https://www.youtube.com/watch?v=61uMNZN9s_s'
    },
    {
      episode: 'Episode 03',
      title: 'Creating Actors',
      description: 'Create combatants and configure the components that give them their runtime capabilities.',
      videoId: 'DLT_cVnJw1I',
      url: 'https://www.youtube.com/watch?v=DLT_cVnJw1I'
    },
    {
      episode: 'Episode 04',
      title: 'Tutorial Episode 04',
      description: 'Continue the RPG Combat Toolkit tutorial series with the newly published fourth video.',
      videoId: 'Eo5qeoUr4T0',
      url: 'https://youtu.be/Eo5qeoUr4T0'
    }
  ];

  const createDiscordLink = (label = 'Discord') => {
    const link = document.createElement('a');
    link.href = discordUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = label;
    link.dataset.discordLink = 'true';
    return link;
  };

  const addDiscordNavigation = () => {
    document.querySelectorAll('[data-nav-menu]').forEach(menu => {
      if (menu.querySelector('[data-discord-link]')) return;
      const link = createDiscordLink('Discord');
      const supportLink = menu.querySelector('a[href="/support/"]');
      const demoButton = menu.querySelector('.nav-demo');
      if (supportLink) menu.insertBefore(link, supportLink);
      else if (demoButton) menu.insertBefore(link, demoButton);
      else menu.appendChild(link);
    });

    document.querySelectorAll('.site-footer nav').forEach(menu => {
      if (menu.querySelector('[data-discord-link]')) return;
      const link = createDiscordLink('Discord');
      const supportLink = menu.querySelector('a[href="/support/"]');
      if (supportLink) menu.insertBefore(link, supportLink);
      else menu.appendChild(link);
    });
  };

  const addDiscordHomepageContent = () => {
    const heroFacts = document.querySelector('.hero-facts');
    if (heroFacts && !heroFacts.querySelector('[data-discord-fact]')) {
      const supportFact = Array.from(heroFacts.children).find(item => item.textContent.includes('Official email support'));
      if (supportFact) {
        supportFact.textContent = 'Email support + Discord community';
        supportFact.dataset.discordFact = 'true';
      }
    }

    const supportSummary = document.querySelector('.docs-support .support-summary');
    if (!supportSummary || supportSummary.querySelector('[data-discord-link]')) return;

    const paragraph = supportSummary.querySelector('p:not(.eyebrow)');
    if (paragraph) {
      paragraph.textContent = 'Official email support provides a structured route for private or detailed investigations. The Arkana Mechanika Studios Discord adds searchable public help, implementation discussion, product news, and a place to share projects built with the toolkit.';
    }

    const actions = supportSummary.querySelector('.hero-actions');
    if (actions) {
      const link = createDiscordLink('Join the Discord community');
      link.className = 'button button--secondary';
      actions.appendChild(link);
    }
  };

  const addDiscordSupportContent = () => {
    if (!document.querySelector('.support-hero')) return;

    const heroActions = document.querySelector('.support-hero .hero-actions');
    if (heroActions && !heroActions.querySelector('[data-discord-link]')) {
      const link = createDiscordLink('Join Discord');
      link.className = 'button button--secondary';
      const checklist = heroActions.querySelector('a[href="#before-contact"]');
      if (checklist) heroActions.insertBefore(link, checklist);
      else heroActions.appendChild(link);
    }

    const heroStatus = document.querySelector('.support-hero .hero-status');
    if (heroStatus && !heroStatus.querySelector('[data-discord-status]')) {
      const status = document.createElement('span');
      status.textContent = 'Discord community';
      status.dataset.discordStatus = 'true';
      heroStatus.appendChild(status);
    }

    if (!document.getElementById('discord-community')) {
      const supportHero = document.querySelector('.support-hero');
      const beforeContact = document.getElementById('before-contact');
      if (supportHero && beforeContact) {
        const section = document.createElement('section');
        section.className = 'section section--surface';
        section.id = 'discord-community';
        section.innerHTML = `
          <div class="container support-cta reveal">
            <p class="eyebrow"><span></span> Community support</p>
            <h2>Join Arkana Mechanika Studios on Discord.</h2>
            <p>Use Discord for public questions, implementation discussion, shared solutions, product updates, feedback, and showcasing projects built with RPG Combat Toolkit. Email remains the official route for private project information, reproduction files, purchase-related matters, and issues requiring detailed investigation.</p>
            <div class="hero-actions">
              <a class="button button--primary" href="${discordUrl}" target="_blank" rel="noopener noreferrer" data-discord-link>Join the Discord community</a>
              <a class="button button--secondary" href="mailto:arkana.mechanika.studios@gmail.com?subject=%5BRPG%20Combat%20Toolkit%20Support%5D">Email technical support</a>
            </div>
          </div>`;
        beforeContact.insertAdjacentElement('beforebegin', section);
      }
    }

    const finalActions = document.querySelector('.support-cta .hero-actions');
    const finalCta = Array.from(document.querySelectorAll('.support-cta')).at(-1);
    const finalCtaActions = finalCta?.querySelector('.hero-actions');
    if (finalCtaActions && !finalCtaActions.querySelector('[data-discord-link]')) {
      const link = createDiscordLink('Join Discord');
      link.className = 'button button--secondary';
      finalCtaActions.appendChild(link);
    }
  };

  const ensureTutorialStyles = () => {
    if (document.querySelector('link[href="/tutorials.css"]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/tutorials.css';
    document.head.appendChild(link);
  };

  const addTutorialNavigation = () => {
    document.querySelectorAll('[data-nav-menu]').forEach(menu => {
      if (menu.querySelector('a[href="/tutorials/"]')) return;
      const link = document.createElement('a');
      link.href = '/tutorials/';
      link.textContent = 'Tutorials';
      const insertionPoint = menu.querySelector('a[href="/features/"]') || menu.querySelector('a[href="/support/"]') || menu.querySelector('.nav-demo');
      if (insertionPoint) menu.insertBefore(link, insertionPoint);
      else menu.appendChild(link);
    });

    document.querySelectorAll('.site-footer nav').forEach(menu => {
      if (menu.querySelector('a[href="/tutorials/"]')) return;
      const link = document.createElement('a');
      link.href = '/tutorials/';
      link.textContent = 'Tutorials';
      const supportLink = menu.querySelector('a[href="/support/"]');
      if (supportLink) menu.insertBefore(link, supportLink);
      else menu.appendChild(link);
    });
  };

  const createTutorialCard = tutorial => {
    const card = document.createElement('a');
    card.className = 'tutorial-card reveal';
    card.href = tutorial.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.innerHTML = `
      <span class="tutorial-card-image">
        <img src="https://i.ytimg.com/vi/${tutorial.videoId}/hqdefault.jpg" alt="${tutorial.title} tutorial thumbnail" loading="lazy" width="480" height="360">
        <span class="tutorial-play" aria-hidden="true"><svg><use href="/assets/icons.svg#play"></use></svg></span>
      </span>
      <span class="tutorial-card-copy">
        <small>${tutorial.episode}</small>
        <h3>${tutorial.title}</h3>
        <p>${tutorial.description}</p>
      </span>`;
    return card;
  };

  const insertHomepageTutorials = () => {
    if (document.getElementById('tutorials')) return;
    const demos = document.getElementById('demos');
    if (!demos) return;

    const section = document.createElement('section');
    section.className = 'section tutorials-section';
    section.id = 'tutorials';
    section.setAttribute('aria-labelledby', 'tutorials-heading');

    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
      <div class="tutorials-intro reveal">
        <p class="eyebrow"><span></span> Video tutorials</p>
        <h2 id="tutorials-heading">Four step-by-step tutorials.</h2>
        <p>Follow the initial workflow from creating a combat scene and understanding the grid to creating actors and continuing with the newly added fourth tutorial.</p>
      </div>`;

    const grid = document.createElement('div');
    grid.className = 'tutorial-grid';
    tutorials.forEach(tutorial => grid.appendChild(createTutorialCard(tutorial)));
    container.appendChild(grid);

    const action = document.createElement('div');
    action.className = 'tutorials-action reveal';
    action.innerHTML = '<a class="button button--secondary" href="/tutorials/">Open the complete tutorial page</a>';
    container.appendChild(action);

    section.appendChild(container);
    demos.insertAdjacentElement('afterend', section);
  };

  ensureTutorialStyles();
  addTutorialNavigation();
  addDiscordNavigation();
  addDiscordHomepageContent();
  addDiscordSupportContent();
  insertHomepageTutorials();

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
