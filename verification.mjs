// Vérification automatique : node verification.mjs
import assert from 'node:assert/strict';
import { QUESTIONS, CONFIG, NIVEAUX } from './contenu.js';
import { tirerPartie, niveauPour } from './logic.js';

// Banque de questions cohérente
assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length, 'ids en double');
for (const q of QUESTIONS) {
  assert.ok(q.bonne >= 0 && q.bonne < q.choix.length, `${q.id} : index de bonne réponse invalide`);
  assert.ok(q.choix.length >= 2 && q.choix.length <= 4, `${q.id} : 2 à 4 choix`);
  assert.ok(q.explication, `${q.id} : explication manquante`);
}

// 2000 tirages : 10 questions, sans doublon, bonne répartition, ordre variable
const premieres = new Set();
for (let i = 0; i < 2000; i++) {
  const p = tirerPartie(QUESTIONS, CONFIG.repartition);
  assert.equal(p.length, 10);
  assert.equal(new Set(p.map((q) => q.id)).size, 10, 'doublon dans une partie');
  for (const [cat, n] of Object.entries(CONFIG.repartition))
    assert.equal(p.filter((q) => q.cat === cat).length, n, `répartition ${cat}`);
  premieres.add(p[0].id);
}
assert.ok(premieres.size > 15, 'ordre pas assez mélangé');

// Score max et niveaux
assert.equal(10 * CONFIG.pointsParBonneReponse, 100);
const nom = (s) => niveauPour(s, NIVEAUX).nom;
assert.equal(nom(0), 'Curieux des chiens');
assert.equal(nom(30), 'Curieux des chiens');
assert.equal(nom(40), 'Apprenti éducateur');
assert.equal(nom(60), 'Apprenti éducateur');
assert.equal(nom(70), 'Complice des chiens');
assert.equal(nom(80), 'Complice des chiens');
assert.equal(nom(90), 'Expert du langage canin');
assert.equal(nom(100), 'Expert du langage canin');

console.log('✓ Toutes les vérifications sont passées');
