// LE GRAND DÉFI CANIN — Canidés By Cruz
import { CONFIG, CATEGORIES, NIVEAUX, QUESTIONS } from './contenu.js';
import { melanger, tirerPartie, niveauPour } from './logic.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const mouvementReduit = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const echapper = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// ---------------------------------------------------------------------------
// Icônes (style Lucide, intégrées pour fonctionner hors ligne)
// ---------------------------------------------------------------------------
const ICONES = {
  paw: '<g fill="currentColor" stroke="none"><ellipse cx="5.5" cy="9.5" rx="2" ry="2.6"/><ellipse cx="9.5" cy="5.6" rx="2" ry="2.6"/><ellipse cx="14.5" cy="5.6" rx="2" ry="2.6"/><ellipse cx="18.5" cy="9.5" rx="2" ry="2.6"/><path d="M12 11c-3 0-6 3.6-6 6.3 0 2 1.6 2.9 3.2 2.9 1.2 0 1.8-.6 2.8-.6s1.6.6 2.8.6c1.6 0 3.2-.9 3.2-2.9 0-2.7-3-6.3-6-6.3z"/></g>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  message: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.6 1.3c0 1.7-2.1 2-2.1 3.2"/><path d="M12 17h.01"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  delete: '<path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"/><path d="m18 9-6 6"/><path d="m12 9 6 6"/>',
};
const icone = (nom) =>
  `<svg class="icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[nom]}</svg>`;

// Illustration du chien (accueil, remplacement des photos manquantes, inactivité)
const CHIEN = `<svg class="chien" viewBox="0 0 200 200" role="img" aria-label="Illustration d'un chien souriant">
  <path d="M64 148 Q100 166 136 148 L100 194 Z" fill="#BD4E41"/>
  <circle cx="100" cy="176" r="5" fill="#FACCA1"/>
  <g class="tete">
    <path d="M60 60 C36 56 18 92 27 124 C32 146 53 147 61 128 C67 112 71 88 73 74 Z" fill="#7A5236"/>
    <path class="oreille-d" d="M140 60 C164 56 182 92 173 124 C168 146 147 147 139 128 C133 112 129 88 127 74 Z" fill="#7A5236"/>
    <ellipse cx="100" cy="100" rx="50" ry="54" fill="#D8A46A"/>
    <path d="M100 47 C89 47 85 70 89 92 C92 104 108 104 111 92 C115 70 111 47 100 47Z" fill="#F4E6CF"/>
    <ellipse cx="100" cy="128" rx="32" ry="24" fill="#F4E6CF"/>
    <circle cx="66" cy="122" r="7" fill="#E89A8E" opacity=".35"/>
    <circle cx="134" cy="122" r="7" fill="#E89A8E" opacity=".35"/>
    <g class="yeux">
      <ellipse cx="78" cy="98" rx="7" ry="8" fill="#2A2420"/><ellipse cx="122" cy="98" rx="7" ry="8" fill="#2A2420"/>
      <circle cx="80.5" cy="95" r="2.4" fill="#fff"/><circle cx="124.5" cy="95" r="2.4" fill="#fff"/>
    </g>
    <path d="M90 116 Q100 110 110 116 Q110 124 100 127 Q90 124 90 116Z" fill="#2A2420"/>
    <path d="M93 138 Q100 156 107 138 Z" fill="#E87F86"/>
    <path d="M100 127 V134 M100 134 Q91 142 84 136 M100 134 Q109 142 116 136" stroke="#2A2420" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
</svg>`;

// ---------------------------------------------------------------------------
// Stockage local (statistiques + réglages) — jamais de données personnelles
// ---------------------------------------------------------------------------
const CLE_STATS = 'gdc-stats-v1';
const CLE_REGLAGES = 'gdc-reglages-v1';
const lire = (cle, defaut) => { try { return JSON.parse(localStorage.getItem(cle)) ?? defaut; } catch { return defaut; } };
const ecrire = (cle, val) => { try { localStorage.setItem(cle, JSON.stringify(val)); } catch { /* stockage indisponible : le jeu continue */ } };

