(() => {
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const discord = 'https://discord.gg/RBfmZNAg9P';
  const darklands = 'https://arkana-mechanika-labs.github.io/';
  const img = name => `/assets/showcase/1536/${name}`;

  const tutorials = [
    ['Episode 01', 'Your first combat scene', 'Create the initial scene and establish the basic combat setup.', 'bbx2s-UHMsg'],
    ['Episode 02', 'The Grid and the Grid Manager', 'Learn how cells, movement, occupancy, ranges, and targeting fit together.', '61uMNZN9s_s'],
    ['Episode 03', 'Creating Actors', 'Create combatants and configure the components that give them their runtime capabilities.', 'DLT_cVnJw1I'],
    ['Episode 04', 'Tutorial Episode 04', 'Continue the RPG Combat Toolkit tutorial series.', 'Eo5qeoUr4T0']
  ];

  const shots = [
    ['S01_1536x1024.png', 'Modern tactical combat', 'A firearm-focused 3D setup with action points, selection, turn controls, character information, and a complete combat HUD.', 'Modern 3D tactical combat demo on a desert road', true],
    ['S02_1536x1024.png', '2D and retro-friendly', 'Use the same combat foundation for a pixel-art tactical RPG with its own grid, actors, interface, and presentation.', 'Retro pixel-art 2D tactical combat scene'],
    ['S03_1536x1024.png', 'Inventory and equipment UI', 'A working backpack, equipment layout, item interactions, weapon handling, and combat-ready character panel.', 'Inventory and equipment interface over the modern demo'],
    ['S04_1536x1024.png', 'Modular ability authoring', 'Create spells, attacks, and special actions as reusable assets, then configure targeting, conditions, execution, and animation in the Inspector.', 'Unity Inspector showing a modular ability definition'],
    ['S05_1536x1024.png', 'Visual formula graphs', 'Build calculations for stats, costs, bonuses, and rules with a visual graph instead of hard-coding every formula.', 'Visual NodeGraph for an armor class formula'],
    ['S06_1536x1024.png', 'Scene setup wizard', 'Bootstrap a playable scene by choosing the camera, managers, grid, defaults, providers, and core assets in one guided workflow.', 'RPG Combat Toolkit scene setup wizard'],
    ['S07_1536x1024.png', 'Guided actor creation', 'Turn a 2D or 3D model into a combat-ready actor prefab without assembling every component by hand.', 'Create Actor Wizard with a 3D character preview'],
    ['S08_1536x1024.png', 'Multi-tile actors', 'Create creatures and objects that occupy several cells while remaining part of the same movement, occupancy, targeting, and combat rules.', 'Large multi-tile creature on a tactical dungeon grid'],
    ['S09_1536x1024.png', 'Data-driven action definitions', 'Configure movement, attacks, reactions, validation rules, and action costs as reusable assets shared across actors.', 'Reusable action definition in the Unity Inspector'],
    ['S10_1536x1024.png', 'Modular action building blocks', 'Keep action costs, availability checks, and execution logic together in a workflow that is easy to inspect and extend.', 'Modular actions with reusable and validation callouts'],
    ['S11.png', 'Grid and tilemap visualization', 'See cells, masks, playable boundaries, tilemaps, and highlight layers directly in the Unity Editor.', 'Grid and tilemap visualization in a dungeon room'],
    ['S12.png', 'Inspector-first configuration', 'Tune reusable actions and their validation rules from readable assets, with full source available for deeper changes.', 'Action configuration shown in the Unity Inspector'],
    ['S13.png', 'Actor component architecture', 'Compose actors from focused components for actions, behaviour, movement, attacks, animation, inventory, equipment, stats, visuals, statuses, abilities, audio, and voice.', 'Actor component architecture around a 3D character']
  ];

  const ensureCss = href => {
    if (q(`link[href="${href}"]`)) return;
    const node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = href;
    document.head.append(node);
  };

  const link = (label, href, external = false) => {
    const node = document.createElement('a');
    node.textContent = label;
    node.href = href;
    if (external) {
      node.target = '_blank';
      node.rel = 'noopener noreferrer';
    }
    return node;
  };

  const beforeSupport = (menu, node) => {
    const at = q('a[href="/support/"]', menu) || q('.nav-demo', menu);
    at ? menu.insertBefore(node, at) : menu.append(node);
  };

  const navigation = () => {
    qa('[data-nav-menu]').forEach(menu => {
      if (!q('a[href="/tutorials/"]', menu)) {
        const node = link('Tutorials', '/tutorials/');
        const features = q('a[href="/features/"]', menu);
        features ? features.after(node) : beforeSupport(menu, node);
      }
      if (!q('a[href="/projects/"]', menu)) beforeSupport(menu, link('Other projects', '/projects/'));
      if (!q('a[href^="https://discord.gg/"]', menu)) beforeSupport(menu, link('Discord', discord, true));
    });
    qa('.site-footer nav').forEach(menu => {
      if (!q('a[href="/tutorials/"]', menu)) menu.append(link('Tutorials', '/tutorials/'));
      if (!q('a[href="/projects/"]', menu)) menu.append(link('Other projects', '/projects/'));
      if (!q('a[href^="https://discord.gg/"]', menu)) menu.append(link('Discord', discord, true));
    });
  };

  const setText = (root, selector, value, html = false) => {
    const node = q(selector, root);
    if (!node) return;
    html ? node.innerHTML = value : node.textContent = value;
  };

  const homepageCopy = () => {
    if (!q('.product-hero')) return;
    setText(document, '.product-hero .eyebrow', '<span></span> A turn-based combat foundation you can build on', true);
    setText(document, '.product-title em', 'Build your tactical RPG without rebuilding the combat engine');
    setText(document, '.product-hero .hero-lede', 'Start from a working <strong>2D and 3D tactical combat framework</strong> instead of wiring grids, movement, actions, abilities, reactions, inventory, character rules, UI, AI, and persistence one system at a time. Keep the supplied setup, tune it to your rules, or replace the parts that make your game different.', true);
    const supportFact = qa('.hero-facts li').find(n => n.textContent.toLowerCase().includes('support'));
    if (supportFact) supportFact.textContent = 'Email support + Discord community';

    const heading = q('#included .section-heading');
    if (heading) {
      setText(heading, '.eyebrow', '<span></span> Start with the parts players will feel', true);
      setText(heading, 'h2', 'Spend your time on your game—not on the same combat plumbing.');
      setText(heading, 'p:last-child', 'Movement, abilities, reactions, inventory, UI, and editor tools already work together. Use the defaults to get moving quickly, then shape the rules and presentation around your own RPG.');
    }

    const cards = [
      ['Start with a working tactical grid', 'Build square-grid encounters in 2D or 3D with pathfinding, movement costs, occupancy, facing, previews, targeting feedback, and multi-tile actors already connected.'],
      ['Author abilities without wiring every step by hand', 'Create spells and skills from reusable targeting, range, line-of-sight, area, condition, damage, healing, status, projectile, AI, and visual modules.'],
      ['Give combat real tactical choices', 'Combine melee and ranged attacks, flexible action-point economies, opportunity attacks, reactions, ready actions, delay, defend, and weapon-set swaps.'],
      ['Bring gear and character rules into the same loop', 'Use inventory, equipment, weapon sets, health, effects, statuses, modifiers, dice, and visual stat formulas without stitching together unrelated packages.'],
      ['Test it immediately with working UI and demos', 'Explore combat, inventory, initiative, abilities, statuses, tooltips, party controls, and the combat log through three different playable examples.'],
      ['Customize without fighting the framework', 'Use setup wizards and validators, edit readable data assets, inspect the full C# source, extend the AI, and connect snapshots to your own save layer.']
    ];
    qa('#included .priority-card').forEach((card, i) => {
      if (!cards[i]) return;
      setText(card, 'h3', cards[i][0]);
      setText(card, 'p', cards[i][1]);
    });

    const packages = [
      ['Swap what you need', 'Clear interfaces let you replace individual systems without throwing away the rest of the toolkit.'],
      ['A connected combat loop', 'Actors, turns, actions, grids, movement, attacks, reactions, health, and combat state already work together.'],
      ['Ready-made starting points', 'Default implementations, UGUI, visual feedback, prefabs, settings, factories, and editor helpers are included.'],
      ['Add the RPG layers you need', 'Abilities, inventory, stats, animation, audio, parties, overlays, AI services, and other modules can be used selectively.'],
      ['Learn from working examples', 'Three playable demos show different rules, art styles, interfaces, and 2D/3D presentations.']
    ];
    qa('#included .package-structure > div').forEach((item, i) => {
      if (!packages[i]) return;
      setText(item, 'strong', packages[i][0]);
      setText(item, 'span', packages[i][1]);
    });
  };

  const showcase = () => {
    const section = q('#showcase');
    if (!section) return;
    const heading = q('.section-heading', section);
    if (heading) {
      setText(heading, '.eyebrow', '<span></span> Inside the toolkit', true);
      setText(heading, 'h2', 'Real demos. Real Unity workflows.');
      setText(heading, 'p:last-child', 'These screenshots show the runtime, the editor tools, and the systems you will actually configure. Open any image to inspect the full version.');
    }
    const grid = q('.showcase-grid', section);
    if (!grid) return;
    grid.className = 'showcase-grid showcase-grid--new';
    grid.innerHTML = shots.map(([file, title, desc, alt, featured]) => `<figure class="showcase-card new-showcase-card reveal${featured ? ' new-showcase-card--featured' : ''}"><a href="${img(file)}" target="_blank" rel="noopener"><img src="${img(file)}" alt="${alt}" loading="lazy" width="1536" height="1024"></a><figcaption><strong>${title}</strong><span>${desc}</span></figcaption></figure>`).join('');
  };

  const demos = () => {
    const section = q('#demos');
    if (!section) return;
    const heading = q('.section-heading', section);
    if (heading) {
      setText(heading, 'h2', 'Three examples, three different directions.');
      setText(heading, 'p:last-child', 'Explore them, learn from them, and pull them apart. The same framework supports very different rules and presentations.');
    }
    const copy = [
      [img('S08_1536x1024.png'), 'Fantasy 3D dungeon setup', 'Demo 1 · Fantasy 3D', 'Party-based fantasy combat', 'Tactical movement, attacks, abilities, reactions, inventory, equipment, stats, audio, and camera helpers.'],
      [img('S01_1536x1024.png'), 'Modern 3D action-point combat', 'Demo 2 · Modern 3D', 'Single-pool action-point combat', 'Firearms, a single action-point pool, equipment, weapon handling, selection, and a different HUD.'],
      [img('S02_1536x1024.png'), 'Retro pixel-art 2D tactical combat', 'Demo 3 · Fantasy 2D', 'A complete 2D implementation', 'A dedicated 2D grid, cursor, actors, combat UI, action points, inventory, and combat log.']
    ];
    qa('.demo-card', section).forEach((card, i) => {
      if (!copy[i]) return;
      const [src, alt, label, title, text] = copy[i];
      const image = q('img', card);
      if (image) { image.src = src; image.alt = alt; image.width = 1536; image.height = 1024; }
      setText(card, 'span', label); setText(card, 'h3', title); setText(card, 'p', text);
    });
  };

  const featureCopy = () => {
    if (!q('.feature-hero')) return;
    setText(document, '.feature-hero h1', 'Everything included in RPG Combat Toolkit 1.0.');
    setText(document, '.feature-hero .hero-lede', 'Check the parts that matter to your project first, then dig into the full system list. The toolkit covers the visible combat experience as well as the editor workflows and extension points behind it.');
    setText(document, '.feature-summary h2', 'A complete starting point');
    const priority = q('.buyer-priority-intro');
    if (priority) {
      setText(priority, '.eyebrow', '<span></span> The quickest overview', true);
      setText(priority, 'h2', 'Six areas you can start building with right away.');
      setText(priority, 'p:last-child', 'These are the systems most likely to shape your game: grids, abilities, tactical actions, character rules, working UI, and the tools used to set everything up.');
    }
    const gameplay = q('#gameplay .section-heading');
    if (gameplay) {
      setText(gameplay, '.eyebrow', '<span></span> Gameplay systems', true);
      setText(gameplay, 'h2', 'The building blocks behind your combat.');
      setText(gameplay, 'p:last-child', 'Use the complete setup or choose the modules that fit your project. Each section below lists what is included in version 1.0.');
    }
    const ui = q('#ui .section-heading');
    if (ui) {
      setText(ui, '.eyebrow', '<span></span> Working UI included', true);
      setText(ui, 'h2', 'Test the combat before building your final interface.');
      setText(ui, 'p:last-child', 'The supplied UGUI is replaceable, but it gives you working combat, inventory, tooltip, and turn-control screens from the start.');
    }
  };

  const discordContent = () => {
    const summary = q('.docs-support .support-summary');
    if (summary) {
      const p = qa('p', summary).find(n => !n.classList.contains('eyebrow'));
      if (p) p.textContent = 'Use email for private files or detailed investigations. Join Discord for public questions, implementation discussion, updates, shared solutions, and project showcases.';
      const actions = q('.hero-actions', summary);
      if (actions && !q('a[href^="https://discord.gg/"]', actions)) {
        const node = link('Join the Discord community', discord, true); node.className = 'button button--secondary'; actions.append(node);
      }
    }

    if (!q('.support-hero')) return;
    const actions = q('.support-hero .hero-actions');
    if (actions && !q('a[href^="https://discord.gg/"]', actions)) {
      const node = link('Join Discord', discord, true); node.className = 'button button--secondary';
      const checklist = q('a[href="#before-contact"]', actions); checklist ? actions.insertBefore(node, checklist) : actions.append(node);
    }
    const status = q('.support-hero .hero-status');
    if (status && !qa('span', status).some(n => n.textContent.includes('Discord'))) {
      const node = document.createElement('span'); node.textContent = 'Discord community'; status.append(node);
    }
    if (!q('#discord-community')) {
      const before = q('#before-contact');
      if (before) before.insertAdjacentHTML('beforebegin', `<section class="section section--surface" id="discord-community"><div class="container support-cta reveal"><p class="eyebrow"><span></span> Community support</p><h2>Join Arkana Mechanika Studios on Discord.</h2><p>Use Discord for public questions, implementation discussion, shared solutions, product updates, feedback, and project showcases. Email remains the official route for private project information, files, purchase matters, and detailed investigation.</p><div class="hero-actions"><a class="button button--primary" href="${discord}" target="_blank" rel="noopener noreferrer">Join the Discord community</a><a class="button button--secondary" href="mailto:arkana.mechanika.studios@gmail.com?subject=%5BRPG%20Combat%20Toolkit%20Support%5D">Email technical support</a></div></div></section>`);
    }
  };

  const tutorialSection = () => {
    const demoSection = q('#demos');
    if (!demoSection || q('#tutorials')) return;
    const cards = tutorials.map(([episode, title, desc, id]) => `<a class="tutorial-card reveal" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer"><span class="tutorial-card-image"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${title} tutorial thumbnail" loading="lazy" width="480" height="360"><span class="tutorial-play" aria-hidden="true"><svg><use href="/assets/icons.svg#play"></use></svg></span></span><span class="tutorial-card-copy"><small>${episode}</small><h3>${title}</h3><p>${desc}</p></span></a>`).join('');
    demoSection.insertAdjacentHTML('afterend', `<section class="section tutorials-section" id="tutorials"><div class="container"><div class="tutorials-intro reveal"><p class="eyebrow"><span></span> Video tutorials</p><h2>Follow the setup step by step.</h2><p>Start with your first combat scene, learn how the grid works, create actors, and continue through the growing tutorial series.</p></div><div class="tutorial-grid">${cards}</div><div class="tutorials-action reveal"><a class="button button--secondary" href="/tutorials/">Open all tutorials</a></div></div></section>`);
  };

  const projectsSection = () => {
    if (!q('.product-hero') || q('#other-projects')) return;
    q('main')?.insertAdjacentHTML('beforeend', `<section class="section section--surface studio-projects-strip" id="other-projects"><div class="container studio-projects-layout reveal"><div><p class="eyebrow"><span></span> Elsewhere at Arkana Mechanika</p><h2>Other projects, kept clearly separate.</h2><p>RPG Combat Toolkit is our Unity asset. Arkana Mechanika also works on independent research and preservation projects, including the Darklands Restoration Project.</p></div><div class="studio-projects-actions"><a class="button button--secondary" href="/projects/">View other projects</a><a class="project-inline-link" href="${darklands}" target="_blank" rel="noopener noreferrer">Visit Darklands Restoration <span aria-hidden="true">↗</span></a></div></div></section>`);
  };

  const interactions = () => {
    const header = q('[data-header]'), toggle = q('[data-nav-toggle]'), menu = q('[data-nav-menu]');
    const close = () => { toggle?.setAttribute('aria-expanded', 'false'); menu?.classList.remove('is-open'); };
    toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); menu?.classList.toggle('is-open', open); });
    qa('a', menu || document.createElement('div')).forEach(node => node.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
    const scroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8); scroll(); window.addEventListener('scroll', scroll, { passive: true });

    qa('[data-year]').forEach(node => node.textContent = String(new Date().getFullYear()));
    qa('.video-lite[data-video]').forEach(button => button.addEventListener('click', () => {
      const frame = document.createElement('iframe'); frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(button.dataset.video)}?autoplay=1&rel=0`; frame.title = button.getAttribute('aria-label') || 'YouTube video'; frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; frame.allowFullscreen = true; button.replaceChildren(frame); button.removeAttribute('data-video');
    }, { once: true }));

    const items = qa('.reveal'), reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) items.forEach(node => node.classList.add('is-visible'));
    else {
      const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 });
      items.forEach(node => observer.observe(node));
    }
  };

  ensureCss('/tutorials.css'); ensureCss('/refresh.css');
  navigation(); homepageCopy(); showcase(); demos(); featureCopy(); discordContent(); tutorialSection(); projectsSection(); interactions();
})();
