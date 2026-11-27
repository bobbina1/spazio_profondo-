/**
 * SPAZIO PROFONDO — simulazioni animate dei fenomeni
 *
 * Tutte le simulazioni sono schematiche e non in scala: servono a far
 * capire il meccanismo, non a riprodurre proporzioni reali. Ogni scheda
 * in pagina lo dichiara esplicitamente.
 *
 * API: createSimulation(canvas, mode) -> { start, stop, destroy }
 * Con `prefers-reduced-motion` viene disegnato un solo fotogramma statico.
 */

import { fitCanvas, prefersReducedMotion } from '../core/dom.js';
import { drawPlanet, drawSun, hexA } from './planet.js';

const TAU = Math.PI * 2;

/* ============================================================
   Singole simulazioni: (ctx, t, s) con t in secondi
   ============================================================ */

const MODES = {
  /* --- Eclissi di Sole ------------------------------------- */
  'eclipse-solar': {
    label: 'Eclissi di Sole: la Luna proietta la propria ombra sulla Terra',
    draw(ctx, t, s) {
      const { w, h } = s;
      const sunR = Math.min(w, h) * 0.13;
      const sx = w * 0.12, sy = h * 0.5;
      const ex = w * 0.86, ey = h * 0.5;
      const earthR = Math.min(w, h) * 0.11;
      drawSun(ctx, sx, sy, sunR, 0.5 + 0.5 * Math.sin(t * 1.4));

      // Luna in transito lungo la congiungente
      const prog = (Math.sin(t * 0.42) + 1) / 2;
      const mx = sx + (ex - sx) * 0.62;
      const my = sy + (prog - 0.5) * h * 0.52;
      const moonR = earthR * 0.27;

      // cono d'ombra
      ctx.save();
      const grad = ctx.createLinearGradient(mx, my, ex, ey);
      grad.addColorStop(0, 'rgba(3,5,11,.85)');
      grad.addColorStop(1, 'rgba(3,5,11,.12)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(mx, my - moonR);
      ctx.lineTo(ex + earthR, ey - moonR * 0.35);
      ctx.lineTo(ex + earthR, ey + moonR * 0.35);
      ctx.lineTo(mx, my + moonR);
      ctx.closePath(); ctx.fill();
      ctx.restore();

      drawPlanet(ctx, ex, ey, earthR, { base: '#2f7ad6', light: '#bfe4ff', dark: '#06203f' });
      // macchia d'ombra sulla Terra quando l'allineamento è stretto
      const align = 1 - Math.min(1, Math.abs(my - ey) / (h * 0.16));
      if (align > 0) {
        ctx.fillStyle = `rgba(3,5,11,${0.8 * align})`;
        ctx.beginPath();
        ctx.ellipse(ex - earthR * 0.75, ey + (my - ey) * 0.5, earthR * 0.2 * align, earthR * 0.34 * align, 0, 0, TAU);
        ctx.fill();
      }
      drawPlanet(ctx, mx, my, moonR, { base: '#b8b3ab', light: '#f2efe8', dark: '#2a2823', bands: false });

      label(ctx, s, [[sx, sy + sunR + 18, 'Sole'], [mx, my + moonR + 16, 'Luna'], [ex, ey + earthR + 18, 'Terra']]);
      if (align > 0.82) banner(ctx, s, 'Allineamento: eclissi in corso');
    }
  },

  /* --- Eclissi di Luna ------------------------------------- */
  'eclipse-lunar': {
    label: 'Eclissi di Luna: il satellite entra nel cono d\'ombra terrestre',
    draw(ctx, t, s) {
      const { w, h } = s;
      const sunR = Math.min(w, h) * 0.1;
      drawSun(ctx, w * 0.1, h * 0.5, sunR, 0.5);
      const ex = w * 0.42, ey = h * 0.5, earthR = Math.min(w, h) * 0.13;

      // cono d'ombra della Terra
      ctx.save();
      const g = ctx.createLinearGradient(ex, ey, w, ey);
      g.addColorStop(0, 'rgba(3,5,11,.9)'); g.addColorStop(1, 'rgba(3,5,11,.1)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ex, ey - earthR); ctx.lineTo(w, ey - earthR * 0.32);
      ctx.lineTo(w, ey + earthR * 0.32); ctx.lineTo(ex, ey + earthR);
      ctx.closePath(); ctx.fill();
      ctx.restore();

      drawPlanet(ctx, ex, ey, earthR, { base: '#2f7ad6', light: '#bfe4ff', dark: '#06203f' });

      // Luna che attraversa l'ombra
      const prog = (Math.sin(t * 0.33) + 1) / 2;
      const mx = w * 0.56 + prog * w * 0.36;
      const inShadow = 1 - Math.min(1, Math.abs(mx - w * 0.74) / (w * 0.14));
      const tint = inShadow > 0.2
        ? { base: `rgb(${150 + 60 * (1 - inShadow)},${70 * (1 - inShadow) + 30},${28})`, light: '#e8a07a', dark: '#2a0f08' }
        : { base: '#b8b3ab', light: '#f2efe8', dark: '#2a2823' };
      drawPlanet(ctx, mx, ey, earthR * 0.27, { ...tint, bands: false });

      label(ctx, s, [[ex, ey + earthR + 18, 'Terra'], [mx, ey + earthR * 0.27 + 16, 'Luna']]);
      if (inShadow > 0.6) banner(ctx, s, 'Nell\'ombra la Luna appare rossastra, non invisibile');
    }
  },

  /* --- Pioggia meteorica ----------------------------------- */
  meteors: {
    label: 'Pioggia meteorica: le scie divergono dal radiante per prospettiva',
    init(s) {
      s.meteors = Array.from({ length: 26 }, () => spawnMeteor(s, Math.random()));
      s.radiant = { x: s.w * 0.68, y: s.h * 0.26 };
    },
    draw(ctx, t, s, dt) {
      const { w, h } = s;
      // orizzonte
      ctx.fillStyle = 'rgba(8,12,24,.92)';
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h * 0.84);
      for (let x = 0; x <= w; x += w / 10) {
        ctx.lineTo(x, h * 0.84 + Math.sin(x * 0.012) * h * 0.02);
      }
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill();

      const r = s.radiant;
      ctx.fillStyle = hexA('#5ee7e0', 0.5);
      ctx.beginPath(); ctx.arc(r.x, r.y, 3, 0, TAU); ctx.fill();
      ctx.strokeStyle = hexA('#5ee7e0', 0.18);
      ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.arc(r.x, r.y, 26, 0, TAU); ctx.stroke();
      ctx.setLineDash([]);
      text(ctx, 'radiante', r.x + 32, r.y + 4, '#5ee7e0', 10);

      for (const m of s.meteors) {
        m.p += m.speed * (dt || 0.016);
        if (m.p > 1) Object.assign(m, spawnMeteor(s, 0));
        const x = r.x + Math.cos(m.angle) * m.dist * m.p;
        const y = r.y + Math.sin(m.angle) * m.dist * m.p;
        const tailLen = m.len * Math.min(1, m.p * 3);
        const tx = x - Math.cos(m.angle) * tailLen;
        const ty = y - Math.sin(m.angle) * tailLen;
        const fade = m.p < 0.12 ? m.p / 0.12 : (1 - m.p) / 0.88;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, hexA(m.color, 0));
        grad.addColorStop(1, hexA(m.color, 0.9 * fade));
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
      }
    }
  },

  /* --- Congiunzione planetaria ----------------------------- */
  conjunction: {
    label: 'Congiunzione: vicinanza apparente, non reale',
    draw(ctx, t, s) {
      const { w, h } = s;
      ctx.fillStyle = 'rgba(8,12,24,.9)';
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      ctx.strokeStyle = hexA('#4da3ff', 0.2);
      ctx.beginPath(); ctx.moveTo(0, h * 0.72); ctx.lineTo(w, h * 0.72); ctx.stroke();
      text(ctx, 'cielo visto da Terra', 14, 22, '#7a8caa', 10);

      const sep = (Math.cos(t * 0.3) + 1) / 2;          // 1 = separati, 0 = congiunti
      const cx = w * 0.5, cy = h * 0.42;
      const vx = cx - sep * w * 0.2, jx = cx + sep * w * 0.2;
      drawPlanet(ctx, vx, cy, 11, { base: '#d9a85f', light: '#fbe7bd', dark: '#6b4a1c' }, { glow: 0.9 });
      drawPlanet(ctx, jx, cy + 6, 14, { base: '#c9a177', light: '#f4dfc2', dark: '#5a3a1f' }, { glow: 0.6 });
      text(ctx, 'Venere', vx - 16, cy - 20, '#fbe7bd', 10);
      text(ctx, 'Giove', jx - 14, cy - 22, '#f4dfc2', 10);

      // inserto: vista dall'alto, le distanze reali non cambiano
      const bx = w - 128, by = h - 96;
      ctx.fillStyle = 'rgba(3,5,11,.72)';
      ctx.strokeStyle = hexA('#4da3ff', 0.25);
      roundRect(ctx, bx, by, 116, 82, 8); ctx.fill(); ctx.stroke();
      text(ctx, 'vista dall\'alto', bx + 8, by + 14, '#7a8caa', 9);
      drawSun(ctx, bx + 16, by + 52, 5, 0);
      ctx.fillStyle = '#fbe7bd';
      ctx.beginPath(); ctx.arc(bx + 42, by + 44, 3, 0, TAU); ctx.fill();
      ctx.fillStyle = '#f4dfc2';
      ctx.beginPath(); ctx.arc(bx + 96, by + 60, 4.5, 0, TAU); ctx.fill();
      ctx.strokeStyle = hexA('#ff6b7f', 0.6);
      ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(bx + 42, by + 44); ctx.lineTo(bx + 96, by + 60); ctx.stroke();
      ctx.setLineDash([]);
      text(ctx, 'centinaia di milioni di km', bx + 6, by + 76, '#ff9fae', 8);
      if (sep < 0.14) banner(ctx, s, 'Congiunzione: i due pianeti appaiono vicini in cielo');
    }
  },

  /* --- Tempesta solare ------------------------------------- */
  'solar-storm': {
    label: 'Espulsione di massa coronale verso la Terra e magnetosfera',
    init(s) { s.cme = 0; },
    draw(ctx, t, s, dt) {
      const { w, h } = s;
      const sx = w * 0.08, sy = h * 0.5, sunR = Math.min(w, h) * 0.17;
      drawSun(ctx, sx, sy, sunR, (Math.sin(t * 2.6) + 1) / 2);

      s.cme = (s.cme + (dt || 0.016) * 0.22) % 1.25;
      const ex = w * 0.82, ey = h * 0.5, earthR = Math.min(w, h) * 0.075;

      // nube di plasma in espansione
      if (s.cme < 1.1) {
        const px = sx + (ex - sx) * s.cme;
        const spread = sunR * (0.5 + s.cme * 2.4);
        const g = ctx.createRadialGradient(px, sy, 0, px, sy, spread);
        g.addColorStop(0, hexA('#ffb648', 0.34 * (1 - s.cme * 0.6)));
        g.addColorStop(0.6, hexA('#ff7a3c', 0.16 * (1 - s.cme * 0.6)));
        g.addColorStop(1, hexA('#ff7a3c', 0));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.ellipse(px, sy, spread * 0.7, spread, 0, 0, TAU); ctx.fill();
      }

      // magnetosfera: compressa sul lato diurno, allungata su quello notturno
      const hit = s.cme > 0.88 && s.cme < 1.1;
      ctx.strokeStyle = hexA(hit ? '#5ee7e0' : '#4da3ff', hit ? 0.8 : 0.4);
      ctx.lineWidth = hit ? 2 : 1.2;
      for (let i = 1; i <= 3; i++) {
        const k = earthR * (1.7 + i * 0.75) * (hit ? 0.82 : 1);
        ctx.beginPath();
        ctx.moveTo(ex - k * 0.9, ey);
        ctx.bezierCurveTo(ex - k * 0.8, ey - k, ex + k * 1.4, ey - k * 1.1, ex + k * 2.6, ey - k * 0.5);
        ctx.moveTo(ex - k * 0.9, ey);
        ctx.bezierCurveTo(ex - k * 0.8, ey + k, ex + k * 1.4, ey + k * 1.1, ex + k * 2.6, ey + k * 0.5);
        ctx.stroke();
      }
      drawPlanet(ctx, ex, ey, earthR, { base: '#2f7ad6', light: '#bfe4ff', dark: '#06203f' });
      label(ctx, s, [[sx + sunR * 0.4, sy + sunR + 16, 'Sole'], [ex, ey + earthR + 20, 'Terra']]);
      if (hit) banner(ctx, s, 'Impatto sulla magnetosfera: tempesta geomagnetica');
      else text(ctx, 'da 1 a 3 giorni di viaggio', w * 0.3, h * 0.2, '#7a8caa', 10);
    }
  },

  /* --- Aurora ---------------------------------------------- */
  aurora: {
    label: 'Aurora: ossigeno e azoto eccitati fra 100 e 300 km di quota',
    draw(ctx, t, s) {
      const { w, h } = s;
      for (let band = 0; band < 3; band++) {
        const baseY = h * (0.3 + band * 0.07);
        const amp = h * (0.05 + band * 0.015);
        const colorTop = band === 0 ? '#ff6b9f' : '#5ee7e0';
        const colorBottom = band === 0 ? 'rgba(255,107,159,0)' : 'rgba(81,216,138,0)';
        ctx.beginPath();
        ctx.moveTo(-10, h * 0.78);
        for (let x = -10; x <= w + 10; x += 8) {
          const y = baseY
            + Math.sin(x * 0.012 + t * 0.7 + band) * amp
            + Math.sin(x * 0.031 - t * 0.45 + band * 2) * amp * 0.45;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w + 10, h * 0.78);
        ctx.closePath();
        const g = ctx.createLinearGradient(0, baseY - amp, 0, h * 0.78);
        g.addColorStop(0, hexA(colorTop, 0.32));
        g.addColorStop(0.45, hexA('#51d88a', 0.3));
        g.addColorStop(1, colorBottom);
        ctx.fillStyle = g; ctx.fill();
      }
      // silhouette del terreno
      ctx.fillStyle = '#04060d';
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, h * 0.8);
      for (let x = 0; x <= w; x += w / 14) {
        ctx.lineTo(x, h * 0.8 - Math.abs(Math.sin(x * 0.02)) * h * 0.06);
      }
      ctx.lineTo(w, h); ctx.closePath(); ctx.fill();
      text(ctx, 'verde: ossigeno a 100-150 km', 14, h - 30, '#9fe9c0', 10);
      text(ctx, 'rosso: ossigeno a quote più alte', 14, h - 16, '#ffa8c4', 10);
    }
  },

  /* --- Supernova ------------------------------------------- */
  supernova: {
    label: 'Collasso del nucleo ed espansione del resto di supernova',
    init(s) { s.cycle = 0; },
    draw(ctx, t, s, dt) {
      const { w, h } = s;
      const cx = w * 0.5, cy = h * 0.5;
      s.cycle = (s.cycle + (dt || 0.016) * 0.16) % 1;
      const p = s.cycle;

      if (p < 0.3) {                       // stella instabile
        const pulse = 1 + Math.sin(t * 7) * 0.07 * (p / 0.3);
        drawPlanet(ctx, cx, cy, Math.min(w, h) * 0.1 * pulse,
          { base: '#9fb6ff', light: '#ffffff', dark: '#2a3f80', bands: false }, { glow: 1.2 });
        text(ctx, 'nucleo che esaurisce il combustibile', cx - 95, cy + h * 0.2, '#9fb6ff', 10);
      } else if (p < 0.42) {               // collasso e lampo
        const f = (p - 0.3) / 0.12;
        const r = Math.min(w, h) * (0.1 - 0.07 * f);
        const flash = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * (0.1 + f * 0.9));
        flash.addColorStop(0, hexA('#ffffff', 0.95 * (1 - f * 0.3)));
        flash.addColorStop(0.3, hexA('#9fd4ff', 0.5 * (1 - f)));
        flash.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = flash; ctx.fillRect(0, 0, w, h);
        drawPlanet(ctx, cx, cy, Math.max(2, r), { base: '#ffffff', light: '#fff', dark: '#cfe3ff', bands: false });
        text(ctx, 'la maggior parte dell\'energia esce come neutrini', cx - 130, cy + h * 0.26, '#cfe3ff', 10);
      } else {                             // resto in espansione
        const f = (p - 0.42) / 0.58;
        const r = Math.min(w, h) * (0.08 + f * 0.46);
        for (let i = 0; i < 3; i++) {
          const rr = r * (1 - i * 0.12);
          const g = ctx.createRadialGradient(cx, cy, rr * 0.55, cx, cy, rr);
          g.addColorStop(0, hexA(['#ff8f5e', '#ffd98a', '#5ee7e0'][i], 0.03));
          g.addColorStop(0.75, hexA(['#ff8f5e', '#ffd98a', '#5ee7e0'][i], 0.22 * (1 - f)));
          g.addColorStop(1, hexA('#ff8f5e', 0));
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(cx, cy, rr, 0, TAU); ctx.fill();
        }
        ctx.fillStyle = hexA('#ffffff', 0.9 * (1 - f * 0.5));
        ctx.beginPath(); ctx.arc(cx, cy, 2.6, 0, TAU); ctx.fill();
        text(ctx, 'resta una stella di neutroni o un buco nero', cx - 120, cy + h * 0.32, '#ffd98a', 10);
      }
    }
  },

  /* --- Onde gravitazionali --------------------------------- */
  gravwaves: {
    label: 'Due masse compatte in spirale: lo spaziotempo vibra',
    init(s) { s.waves = []; s.spin = 0; s.sep = 1; s.emit = 0; },
    draw(ctx, t, s, dt) {
      const { w, h } = s;
      const cx = w * 0.5, cy = h * 0.5;
      const step = dt || 0.016;
      s.sep -= step * 0.085;
      if (s.sep < 0.18) { s.sep = 1; s.waves.length = 0; }
      s.spin += step * (1.6 + (1 - s.sep) * 9);

      // onde emesse periodicamente, frequenza crescente
      s.emit += step;
      if (s.emit > Math.max(0.1, s.sep * 0.5)) {
        s.emit = 0;
        s.waves.push({ r: Math.min(w, h) * 0.06, amp: 1, freq: 2 + (1 - s.sep) * 6 });
      }
      s.waves = s.waves.filter((wv) => {
        wv.r += step * Math.min(w, h) * 0.26;
        wv.amp -= step * 0.34;
        if (wv.amp <= 0) return false;
        ctx.strokeStyle = hexA('#9a7bff', wv.amp * 0.5);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let a = 0; a <= TAU + 0.1; a += 0.09) {
          const rr = wv.r * (1 + 0.05 * Math.sin(a * wv.freq));
          const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * 0.72;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
        return true;
      });

      const d = Math.min(w, h) * 0.2 * s.sep;
      [0, Math.PI].forEach((off, i) => {
        const x = cx + Math.cos(s.spin + off) * d;
        const y = cy + Math.sin(s.spin + off) * d * 0.72;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 13);
        g.addColorStop(0, '#000'); g.addColorStop(0.55, '#0b0f1d');
        g.addColorStop(1, hexA(i ? '#5ee7e0' : '#9a7bff', 0.7));
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, 11, 0, TAU); ctx.fill();
      });
      text(ctx, s.sep < 0.3 ? 'fusione: picco di emissione' : 'spirale di avvicinamento', 14, 22, '#cfbcff', 10);
    }
  },

  /* --- Buco nero ------------------------------------------- */
  blackhole: {
    label: 'Disco di accrescimento e ombra dell\'orizzonte degli eventi',
    draw(ctx, t, s) {
      const { w, h } = s;
      const cx = w * 0.5, cy = h * 0.5;
      const R = Math.min(w, h) * 0.12;

      // disco: anelli con luminosità asimmetrica (effetto relativistico)
      for (let i = 0; i < 70; i++) {
        const rr = R * (1.6 + i * 0.045);
        const a0 = t * (1.4 - i * 0.012);
        ctx.beginPath();
        for (let a = 0; a <= TAU + 0.1; a += 0.14) {
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr * 0.26;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const boost = 0.5 + 0.5 * Math.cos(a0);
        ctx.strokeStyle = hexA(i < 24 ? '#fff3c4' : i < 48 ? '#ffb648' : '#ff7a3c',
          (0.1 + boost * 0.16) * (1 - i / 80));
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // anello di fotoni
      ctx.strokeStyle = hexA('#ffe9b0', 0.75);
      ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, TAU); ctx.stroke();
      // ombra
      const g = ctx.createRadialGradient(cx, cy, R * 0.6, cx, cy, R * 1.5);
      g.addColorStop(0, '#000'); g.addColorStop(0.86, '#000');
      g.addColorStop(1, 'rgba(0,0,0,.2)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.5, 0, TAU); ctx.fill();
      text(ctx, 'l\'ombra osservata è più grande dell\'orizzonte: la gravità devia la luce', 14, h - 16, '#7a8caa', 10);
    }
  },

  /* --- Espansione dell'universo ---------------------------- */
  expansion: {
    label: 'Espansione: è lo spazio fra le galassie che si dilata',
    init(s) {
      s.gal = [];
      const n = 7;
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        s.gal.push({ gx: (i / (n - 1) - 0.5), gy: (j / (n - 1) - 0.5), r: 2 + Math.random() * 3, a: 0.35 + Math.random() * 0.5 });
      }
    },
    draw(ctx, t, s) {
      const { w, h } = s;
      const cx = w * 0.5, cy = h * 0.5;
      const scale = 1 + ((t * 0.11) % 1) * 0.85;
      const span = Math.min(w, h) * 0.86;

      // griglia che si dilata con lo spazio
      ctx.strokeStyle = hexA('#4da3ff', 0.1);
      ctx.lineWidth = 1;
      for (let k = -3; k <= 3; k++) {
        const p = (k / 6) * span * scale;
        ctx.beginPath(); ctx.moveTo(cx + p, cy - span * scale * 0.5); ctx.lineTo(cx + p, cy + span * scale * 0.5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx - span * scale * 0.5, cy + p); ctx.lineTo(cx + span * scale * 0.5, cy + p); ctx.stroke();
      }
      for (const g of s.gal) {
        const x = cx + g.gx * span * scale;
        const y = cy + g.gy * span * scale;
        if (x < -10 || x > w + 10 || y < -10 || y > h + 10) continue;
        const dist = Math.hypot(g.gx, g.gy);
        // più lontane = più spostate verso il rosso
        const col = dist > 0.34 ? '#ff8f8f' : dist > 0.18 ? '#ffd98a' : '#cfe3ff';
        ctx.fillStyle = hexA(col, g.a);
        ctx.beginPath(); ctx.ellipse(x, y, g.r * 1.6, g.r * 0.7, dist * 3, 0, TAU); ctx.fill();
      }
      ctx.fillStyle = hexA('#5ee7e0', 0.9);
      ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, TAU); ctx.fill();
      text(ctx, 'ogni osservatore vede le altre galassie allontanarsi: nessun centro', 14, h - 16, '#7a8caa', 10);
    }
  }
};

