/**
 * SPAZIO PROFONDO — rendering procedurale dei corpi celesti
 *
 * Nessuna immagine esterna: i pianeti sono generati da gradienti CSS
 * (per il DOM) e da Canvas 2D (per il modello del Sistema Solare).
 * Vantaggi: nessun problema di licenza sulle immagini, peso minimo,
 * coerenza grafica e scalabilità su qualunque densità di pixel.
 * Le fotografie reali restano accessibili tramite i link alle fonti ufficiali.
 */

import { html, raw } from '../core/dom.js';

/** Markup di una sfera CSS. `visual` arriva dai dati del pianeta. */
export function sphereHTML(visual = {}, { size = 120, spin = false, ring = true, className = '' } = {}) {
  const style = [
    `width:${size}px`,
    `--p-base:${visual.base || '#6f8cc0'}`,
    `--p-light:${visual.light || '#cfe3ff'}`,
    `--p-dark:${visual.dark || '#16233f'}`,
    visual.texture ? `--p-texture:${visual.texture}` : '',
    visual.textureOpacity != null ? `--p-texture-opacity:${visual.textureOpacity}` : ''
  ].filter(Boolean).join(';');

  const ringMarkup = (ring && visual.ring)
    ? `<i class="ring" style="--ring-color:${visual.ring.color};--ring-tilt:${visual.ring.tiltDeg}deg"></i>`
    : '';

  return html`<div class="sphere ${raw(spin ? 'sphere--spin ' : '')}${raw(className)}" style="${raw(style)}" aria-hidden="true">${raw(ringMarkup)}</div>`;
}

/** Sole in versione CSS, con alone. */
export function sunHTML(size = 140) {
  return `<div class="sphere" aria-hidden="true" style="width:${size}px;
    --p-base:#ffb648;--p-light:#fff6d8;--p-dark:#c1490a;
    box-shadow:0 0 ${size * 0.5}px ${size * 0.08}px rgba(255,160,60,.45),
               inset -6px -8px 24px rgba(120,40,0,.4)"></div>`;
}

/* ============================================================
   Rendering su canvas
   ============================================================ */

/** Disegna un pianeta: bande, terminatore notte, eventuali anelli. */
export function drawPlanet(ctx, x, y, r, visual = {}, { phase = 0, showRing = true, glow = 0 } = {}) {
  const base = visual.base || '#6f8cc0';
  const light = visual.light || '#cfe3ff';
  const dark = visual.dark || '#16233f';

  if (glow > 0) {
    const g = ctx.createRadialGradient(x, y, r, x, y, r * (1 + glow));
    g.addColorStop(0, hexA(base, 0.35));
    g.addColorStop(1, hexA(base, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r * (1 + glow), 0, Math.PI * 2); ctx.fill();
  }

  // anelli dietro al pianeta
  if (showRing && visual.ring) drawRing(ctx, x, y, r, visual.ring, 'back');

  // corpo con luce dall'alto a sinistra
  const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.08, x, y, r);
  grad.addColorStop(0, light);
  grad.addColorStop(0.45, base);
  grad.addColorStop(1, dark);
  ctx.save();
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = grad; ctx.fillRect(x - r, y - r, r * 2, r * 2);

  // bande orizzontali per i giganti gassosi
  if (visual.bands !== false && r > 6) {
    const bands = visual.bandCount || 7;
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < bands; i++) {
      const by = y - r + (r * 2 / bands) * i;
      ctx.fillStyle = i % 2 ? light : dark;
      ctx.fillRect(x - r, by, r * 2, (r * 2 / bands) * 0.62);
    }
    ctx.globalAlpha = 1;
  }

  // terminatore: lato in ombra
  const term = ctx.createLinearGradient(x - r, y - r, x + r, y + r);
  term.addColorStop(0.35, 'rgba(0,0,0,0)');
  term.addColorStop(1, 'rgba(0,0,0,.72)');
  ctx.fillStyle = term; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();

  if (showRing && visual.ring) drawRing(ctx, x, y, r, visual.ring, 'front');
}