const statsVides = () => ({ terminees: 0, abandons: 0, totalScores: 0, meilleur: 0, scores: {}, questions: {} });
const stats = () => ({ ...statsVides(), ...lire(CLE_STATS, {}) });
function majStats(fn) { const s = stats(); fn(s); ecrire(CLE_STATS, s); }

const reglages = () => ({ inactivite: CONFIG.inactiviteSecondes, ...lire(CLE_REGLAGES, {}) });

// ---------------------------------------------------------------------------
// Navigation entre écrans
// ---------------------------------------------------------------------------
let ecranCourant = 'ecran-accueil';
function afficher(id) {
  ecranCourant = id;
  for (const e of $$('.ecran')) {
    e.classList.toggle('actif', e.id === id);
    e.toggleAttribute('inert', e.id !== id);
  }
  $('#' + id).scrollTop = 0;
  relancerMinuteur();
}

// ---------------------------------------------------------------------------
// Partie
// ---------------------------------------------------------------------------
let partie = null;

function demarrer() {
  partie = { questions: tirerPartie(QUESTIONS, CONFIG.repartition), index: 0, score: 0, ratees: [], verrou: false };
  $('#q-score').textContent = '0';
  majProgression(0);
  afficherQuestion();
  afficher('ecran-question');
}

function majProgression(fraction) {
  $('#progression-barre').style.width = `${fraction * 100}%`;
  $('#progression').setAttribute('aria-valuenow', Math.round(fraction * 100));
}

function afficherQuestion() {
  const q = partie.questions[partie.index];
  const total = partie.questions.length;
  const cat = CATEGORIES[q.cat];
  const ordre = q.vf ? q.choix.map((_, i) => i) : melanger(q.choix.map((_, i) => i));

  $('#q-numero').textContent = `Question ${partie.index + 1}/${total}`;
  majProgression(partie.index / total);

  $('#q-corps').innerHTML = `
    <article class="q-carte ${q.image ? 'avec-image' : ''}">
      <div class="q-gauche">
        <span class="categorie cat-${q.cat}">${icone(cat.icone)} ${cat.nom}</span>
        <h2 class="q-texte">${echapper(q.texte)}</h2>
        ${q.image ? `<figure class="q-image"><img alt="${echapper(q.image.alt)}"></figure>` : ''}
      </div>
      <div class="q-droite">
        <div class="reponses ${q.vf ? 'vf' : ''}" role="group" aria-label="Propositions de réponse">
          ${ordre.map((i, pos) => `
            <button class="reponse" data-choix="${i}" style="--i:${pos}">
              ${q.vf ? '' : `<span class="lettre">${'ABCD'[pos]}</span>`}
              <span class="libelle">${echapper(q.choix[i])}</span>
            </button>`).join('')}
        </div>
        <div class="feedback" hidden></div>
      </div>
    </article>`;

  if (q.image) chargerImageQuestion($('.q-image'), q.image);
  $('#ecran-question').scrollTop = 0;
}

// Image de la question, ou illustration de remplacement si le fichier manque
function chargerImageQuestion(figure, image) {
  const img = $('img', figure);
  img.onerror = () => {
    figure.classList.add('repli');
    figure.innerHTML = `${CHIEN}<figcaption><small>La scène</small>${echapper(image.alt)}</figcaption>`;
  };
  img.src = image.src;
}

const TITRES_OK = ['Bien vu !', 'Exactement !', 'Bravo !', 'Tout juste !'];
const TITRES_KO = ['Pas tout à fait…', 'Pas cette fois…', 'Bonne piste à creuser…'];
const auHasard = (l) => l[Math.floor(Math.random() * l.length)];

