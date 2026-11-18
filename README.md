# Le Grand Défi Canin — Canidés By Cruz

Jeu de quiz pour iPad (Safari), sans compte, sans serveur de calcul, sans IA, utilisable hors ligne.
HTML / CSS / JavaScript pur, aucune dépendance.

## Fichiers

| Fichier | Rôle |
|---|---|
| `contenu.js` | **Tout ce que tu modifies** : questions, explications, niveaux, code exposant, chemins des images |
| `styles.css` | Apparence (couleurs en haut du fichier, variables `--sauge`, `--vert`…) |
| `app.js` | Fonctionnement du jeu |
| `logic.js` | Tirage des questions et calcul du niveau |
| `sw.js` | Mode hors ligne (change `VERSION` après chaque modification) |
| `images/` | Tes photos, logo et QR code — voir `images/LISEZ-MOI.txt` |
| `verification.mjs` | Test automatique du tirage et des niveaux (`node verification.mjs`) |

## 1. Prévisualiser sur ordinateur

Dans ce dossier :

```bash
python -m http.server 8080
```

puis ouvrir http://localhost:8080 (ou `npm start` si Node.js est installé).
Ouvrir `index.html` en double-cliquant ne marche pas : les navigateurs bloquent les modules JavaScript en `file://`.

## 2. Mettre en ligne (gratuit, https obligatoire pour le hors ligne)

**Le plus simple : Netlify Drop**
1. Aller sur https://app.netlify.com/drop (créer un compte gratuit).
2. Glisser-déposer **tout le dossier** du jeu.
3. Netlify donne une adresse `https://…netlify.app`. Tu peux la renommer dans *Site settings*.

Alternative : GitHub Pages ou Cloudflare Pages (même principe, dossier statique).

## 3. Installer sur l'iPad (la veille du salon, avec du wifi)

1. Ouvrir l'adresse dans **Safari**.
2. Bouton Partager → **Sur l'écran d'accueil** → Ajouter. Le jeu s'ouvre alors en plein écran, sans barre Safari.
3. Ouvrir le jeu depuis l'icône, faire une partie complète, puis **fermer et rouvrir une fois** (le cache se termine).
4. Vérifier : appui long 3 s sur le logo « Canidés By Cruz » de l'accueil → code → la ligne « ✓ Mode hors ligne actif » doit apparaître.
5. Test : mode Avion → rouvrir le jeu → il doit fonctionner.

**Verrouiller l'iPad sur le jeu (Accès guidé)** : Réglages → Accessibilité → Accès guidé → activer + définir un code.
Dans le jeu, triple-clic sur le bouton latéral → Démarrer. Les visiteurs ne peuvent plus quitter l'app.
Pense aussi à : Réglages → Luminosité et affichage → Verrouillage auto → **Jamais**, et à brancher l'iPad.

## 4. Mode salon / espace exposant

- **Accès caché** : appui long **3 secondes** sur le logo de l'accueil, puis code **2811** (à changer dans `contenu.js`, `codeAdmin`).
- Statistiques : parties terminées / abandonnées, score moyen, meilleur score, répartition des niveaux, réussite par catégorie et par question.
- Réglage du retour automatique à l'accueil (1 min à 3 min, ou désactivé). Après le délai sans toucher l'écran, un message « Tu es toujours là ? » laisse 15 s avant de revenir à l'accueil.
- Export CSV (ouvrable dans Excel / Numbers) et réinitialisation des statistiques.
- Liste des fichiers à fournir (✓ présent / ✗ manquant).
- Les statistiques restent sur l'iPad (stockage local du navigateur), anonymes. Aucune donnée personnelle n'est collectée.
  ⚠️ Elles sont propres à l'app de l'écran d'accueil : effacer les données de Safari les supprime.

## 5. Modifier le jeu

- **Questions** : `contenu.js`. `bonne` = position de la bonne réponse (0 = première). Les propositions sont mélangées à l'affichage (sauf Vrai/Faux).
- **Répartition** : `CONFIG.repartition` (3/3/2/2 par défaut). Il faut au moins autant de questions que demandé dans chaque catégorie.
- **Couleurs** : variables en haut de `styles.css`.
- Après chaque modification : `node verification.mjs` (si Node.js est installé), changer `VERSION` dans `sw.js`, redéployer, puis ouvrir le jeu sur l'iPad **avec du réseau** et le relancer deux fois.

## Fichiers à me fournir (facultatifs)

Voir `images/LISEZ-MOI.txt` : `logo.png`, `qr-code.png`, `accueil-chien.jpg` et 5 photos pour les questions « Décode ton chien ».
Sans eux, le jeu reste complet : logo texte, illustration de chien, et le bloc QR code est masqué.