function drawRing(ctx, x, y, r, ring, half) {
  const tilt = (ring.tiltDeg || -18) * Math.PI / 180;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(tilt);
  ctx.scale(1, 0.26);
  ctx.beginPath();
  if (half === 'back') ctx.arc(0, 0, r * (ring.outerScale || 2.1), Math.PI, Math.PI * 2);
  else ctx.arc(0, 0, r * (ring.outerScale || 2.1), 0, Math.PI);
  ctx.lineWidth = r * ((ring.outerScale || 2.1) - (ring.innerScale || 1.35));
  ctx.strokeStyle = hexA(ring.color || '#e4d2a8', half === 'front' ? 0.85 : 0.5);
  ctx.stroke();
  ctx.restore();
}

/** Sole su canvas, con corona pulsante opzionale. */
export function drawSun(ctx, x, y, r, pulse = 0) {
  const outer = r * (3.2 + pulse * 0.25);
  const corona = ctx.createRadialGradient(x, y, r * 0.8, x, y, outer);
  corona.addColorStop(0, 'rgba(255,190,90,.52)');
  corona.addColorStop(0.35, 'rgba(255,140,50,.18)');
  corona.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = corona;
  ctx.beginPath(); ctx.arc(x, y, outer, 0, Math.PI * 2); ctx.fill();

  const body = ctx.createRadialGradient(x - r * 0.2, y - r * 0.25, r * 0.1, x, y, r);
  body.addColorStop(0, '#fffbe8');
  body.addColorStop(0.55, '#ffc46b');
  body.addColorStop(1, '#f07a12');
  ctx.fillStyle = body;
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
}

/** Luna con fase: 0 = nuova, 0.5 = piena, 1 = nuova. */
export function drawMoonPhase(ctx, cx, cy, r, phase, visual = {}) {
  const base = visual.base || '#b8b3ab';
  const light = visual.light || '#f2efe8';
  const dark = visual.dark || '#171613';

  // disco illuminato
  const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r);
  g.addColorStop(0, light);
  g.addColorStop(0.6, base);
  g.addColorStop(1, '#6d6962');
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  ctx.fillStyle = g; ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

  // mari e crateri: macchie procedurali deterministiche
  const spots = [
    [0.33, 0.24, 0.20], [0.59, 0.29, 0.16], [0.64, 0.43, 0.14],
    [0.17, 0.46, 0.22], [0.82, 0.32, 0.10], [0.45, 0.66, 0.13]
  ];
  ctx.fillStyle = 'rgba(70,68,63,.42)';
  spots.forEach(([sx, sy, sr]) => {
    ctx.beginPath();
    ctx.arc(cx - r + sx * r * 2, cy - r + sy * r * 2, sr * r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = 'rgba(245,242,235,.5)';
  [[0.43, 0.79, 0.045], [0.36, 0.46, 0.035]].forEach(([sx, sy, sr]) => {
    ctx.beginPath();
    ctx.arc(cx - r + sx * r * 2, cy - r + sy * r * 2, sr * r, 0, Math.PI * 2);
    ctx.fill();
  });

  // ombra della fase: terminatore come ellisse che attraversa il disco
  const p = ((phase % 1) + 1) % 1;
  const waxing = p <= 0.5;
  const k = Math.cos(p * Math.PI * 2);   // 1 = nuova, -1 = piena
  ctx.fillStyle = 'rgba(3,5,11,.93)';
  ctx.beginPath();
  if (waxing) {
    ctx.arc(cx, cy, r, Math.PI * 0.5, Math.PI * 1.5, false);          // metà sinistra in ombra
    ctx.ellipse(cx, cy, Math.abs(k) * r, r, 0, Math.PI * 1.5, Math.PI * 0.5, k < 0);
  } else {
    ctx.arc(cx, cy, r, Math.PI * 1.5, Math.PI * 0.5, false);          // metà destra in ombra
    ctx.ellipse(cx, cy, Math.abs(k) * r, r, 0, Math.PI * 0.5, Math.PI * 1.5, k > 0);
  }
  ctx.fill();
  ctx.restore();

  // bordo tenue
  ctx.strokeStyle = 'rgba(233,240,255,.14)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
}

/** "#rrggbb" + alpha -> rgba() */
export function hexA(hex, alpha) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