function repondre(bouton) {
  if (!partie || partie.verrou) return;
  partie.verrou = true;

  const q = partie.questions[partie.index];
  const juste = Number(bouton.dataset.choix) === q.bonne;
  const zone = bouton.parentElement;
  zone.classList.add('verrouille');
  bouton.classList.add('choisie');

  if (juste) partie.score += CONFIG.pointsParBonneReponse;
  else partie.ratees.push(q);
  majStats((s) => {
    const st = (s.questions[q.id] ??= { vues: 0, bonnes: 0 });
    st.vues++;
    if (juste) st.bonnes++;
  });
  majProgression((partie.index + 1) / partie.questions.length);

  setTimeout(() => {
    for (const b of $$('.reponse', zone)) {
      const i = Number(b.dataset.choix);
      if (i === q.bonne) {
        b.classList.add('correcte');
        b.insertAdjacentHTML('beforeend', `<span class="etat">${icone('check')}</span>`);
      } else if (b === bouton) {
        b.classList.add('incorrecte');
        b.insertAdjacentHTML('beforeend', `<span class="etat">${icone('x')}</span>`);
      } else {
        b.classList.add('estompee');
      }
    }
    if (juste) {
      const sc = $('#q-score');
      sc.textContent = partie.score;
      sc.parentElement.classList.remove('bump');
      void sc.offsetWidth;
      sc.parentElement.classList.add('bump');
    }
    afficherExplication(q, juste);
  }, mouvementReduit() ? 0 : 300);
}

function afficherExplication(q, juste) {
  const dernier = partie.index === partie.questions.length - 1;
  const fb = $('.feedback');
  fb.className = `feedback ${juste ? 'ok' : 'ko'}`;
  fb.innerHTML = `
    <div class="feedback-titre">${icone(juste ? 'sparkles' : 'lightbulb')} ${juste ? auHasard(TITRES_OK) : auHasard(TITRES_KO)}</div>
    ${juste ? '' : `<p class="feedback-reponse">La réponse attendue : <strong>${echapper(q.choix[q.bonne])}</strong></p>`}
    <p>${echapper(q.explication)}</p>
    <button class="btn btn-principal" data-action="suivant">${dernier ? 'Voir mon résultat' : 'Question suivante'} ${icone('arrow')}</button>`;
  fb.hidden = false;
  requestAnimationFrame(() => $('[data-action="suivant"]', fb).scrollIntoView({ behavior: mouvementReduit() ? 'auto' : 'smooth', block: 'nearest' }));
}

function suivante() {
  if (!partie) return;
  partie.index++;
  partie.verrou = false;
  if (partie.index >= partie.questions.length) terminer();
  else afficherQuestion();
}

function terminer() {
  const { score, ratees } = partie;
  partie = null;
  majStats((s) => {
    s.terminees++;
    s.totalScores += score;
    s.meilleur = Math.max(s.meilleur, score);
    s.scores[score] = (s.scores[score] ?? 0) + 1;
  });
  afficherResultat(score, ratees);
}

function abandonner() {
  if (partie) majStats((s) => { s.abandons++; });
  partie = null;
}

// ---------------------------------------------------------------------------
// Résultat
// ---------------------------------------------------------------------------
function medaille(couleur) {
  return `<svg viewBox="0 0 200 210" role="img" aria-label="Médaille">
    <path d="M62 120 L40 200 L66 188 L80 208 L100 132 Z" fill="${couleur}" opacity=".75"/>
    <path d="M138 120 L160 200 L134 188 L120 208 L100 132 Z" fill="${couleur}" opacity=".75"/>
    <circle cx="100" cy="88" r="70" fill="${couleur}"/>
    <circle cx="100" cy="88" r="70" fill="url(#brillance)"/>
    <circle cx="100" cy="88" r="54" fill="#fff" opacity=".93"/>
    <circle cx="100" cy="88" r="54" fill="none" stroke="${couleur}" stroke-width="3" stroke-dasharray="4 7" opacity=".6"/>
    <g transform="translate(66 54) scale(2.85)" color="${couleur}">${ICONES.paw}</g>
    <defs><linearGradient id="brillance" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".12"/>
    </linearGradient></defs>
  </svg>`;
}

