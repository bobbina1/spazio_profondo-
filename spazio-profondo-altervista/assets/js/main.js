/**
 * SPAZIO PROFONDO — bootstrap dell'applicazione
 * Avvia sfondo stellato, navigazione, menu mobile e router.
 */

import { $, $$, prefersReducedMotion } from './core/dom.js';
import { start as startRouter } from './core/router.js';
import { initStarfield } from './fx/starfield.js';

/* ---------------- barra di navigazione ---------------- */
function initNav() {
  const nav = $('.nav');
  const burger = $('.nav__burger');
  const menu = $('.mobile-menu');

  // ombra della barra allo scroll, con rAF per non far lavorare il layout
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav?.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && menu) {
    const setOpen = (open) => {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) menu.querySelector('a')?.focus();
    };
    burger.addEventListener('click', () => setOpen(burger.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) { setOpen(false); burger.focus(); }
    });
    // chiudi il menu quando si passa a desktop
    window.matchMedia('(min-width: 1041px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }
}

/* ---------------- anno nel footer ---------------- */
function initFooter() {
  const year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
}

/* ---------------- avvio ---------------- */
function boot() {
  document.documentElement.classList.toggle('reduced-motion', prefersReducedMotion());
  initStarfield('#starfield');
  initNav();
  initFooter();
  startRouter();

  // Segnala al CSS che il JS è attivo (progressive enhancement)
  document.documentElement.dataset.js = 'on';
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