/* ============================================================
   Helper di disegno
   ============================================================ */
function spawnMeteor(s, p) {
  const angle = Math.PI * (0.18 + Math.random() * 0.74);
  return {
    angle, p,
    dist: Math.min(s.w, s.h) * (0.5 + Math.random() * 0.9),
    speed: 0.35 + Math.random() * 0.55,
    len: 18 + Math.random() * 54,
    width: 0.8 + Math.random() * 1.5,
    color: Math.random() < 0.18 ? '#9fd4ff' : Math.random() < 0.3 ? '#ffd98a' : '#ffffff'
  };
}

function text(ctx, str, x, y, color = '#7a8caa', size = 10) {
  ctx.font = `${size}px ui-monospace, "SF Mono", monospace`;
  ctx.fillStyle = color;
  ctx.fillText(str, x, y);
}

function label(ctx, s, items) {
  ctx.textAlign = 'center';
  items.forEach(([x, y, str]) => text(ctx, str.toUpperCase(), x, y, '#a7b8d6', 9));
  ctx.textAlign = 'start';
}

function banner(ctx, s, str) {
  ctx.textAlign = 'center';
  ctx.font = '11px ui-monospace, "SF Mono", monospace';
  const width = ctx.measureText(str).width + 24;
  ctx.fillStyle = 'rgba(77,163,255,.14)';
  roundRect(ctx, s.w / 2 - width / 2, 12, width, 24, 12); ctx.fill();
  ctx.fillStyle = '#c8e0ff';
  ctx.fillText(str, s.w / 2, 28);
  ctx.textAlign = 'start';
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ============================================================
   Factory
   ============================================================ */
export function createSimulation(canvas, mode, { height = 260 } = {}) {
  const def = MODES[mode] || MODES.expansion;
  const state = { w: 0, h: 0 };
  let ctx, raf = null, last = 0, t0 = 0, alive = true;

  function size() {
    const rect = canvas.parentElement?.getBoundingClientRect();
    state.w = Math.max(240, Math.round(rect?.width || canvas.clientWidth || 320));
    state.h = height;
    ctx = fitCanvas(canvas, state.w, state.h);
    def.init?.(state);
  }

  function render(nowMs) {
    if (!alive) return;
    const now = nowMs / 1000;
    const dt = last ? Math.min(0.05, now - last) : 0.016;
    last = now;
    ctx.clearRect(0, 0, state.w, state.h);
    def.draw(ctx, now - t0, state, dt);
    raf = requestAnimationFrame(render);
  }

  function start() {
    size();
    if (prefersReducedMotion()) {   // un solo fotogramma, nessuna animazione
      ctx.clearRect(0, 0, state.w, state.h);
      def.draw(ctx, 1.6, state, 0.016);
      return;
    }
    t0 = performance.now() / 1000;
    last = 0;
    raf = requestAnimationFrame(render);
  }

  function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }

  let resizeTimer;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { stop(); start(); }, 180);
  };
  window.addEventListener('resize', onResize);

  return {
    start, stop,
    label: def.label,
    destroy() { alive = false; stop(); window.removeEventListener('resize', onResize); }
  };
}

export const simulationModes = Object.keys(MODES);