function afficherResultat(score, ratees) {
  const niveau = niveauPour(score, NIVEAUX);
  $('#medaille').innerHTML = medaille(niveau.couleur);
  $('#res-niveau').textContent = niveau.nom;
  $('#res-message').textContent = niveau.message;

  const conseil = $('#res-conseil');
  conseil.hidden = ratees.length === 0;
  if (ratees.length) {
    const q = auHasard(ratees);
    $('#conseil-q').textContent = q.texte;
    $('#conseil-t').textContent = q.explication;
  }

  // Rejoue les animations d'entrée à chaque partie
  $$('#ecran-resultat .res-principal > *, #ecran-resultat .res-cote').forEach((el) => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });

  afficher('ecran-resultat');
  compter($('#res-score'), score);
  if (score >= 70 && !mouvementReduit()) setTimeout(confettis, 600);
}

function compter(el, cible) {
  if (mouvementReduit() || cible === 0) { el.textContent = cible; return; }
  const debut = performance.now();
  const duree = 1300;
  const pas = (t) => {
    const p = Math.min(1, (t - debut) / duree);
    el.textContent = Math.round(cible * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(pas);
  };
  requestAnimationFrame(pas);
}

function confettis() {
  const canvas = $('#confettis');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const L = innerWidth, H = innerHeight;
  canvas.width = L * dpr; canvas.height = H * dpr;
  ctx.scale(dpr, dpr);
  const couleurs = ['#BD4E41', '#FACCA1', '#D19A2E', '#3E8E5E', '#C8634F'];
  const morceaux = Array.from({ length: 110 }, () => ({
    x: L / 2 + (Math.random() - .5) * L * .3, y: H * .35,
    vx: (Math.random() - .5) * 14, vy: -Math.random() * 13 - 4,
    r: Math.random() * Math.PI, vr: (Math.random() - .5) * .3,
    t: 6 + Math.random() * 6, c: auHasard(couleurs),
  }));
  const debut = performance.now();
  const frame = (t) => {
    ctx.clearRect(0, 0, L, H);
    const fini = t - debut > 3200;
    ctx.globalAlpha = Math.max(0, 1 - (t - debut - 2200) / 1000);
    for (const m of morceaux) {
      m.vy += .32; m.vx *= .99; m.x += m.vx; m.y += m.vy; m.r += m.vr;
      ctx.save(); ctx.translate(m.x, m.y); ctx.rotate(m.r);
      ctx.fillStyle = m.c; ctx.fillRect(-m.t / 2, -m.t / 4, m.t, m.t / 2);
      ctx.restore();
    }
    if (!fini) requestAnimationFrame(frame);
    else { ctx.clearRect(0, 0, L, H); ctx.setTransform(1, 0, 0, 1, 0, 0); }
  };
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------------------
// Mode salon : retour automatique à l'accueil après inactivité
// ---------------------------------------------------------------------------
const COMPTE_A_REBOURS = 15;
let minuteur = null;
let intervalle = null;

function relancerMinuteur() {
  clearTimeout(minuteur);
  const s = reglages().inactivite;
  if (!s || ecranCourant === 'ecran-accueil' || !$('#overlay-inactif').hidden) return;
  minuteur = setTimeout(alerteInactivite, s * 1000);
}

function alerteInactivite() {
  $('#overlay-pin').hidden = true;
  const overlay = $('#overlay-inactif');
  let reste = COMPTE_A_REBOURS;
  $('#inactif-compte').textContent = reste;
  overlay.hidden = false;
  intervalle = setInterval(() => {
    reste--;
    $('#inactif-compte').textContent = reste;
    if (reste <= 0) { fermerInactivite(); retourAccueil(); }
  }, 1000);
}

function fermerInactivite() {
  clearInterval(intervalle);
  $('#overlay-inactif').hidden = true;
}

function retourAccueil() {
  abandonner();
  afficher('ecran-accueil');
}

// ---------------------------------------------------------------------------
// Espace exposant (appui long 3 s sur le logo de l'accueil + code)
// ---------------------------------------------------------------------------
let saisiePin = '';

function ouvrirPin() {
  saisiePin = '';
  majPin();
  $('#overlay-pin').hidden = false;
}

function majPin() {
  $('#pin-points').innerHTML = [...CONFIG.codeAdmin].map((_, i) => `<span class="${i < saisiePin.length ? 'plein' : ''}"></span>`).join('');
}

function touchePin(t) {
  if (t === 'annuler') { $('#overlay-pin').hidden = true; return; }
  if (t === 'effacer') saisiePin = saisiePin.slice(0, -1);
  else saisiePin += t;
  majPin();
  if (saisiePin.length < CONFIG.codeAdmin.length) return;
  if (saisiePin === CONFIG.codeAdmin) {
    $('#overlay-pin').hidden = true;
    afficherAdmin();
  } else {
    const p = $('#pin-points');
    p.classList.remove('erreur'); void p.offsetWidth; p.classList.add('erreur');
    setTimeout(() => { saisiePin = ''; majPin(); }, 450);
  }
}

const pct = (b, v) => (v ? Math.round((100 * b) / v) : 0);
const ligneStat = (nom, bonnes, vues) => `
  <div class="ligne-stat"><span class="nom">${nom}</span>
  <span class="jauge"><i style="width:${pct(bonnes, vues)}%"></i></span>
  <span class="pct">${vues ? pct(bonnes, vues) + ' %' : '—'}</span></div>`;

function afficherAdmin() {
  const s = stats();
  const moyenne = s.terminees ? Math.round(s.totalScores / s.terminees) : 0;
  const parNiveau = NIVEAUX.map((n) => ({ ...n, nb: 0 }));
  for (const [score, nb] of Object.entries(s.scores)) parNiveau.find((n) => n.nom === niveauPour(Number(score), NIVEAUX).nom).nb += nb;

  $('#admin-kpis').innerHTML = [
    [s.terminees, 'parties terminées'],
    [s.abandons, 'parties abandonnées'],
    [s.terminees ? `${moyenne}/100` : '—', 'score moyen'],
    [s.terminees ? `${s.meilleur}/100` : '—', 'meilleur score'],
    ...parNiveau.map((n) => [n.nb, n.nom]),
  ].map(([v, l]) => `<div class="kpi"><b>${v}</b><span>${l}</span></div>`).join('');

  $('#admin-categories').innerHTML = Object.entries(CATEGORIES).map(([cle, cat]) => {
    let vues = 0, bonnes = 0;
    for (const q of QUESTIONS.filter((q) => q.cat === cle)) { vues += s.questions[q.id]?.vues ?? 0; bonnes += s.questions[q.id]?.bonnes ?? 0; }
    return ligneStat(`<b>${cle}</b>${cat.nom} <small>(${vues} rép.)</small>`, bonnes, vues);
  }).join('');

  const taux = (q) => { const st = s.questions[q.id]; return st?.vues ? st.bonnes / st.vues : 2; };
  $('#admin-questions').innerHTML = [...QUESTIONS].sort((a, b) => taux(a) - taux(b)).map((q) => {
    const st = s.questions[q.id] ?? { vues: 0, bonnes: 0 };
    return ligneStat(`<b>${q.id.toUpperCase()}</b>${echapper(q.texte)} <small>(${st.vues})</small>`, st.bonnes, st.vues);
  }).join('');

  const seg = $('#seg-inactivite');
  const actuel = reglages().inactivite;
  seg.innerHTML = [[60, '1 min'], [90, '1 min 30'], [120, '2 min'], [180, '3 min'], [0, 'Désactivé']]
    .map(([v, l]) => `<button data-inactivite="${v}" class="${v === actuel ? 'actif' : ''}">${l}</button>`).join('');

  verifierFichiers();
  $('#admin-version').textContent = `Le Grand Défi Canin — ${QUESTIONS.length} questions dans la banque.`;
  afficher('ecran-admin');
}

function verifierFichiers() {
  const liste = $('#admin-fichiers');
  const horsLigne = navigator.serviceWorker?.controller
    ? `<li class="ok">✓ Mode hors ligne actif : le jeu fonctionne sans réseau.</li>`
    : `<li class="manque">✗ Mode hors ligne pas encore actif (ouvre le jeu depuis une adresse https, puis recharge une fois).</li>`;
  const fichiers = [
    [CONFIG.logo, 'Logo (sinon : logo texte)'],
    [CONFIG.logoClair, 'Logo version claire, sur fond rouge (sinon : logo texte)'],
    [CONFIG.qrCode, 'QR code (sinon : bloc masqué)'],
    [CONFIG.photoAccueil, 'Photo d\'accueil (facultative, sinon : illustration)'],
    ...QUESTIONS.filter((q) => q.image).map((q) => [q.image.src, `Photo ${q.id.toUpperCase()} (sinon : illustration)`]),
  ];
  liste.innerHTML = horsLigne + fichiers.map(([src, label], i) => `<li data-f="${i}">… ${label} — <code>${src}</code></li>`).join('');
  fichiers.forEach(([src, label], i) => {
    const img = new Image();
    const maj = (ok) => {
      const li = $(`[data-f="${i}"]`, liste);
      if (!li) return;
      li.className = ok ? 'ok' : 'manque';
      li.innerHTML = `${ok ? '✓' : '✗ À fournir :'} ${label} — <code>${src}</code>`;
    };
    img.onload = () => maj(true);
    img.onerror = () => maj(false);
    img.src = src;
  });
}

function exporterCSV() {
  const s = stats();
  const lignes = [
    ['Parties terminées', s.terminees], ['Parties abandonnées', s.abandons],
    ['Score moyen', s.terminees ? (s.totalScores / s.terminees).toFixed(1) : ''], ['Meilleur score', s.meilleur],
    [], ['Question', 'Catégorie', 'Intitulé', 'Réponses', 'Bonnes réponses', 'Réussite %'],
    ...QUESTIONS.map((q) => {
      const st = s.questions[q.id] ?? { vues: 0, bonnes: 0 };
      return [q.id, CATEGORIES[q.cat].nom, q.texte, st.vues, st.bonnes, st.vues ? pct(st.bonnes, st.vues) : ''];
    }),
    [], ['Score', 'Nombre de parties'],
    ...Object.entries(s.scores).sort((a, b) => a[0] - b[0]),
  ];
  const csv = lignes.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
  const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'statistiques-grand-defi-canin.csv' });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------
function marqueHTML() {
  return `<img class="logo-img" alt="Canidés By Cruz" hidden>
    <span class="logo-texte" style="display:inline-flex;align-items:center;gap:12px">
      <span class="logo-rond">${icone('paw')}</span>
      <span class="logo-nom">Canidés By Cruz<small>Éducation canine</small></span>
    </span>`;
}

function initialiser() {
  for (const el of $$('[data-icone]')) el.innerHTML = icone(el.dataset.icone);
  for (const el of $$('[data-chien]')) el.innerHTML = CHIEN;
  for (const el of $$('[data-marque]')) el.innerHTML = marqueHTML();

  // Logo réel : remplace le logo texte s'il est présent (version claire sur fond rouge)
  for (const img of $$('.logo-img')) {
    img.onload = () => { img.hidden = false; img.nextElementSibling.hidden = true; };
    img.src = img.closest('.marque-claire') ? CONFIG.logoClair : CONFIG.logo;
  }

  // Photo d'accueil facultative
  const photo = $('#photo-accueil');
  photo.onload = () => { photo.hidden = false; $('.chien-illu').hidden = true; };
  photo.src = CONFIG.photoAccueil;

  // QR code : affiché seulement si le fichier existe
  const qr = $('#qr-img');
  qr.onload = () => { $('#qr-bloc').hidden = false; };
  qr.src = CONFIG.qrCode;
  if (CONFIG.texteSite) $('#qr-texte').textContent = CONFIG.texteSite;

  // Clavier du code exposant
  $('#pin-clavier').innerHTML = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'annuler', '0', 'effacer']
    .map((t) => `<button data-pin="${t}" class="${t.length > 1 ? 'texte' : ''}" aria-label="${t}">${t === 'effacer' ? icone('delete') : t === 'annuler' ? 'Annuler' : t}</button>`).join('');

  // Boutons
  $('#btn-demarrer').addEventListener('click', demarrer);
  $('#btn-rejouer').addEventListener('click', demarrer);
  $('#btn-continuer').addEventListener('click', () => { fermerInactivite(); relancerMinuteur(); });
  $('#btn-admin-quitter').addEventListener('click', () => afficher('ecran-accueil'));
  $('#btn-export').addEventListener('click', exporterCSV);
  $('#btn-reset').addEventListener('click', () => {
    if (confirm('Effacer toutes les statistiques de cet iPad ? Cette action est définitive.')) { ecrire(CLE_STATS, statsVides()); afficherAdmin(); }
  });
  $('#q-corps').addEventListener('click', (e) => {
    const rep = e.target.closest('.reponse');
    if (rep) repondre(rep);
    else if (e.target.closest('[data-action="suivant"]')) suivante();
  });
  $('#pin-clavier').addEventListener('click', (e) => { const b = e.target.closest('[data-pin]'); if (b) touchePin(b.dataset.pin); });
  $('#seg-inactivite').addEventListener('click', (e) => {
    const b = e.target.closest('[data-inactivite]');
    if (!b) return;
    ecrire(CLE_REGLAGES, { ...reglages(), inactivite: Number(b.dataset.inactivite) });
    $$('button', e.currentTarget).forEach((x) => x.classList.toggle('actif', x === b));
    relancerMinuteur();
  });

  // Appui long (3 s) sur le logo de l'accueil → code exposant
  const marque = $('#marque-accueil');
  let appui = null;
  marque.addEventListener('pointerdown', () => { appui = setTimeout(ouvrirPin, 3000); });
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) marque.addEventListener(ev, () => clearTimeout(appui));
  marque.addEventListener('contextmenu', (e) => e.preventDefault());

  // Toute interaction relance le minuteur d'inactivité
  document.addEventListener('pointerdown', () => { if ($('#overlay-inactif').hidden) relancerMinuteur(); }, { capture: true, passive: true });

  // iPad : pas de zoom par pincement, :active réactif, écran maintenu allumé si possible
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('touchstart', () => {}, { passive: true });
  const garderEveille = () => navigator.wakeLock?.request('screen').catch(() => {});
  document.addEventListener('pointerdown', garderEveille, { once: true });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') garderEveille(); });

  for (const e of $$('.ecran')) e.toggleAttribute('inert', !e.classList.contains('actif'));

  // Hors ligne : service worker + préchargement des images fournies
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').then(() => navigator.serviceWorker.ready).then((reg) => {
      const images = [CONFIG.logo, CONFIG.logoClair, CONFIG.qrCode, CONFIG.photoAccueil, ...QUESTIONS.filter((q) => q.image).map((q) => q.image.src)];
      reg.active?.postMessage({ type: 'precache', urls: images });
    }).catch((err) => console.warn('Service worker non installé :', err));
  }
}

initialiser();
