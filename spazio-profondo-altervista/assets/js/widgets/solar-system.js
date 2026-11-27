/**
 * SPAZIO PROFONDO — modello interattivo del Sistema Solare
 *
 * Il problema dichiarato nel progetto: distanze e dimensioni reali non
 * stanno insieme su uno schermo. Se Nettuno fosse a 400 px dal Sole,
 * la Terra sarebbe a 13 px e i pianeti rocciosi sarebbero invisibili.
 * Soluzione: due modalità selezionabili, entrambe etichettate.
 *
 *   ILLUSTRATIVA  — distanze compresse (radice quarta), raggi compressi.
 *                   Serve a leggere e cliccare i pianeti.
 *   SCALA DICHIARATA — distanze logaritmiche in unità astronomiche e
 *                   raggi nel rapporto reale fra i pianeti: la differenza
 *                   fra Giove e Mercurio si vede davvero.
 *
 * Interazione: clic/tap sul pianeta o sull'orbita, trascinamento per
 * spostare la vista, rotellina per lo zoom, barra pianeti per la tastiera.
 */

import { PLANETS, SUN } from '../../data/planets.js';
import { fitCanvas, prefersReducedMotion, clamp } from '../core/dom.js';
import { drawPlanet, drawSun, hexA } from '../fx/planet.js';

const TAU = Math.PI * 2;

