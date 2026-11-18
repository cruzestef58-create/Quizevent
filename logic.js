// Logique pure du jeu (sans DOM), testée par verification.mjs

export function melanger(liste) {
  const a = [...liste];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Tire n questions par catégorie selon la répartition, puis mélange l'ordre.
export function tirerPartie(questions, repartition) {
  const tirage = [];
  for (const [cat, n] of Object.entries(repartition)) {
    const reserve = questions.filter((q) => q.cat === cat);
    if (reserve.length < n) throw new Error(`Catégorie ${cat} : ${reserve.length} question(s) pour ${n} demandée(s)`);
    tirage.push(...melanger(reserve).slice(0, n));
  }
  return melanger(tirage);
}

export function niveauPour(score, niveaux) {
  return [...niveaux].sort((a, b) => b.min - a.min).find((n) => score >= n.min) ?? niveaux[0];
}
