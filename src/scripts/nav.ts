function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-nav-panel]');

  if (header && header.dataset.navBound !== 'true') {
    header.dataset.navBound = 'true';

    const isTransparent = header.dataset.transparent === 'true';

    const updateScrollState = () => {
      const scrolled = window.scrollY > 32;
      header.dataset.scrolled = String(scrolled);
    };

    if (isTransparent) {
      updateScrollState();
      window.addEventListener('scroll', updateScrollState, { passive: true });
    } else {
      header.dataset.scrolled = 'true';
    }
  }

  if (toggle && panel && toggle.dataset.bound !== 'true') {
    toggle.dataset.bound = 'true';

    const setOpen = (open: boolean) => {
      panel.dataset.open = String(open);
      // Mirrored onto the toggle button itself so its two stacked icons
      // (menu / close in Header.astro) can cross-fade via a CSS variant
      // scoped to this button, instead of swapping the icon in JS.
      toggle.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      document.documentElement.style.overflow = open ? 'hidden' : '';
    };

    setOpen(false);
    toggle.addEventListener('click', () => setOpen(panel.dataset.open !== 'true'));

    panel.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setOpen(false));
    });

    panel.querySelectorAll<HTMLElement>('[data-dropdown-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const submenu = btn.nextElementSibling as HTMLElement | null;
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        submenu?.classList.toggle('hidden', isOpen);
      });
    });
  }
}

document.addEventListener('astro:page-load', initNav);