export function createSolarSystem(canvas, { onSelect, height = 520 } = {}) {
  const state = {
    w: 0, h: 0,
    mode: 'illustrativa',
    speed: 1,
    playing: !prefersReducedMotion(),
    zoom: 1,
    pan: { x: 0, y: 0 },
    selected: null,
    hover: null,
    time: 0,
    labels: true
  };

  let ctx, raf = null, last = 0, alive = true;
  let dragging = false, dragStart = null, dragged = false;

  /* ---------- geometria: posizione di ciascun pianeta ---------- */
  function layout() {
    const cx = state.w * 0.5 + state.pan.x;
    const cy = state.h * 0.5 + state.pan.y;
    const maxR = Math.min(state.w, state.h) * 0.44 * state.zoom;
    const items = PLANETS.map((p) => {
      let orbit, radius;
      if (state.mode === 'illustrativa') {
        // radice quarta: comprime 30 UA in un intervallo leggibile
        orbit = Math.pow(p.orbit.au / 30.07, 0.25) * maxR;
        radius = (3.6 + Math.pow(p.radiusKm / 69911, 0.42) * 12) * Math.min(1.6, state.zoom);
      } else {
        // scala logaritmica dichiarata + raggi nel rapporto reale
        const lo = Math.log10(0.387), hi = Math.log10(30.07);
        orbit = ((Math.log10(p.orbit.au) - lo) / (hi - lo) * 0.86 + 0.14) * maxR;
        radius = Math.max(1.6, (p.radiusKm / 69911) * 24 * Math.min(1.8, state.zoom));
      }
      const periodYears = p.orbit.periodDays / 365.26;
      const angle = (state.time / periodYears) * 0.55 + p.order * 0.9;
      return {
        planet: p, orbit, radius, angle,
        x: cx + Math.cos(angle) * orbit,
        y: cy + Math.sin(angle) * orbit * 0.42   // prospettiva inclinata
      };
    });
    return { cx, cy, items, maxR };
  }

  /* ---------- disegno ---------- */
  function draw() {
    const { cx, cy, items } = layout();
    ctx.clearRect(0, 0, state.w, state.h);

    // orbite
    items.forEach((it) => {
      const isActive = state.selected === it.planet.id || state.hover === it.planet.id;
      ctx.strokeStyle = isActive
        ? hexA(it.planet.visual.base, 0.55)
        : 'rgba(173,198,255,.13)';
      ctx.lineWidth = isActive ? 1.6 : 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, it.orbit, it.orbit * 0.42, 0, 0, TAU);
      ctx.stroke();
    });

    const sunR = state.mode === 'illustrativa'
      ? 16 * Math.min(1.5, state.zoom)
      : Math.max(6, (SUN.radiusKm / 69911) * 24 * Math.min(1.8, state.zoom) * 0.22);
    drawSun(ctx, cx, cy, sunR, (Math.sin(state.time * 3) + 1) / 2);

    // pianeti dietro il Sole prima, poi quelli davanti
    const sorted = [...items].sort((a, b) => a.y - b.y);
    sorted.forEach((it) => {
      const sel = state.selected === it.planet.id;
      const hov = state.hover === it.planet.id;
      if (sel || hov) {
        ctx.strokeStyle = hexA(it.planet.visual.base, sel ? 0.9 : 0.5);
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.arc(it.x, it.y, it.radius + 7, 0, TAU); ctx.stroke();
      }
      drawPlanet(ctx, it.x, it.y, it.radius, it.planet.visual, { glow: sel ? 0.8 : 0 });

      if (state.labels && (state.mode === 'illustrativa' || it.radius > 3 || sel || hov)) {
        ctx.font = `${sel ? 'bold ' : ''}10px ui-monospace, "SF Mono", monospace`;
        ctx.fillStyle = sel ? '#e9f0ff' : 'rgba(167,184,214,.8)';
        ctx.textAlign = 'center';
        ctx.fillText(it.planet.name.toUpperCase(), it.x, it.y - it.radius - 9);
        ctx.textAlign = 'start';
      }
    });

    // nota di scala
    ctx.font = '10px ui-monospace, "SF Mono", monospace';
    ctx.fillStyle = 'rgba(122,140,170,.9)';
    ctx.fillText(state.mode === 'illustrativa'
      ? 'MODALITÀ ILLUSTRATIVA — distanze e dimensioni compresse, non in scala'
      : 'SCALA DICHIARATA — distanze logaritmiche in UA, raggi nel rapporto reale',
      14, state.h - 14);
  }

  function frame(nowMs) {
    if (!alive) return;
    const now = nowMs / 1000;
    const dt = last ? Math.min(0.06, now - last) : 0.016;
    last = now;
    if (state.playing) state.time += dt * state.speed;
    draw();
    raf = requestAnimationFrame(frame);
  }

  /* ---------- interazione ---------- */
  function pick(mx, my) {
    const { items } = layout();
    let best = null, bestD = Infinity;
    items.forEach((it) => {
      const d = Math.hypot(mx - it.x, my - it.y);
      const tolerance = Math.max(18, it.radius + 12);  // area touch generosa
      if (d < tolerance && d < bestD) { best = it; bestD = d; }
    });
    return best;
  }

  function toLocal(e) {
    const rect = canvas.getBoundingClientRect();
    const point = e.touches?.[0] || e;
    return { x: point.clientX - rect.left, y: point.clientY - rect.top };
  }

  function onDown(e) {
    dragging = true; dragged = false;
    dragStart = { ...toLocal(e), panX: state.pan.x, panY: state.pan.y };
  }

  function onMove(e) {
    const p = toLocal(e);
    if (dragging && dragStart) {
      const dx = p.x - dragStart.x, dy = p.y - dragStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) dragged = true;
      state.pan.x = dragStart.panX + dx;
      state.pan.y = dragStart.panY + dy;
      if (!state.playing) draw();
      return;
    }
    const hit = pick(p.x, p.y);
    const id = hit?.planet.id || null;
    if (id !== state.hover) {
      state.hover = id;
      canvas.style.cursor = id ? 'pointer' : 'grab';
      if (!state.playing) draw();
    }
  }

  function onUp(e) {
    if (dragging && !dragged) {
      const p = toLocal(e.changedTouches?.[0] ? e.changedTouches[0] : e);
      const hit = pick(p.x, p.y);
      if (hit) select(hit.planet.id);
    }
    dragging = false; dragStart = null;
  }

  function onWheel(e) {
    e.preventDefault();
    state.zoom = clamp(state.zoom * (e.deltaY > 0 ? 0.92 : 1.08), 0.55, 3.2);
    if (!state.playing) draw();
  }

  function select(id) {
    state.selected = id;
    onSelect?.(id);
    if (!state.playing) draw();
  }

  function size() {
    const rect = canvas.parentElement.getBoundingClientRect();
    state.w = Math.max(280, Math.round(rect.width));
    state.h = height;
    ctx = fitCanvas(canvas, state.w, state.h);
  }

  /* ---------- ciclo di vita ---------- */
  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { size(); draw(); }, 170);
  };

  // Non animare se il widget non è visibile: risparmio di batteria.
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { if (state.playing && !raf) { last = 0; raf = requestAnimationFrame(frame); } }
      else if (raf) { cancelAnimationFrame(raf); raf = null; }
    });
  }, { threshold: 0.02 });

  function init() {
    size();
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    canvas.addEventListener('touchmove', onMove, { passive: true });
    canvas.addEventListener('touchend', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', onResize);
    io.observe(canvas);

    if (prefersReducedMotion()) { state.playing = false; draw(); }
    else { raf = requestAnimationFrame(frame); }
  }

  return {
    init,
    select,
    get state() { return state; },
    setMode(mode) { state.mode = mode; draw(); },
    setSpeed(v) { state.speed = v; },
    toggleLabels() { state.labels = !state.labels; draw(); return state.labels; },
    togglePlay() {
      state.playing = !state.playing;
      if (state.playing && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      if (!state.playing && raf) { cancelAnimationFrame(raf); raf = null; draw(); }
      return state.playing;
    },
    resetView() { state.zoom = 1; state.pan = { x: 0, y: 0 }; draw(); },
    destroy() {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener('mousedown', onDown);
      canvas.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
    }
  };
}
