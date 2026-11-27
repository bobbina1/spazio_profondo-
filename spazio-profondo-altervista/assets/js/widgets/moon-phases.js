/**
 * SPAZIO PROFONDO — simulazione delle fasi lunari
 *
 * Due pannelli collegati: la Luna come la vediamo dalla Terra e lo
 * schema orbitale visto dall'alto, che mostra PERCHÉ si vede così.
 * Lo scopo è smontare l'equivoco più comune: le fasi non sono ombre
 * della Terra sulla Luna.
 */

import { fitCanvas, prefersReducedMotion } from '../core/dom.js';
import { drawMoonPhase, drawSun, drawPlanet, hexA } from '../fx/planet.js';
import { MOON } from '../../data/moon.js';

const TAU = Math.PI * 2;

export function createMoonLab(canvas, { onPhaseChange, height = 340 } = {}) {
  const state = { phase: 0.25, playing: !prefersReducedMotion(), w: 0, h: 0 };
  let ctx, raf = null, alive = true, last = 0;

  function phaseInfo(phase) {
    const idx = Math.round(((phase % 1) + 1) % 1 * 8) % 8;
    return MOON.phases[idx];
  }

  function draw() {
    const { w, h } = state;
    ctx.clearRect(0, 0, w, h);
    const half = w * 0.5;

    // --- pannello sinistro: la Luna vista da Terra ---
    const r = Math.min(half, h) * 0.33;
    drawMoonPhase(ctx, half * 0.5, h * 0.46, r, state.phase, MOON.visual);
    ctx.font = '9px ui-monospace, "SF Mono", monospace';
    ctx.fillStyle = 'rgba(122,140,170,.95)';
    ctx.textAlign = 'center';
    ctx.fillText('COME LA VEDIAMO DALLA TERRA', half * 0.5, h * 0.92);

    // --- separatore ---
    ctx.strokeStyle = 'rgba(173,198,255,.12)';
    ctx.beginPath(); ctx.moveTo(half, h * 0.1); ctx.lineTo(half, h * 0.9); ctx.stroke();

    // --- pannello destro: schema orbitale dall'alto ---
    const ox = half + half * 0.5, oy = h * 0.46;
    const orbit = Math.min(half, h) * 0.3;

    // direzione della luce solare, da sinistra
    const grad = ctx.createLinearGradient(half + 8, oy, ox + orbit, oy);
    grad.addColorStop(0, hexA('#ffc46b', 0.14));
    grad.addColorStop(1, hexA('#ffc46b', 0));
    ctx.fillStyle = grad;
    ctx.fillRect(half + 4, oy - orbit * 1.5, half - 8, orbit * 3);
    for (let i = 0; i < 4; i++) {
      const y = oy - orbit + (orbit * 2 / 3) * i;
      ctx.strokeStyle = hexA('#ffc46b', 0.3);
      ctx.beginPath(); ctx.moveTo(half + 10, y); ctx.lineTo(half + 34, y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(half + 28, y - 3); ctx.lineTo(half + 34, y); ctx.lineTo(half + 28, y + 3); ctx.stroke();
    }
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffdfae';
    ctx.fillText('luce solare', half + 10, oy - orbit - 10);

    ctx.strokeStyle = 'rgba(173,198,255,.2)';
    ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.arc(ox, oy, orbit, 0, TAU); ctx.stroke();
    ctx.setLineDash([]);

    drawPlanet(ctx, ox, oy, 13, { base: '#2f7ad6', light: '#bfe4ff', dark: '#06203f', bands: false });

    // posizione lunare: fase 0 = fra Terra e Sole (luna nuova)
    const a = ((state.phase % 1) + 1) % 1 * TAU;
    const mx = ox - Math.cos(a) * orbit;
    const my = oy + Math.sin(a) * orbit;
    // metà illuminata sempre verso il Sole (a sinistra)
    ctx.save();
    ctx.beginPath(); ctx.arc(mx, my, 6, 0, TAU); ctx.clip();
    ctx.fillStyle = '#3a3831';
    ctx.fillRect(mx - 6, my - 6, 12, 12);
    ctx.fillStyle = '#f2efe8';
    ctx.fillRect(mx - 6, my - 6, 6, 12);
    ctx.restore();
    ctx.strokeStyle = hexA('#5ee7e0', 0.8);
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(mx, my, 8.5, 0, TAU); ctx.stroke();

    // linea di vista Terra-Luna
    ctx.strokeStyle = hexA('#5ee7e0', 0.3);
    ctx.setLineDash([2, 3]);
    ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(mx, my); ctx.stroke();
    ctx.setLineDash([]);

    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(122,140,170,.95)';
    ctx.fillText('SCHEMA ORBITALE (NON IN SCALA)', ox, h * 0.92);
    ctx.textAlign = 'start';
  }

  function frame(nowMs) {
    if (!alive) return;
    const now = nowMs / 1000;
    const dt = last ? Math.min(0.05, now - last) : 0.016;
    last = now;
    if (state.playing) {
      state.phase = (state.phase + dt * 0.06) % 1;
      onPhaseChange?.(state.phase, phaseInfo(state.phase));
    }
    draw();
    raf = requestAnimationFrame(frame);
  }

  function size() {
    const rect = canvas.parentElement.getBoundingClientRect();
    state.w = Math.max(280, Math.round(rect.width));
    state.h = height;
    ctx = fitCanvas(canvas, state.w, state.h);
  }

  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { size(); draw(); }, 170);
  };

  return {
    init() {
      size();
      window.addEventListener('resize', onResize);
      onPhaseChange?.(state.phase, phaseInfo(state.phase));
      if (prefersReducedMotion()) { state.playing = false; draw(); }
      else raf = requestAnimationFrame(frame);
    },
    setPhase(p) {
      state.phase = ((p % 1) + 1) % 1;
      onPhaseChange?.(state.phase, phaseInfo(state.phase));
      if (!state.playing) draw();
    },
    togglePlay() {
      state.playing = !state.playing;
      if (state.playing && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      if (!state.playing && raf) { cancelAnimationFrame(raf); raf = null; draw(); }
      return state.playing;
    },
    get phase() { return state.phase; },
    phaseInfo: () => phaseInfo(state.phase),
    destroy() {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    }
  };
}
