/**
 * SPAZIO PROFONDO — unico momento animato orchestrato del sito.
 * Tutto il resto dell'interfaccia è immediatamente visibile: niente
 * comparse a cascata ripetute su ogni sezione o card (vedi fx/reveal.js,
 * ridotto a no-op). Qui, in apertura della pagina Home, il titolo e gli
 * elementi dell'hero entrano in sequenza con una libreria di animazione
 * fisica (Motion, build "mini" per DOM puro — assets/vendor/motion-mini.js,
 * generata da framer-motion/dom/mini con esbuild: nessuna dipendenza
 * runtime, ~13 KB).
 */
import { animateSequence } from '../../vendor/motion-mini.js';
import { prefersReducedMotion } from '../core/dom.js';

const RISE = 'translateY(14px)';
const REST = 'translateY(0)';

export function heroIntro(root) {
  if (prefersReducedMotion()) return;

  const eyebrow = root.querySelector('.hero .eyebrow');
  const title   = root.querySelector('.hero__title');
  const claim   = root.querySelector('.hero__claim');
  const actions = root.querySelector('.hero__actions');
  const meta    = root.querySelector('.hero__meta');
  const targets = [eyebrow, title, claim, actions, meta].filter(Boolean);
  if (!targets.length) return;

  // Stato iniziale impostato via JS (non via CSS globale): se qualcosa va
  // storto, il catch sotto riporta tutto visibile senza lasciare l'hero
  // invisibile per sempre.
  targets.forEach((el) => { el.style.opacity = '0'; });

  try {
    const seq = animateSequence([
      [eyebrow, { opacity: [0, 1], transform: [RISE, REST] }, { duration: .5, ease: 'easeOut' }],
      [title,   { opacity: [0, 1], transform: [RISE, REST] }, { duration: .7, ease: [.22, 1, .36, 1], at: '-0.32' }],
      [claim,   { opacity: [0, 1], transform: [RISE, REST] }, { duration: .5, ease: 'easeOut', at: '-0.38' }],
      [actions, { opacity: [0, 1], transform: [RISE, REST] }, { duration: .45, ease: 'easeOut', at: '-0.28' }],
      [meta,    { opacity: [0, 1] },                           { duration: .6, ease: 'easeOut', at: '-0.25' }],
    ].filter((seg) => seg[0]));
    seq?.finished?.catch(() => {});
  } catch (e) {
    console.warn('heroIntro:', e);
    targets.forEach((el) => { el.style.opacity = ''; });
  }
}
