import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Central animation bootstrapper. Re-run on every navigation (including the
 * first) via the `astro:page-load` event, which Astro's <ClientRouter />
 * fires both on initial load and after client-side page transitions.
 *
 * Contract (data attributes used across components):
 *  - data-animate="fade-up" | "fade"   single element scroll reveal
 *  - data-animate-group + data-animate-item   staggered group reveal
 *  - data-animate-line                 SVG path that draws in on scroll
 *  - data-counter data-counter-to="123" [data-counter-prefix] [data-counter-suffix]
 *  - data-hero data-hero-item          hero load-in sequence
 */
function initAnimations(): void {
  // Kill any ScrollTriggers left over from the previous page (relevant when
  // navigating via the View Transitions client router rather than a full
  // page load).
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set('[data-animate], [data-animate-item], [data-hero-item]', {
      opacity: 1,
      y: 0,
      x: 0,
      clearProps: 'transform',
    });
    document
      .querySelectorAll<SVGPathElement>('[data-animate-line], [data-hero-line]')
      .forEach((path) => {
        path.style.strokeDasharray = 'none';
        path.style.strokeDashoffset = '0';
      });
    renderCountersInstantly();
    ScrollTrigger.refresh();
    return;
  }

  initFadeReveals();
  initGroupReveals();
  initFlowLines();
  initCounters();
  initHeroEntrance();

  ScrollTrigger.refresh();
}

function initFadeReveals(): void {
  document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
    const isFadeOnly = el.dataset.animate === 'fade';
    gsap.set(el, isFadeOnly ? { opacity: 0 } : { opacity: 0, y: 28 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }),
    });
  });
}

function initGroupReveals(): void {
  document.querySelectorAll<HTMLElement>('[data-animate-group]').forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>('[data-animate-item]');
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 24 });
    ScrollTrigger.create({
      trigger: group,
      start: 'top 82%',
      once: true,
      onEnter: () =>
        gsap.to(items, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
    });
  });
}

/** The signature "thread" motif: a path that draws itself in as you scroll. */
function initFlowLines(): void {
  document.querySelectorAll<SVGPathElement>('[data-animate-line]').forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    ScrollTrigger.create({
      trigger: path,
      start: 'top 78%',
      end: 'bottom 45%',
      scrub: 0.6,
      onUpdate: (self) => {
        path.style.strokeDashoffset = `${length * (1 - self.progress)}`;
      },
    });
  });
}

function counterFormat(el: HTMLElement, value: number): string {
  const rawTo = el.dataset.counterTo || '0';
  const decimals = rawTo.includes('.') ? rawTo.split('.')[1].length : 0;
  const prefix = el.dataset.counterPrefix || '';
  const suffix = el.dataset.counterSuffix || '';
  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${formatted}${suffix}`;
}

function renderCountersInstantly(): void {
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const to = parseFloat(el.dataset.counterTo || '0');
    el.textContent = counterFormat(el, to);
  });
}

function initCounters(): void {
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const to = parseFloat(el.dataset.counterTo || '0');
    const counter = { value: 0 };
    el.textContent = counterFormat(el, 0);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(counter, {
          value: to,
          duration: 1.7,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = counterFormat(el, counter.value);
          },
        }),
    });
  });
}

function initHeroEntrance(): void {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const line = hero.querySelector<SVGPathElement>('[data-hero-line]');
  if (line) {
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;
    gsap.to(line, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', delay: 0.2 });
  }

  const items = hero.querySelectorAll('[data-hero-item]');
  if (!items.length) return;

  gsap.set(items, { opacity: 0, y: 22 });
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.1,
  });
}

document.addEventListener('astro:page-load', initAnimations);
