// =====================================================================
//  LE GRAND DÉFI CANIN — tout le contenu modifiable est dans ce fichier.
//  Après une modification, change VERSION dans sw.js pour que l'iPad
//  télécharge la nouvelle version.
// =====================================================================

export const CONFIG = {
  codeAdmin: '2811',            // code de l'espace exposant (appui long 3 s sur le logo de l'accueil)
  inactiviteSecondes: 90,       // valeur par défaut, modifiable dans l'espace exposant
  pointsParBonneReponse: 10,
  repartition: { A: 3, B: 3, C: 2, D: 2 }, // nombre de questions tirées par catégorie
  texteSite: 'canidesbycruz.fr', // affiché sous le QR code
  logo: 'images/logo.png',      // logo rouge, fond transparent (sur fond clair)
  logoClair: 'images/logo-clair.png', // logo pêche, fond transparent (sur fond rouge)
  qrCode: 'images/qr-code.png', // QR code vers ton site
  photoAccueil: 'images/accueil-chien.jpg', // facultatif : remplace l'illustration de l'accueil
};

export const CATEGORIES = {
  A: { nom: 'Décode ton chien', icone: 'eye' },
  B: { nom: 'Que ferais-tu ?', icone: 'message' },
  C: { nom: 'Vrai ou faux ?', icone: 'scale' },
  D: { nom: 'Incroyable mais vrai !', icone: 'sparkles' },
};

// Niveaux : le premier dont le score >= min (en partant du plus haut) s'applique.
export const NIVEAUX = [
  { min: 0, nom: 'Curieux des chiens', couleur: '#C68B59',
    message: "Chaque question est une occasion d'apprendre ! Observer son chien et se poser des questions, c'est déjà le premier pas pour mieux le comprendre." },
  { min: 40, nom: 'Apprenti éducateur', couleur: '#9AA2A6',
    message: "Belle base ! Tu as déjà de bons réflexes. Avec un peu d'observation, le langage des chiens deviendra de plus en plus clair pour toi." },
  { min: 70, nom: 'Complice des chiens', couleur: '#BD4E41',
    message: "Très beau score ! Tu sais regarder au-delà des idées reçues et tenir compte du contexte. Les chiens apprécient ce genre de regard." },
  { min: 90, nom: 'Expert du langage canin', couleur: '#D19A2E',
    message: "Impressionnant ! Tu combines observation, respect et compréhension des besoins du chien. Viens en parler sur le stand, on a sûrement plein de choses à échanger !" },
];

// bonne = index de la bonne réponse dans "choix" (0 = première).
// vf: true = question Vrai/Faux (les deux boutons ne sont pas mélangés).
// image: facultatif. Si le fichier manque, une illustration de remplacement s'affiche.
export const QUESTIONS = [
  // ---------- A — Décode ton chien ----------
  { id: 'q01', cat: 'A',
    texte: "Un chien se lèche la truffe alors qu'aucune nourriture n'est présente. Qu'est-ce que cela peut indiquer ?",
    choix: ['Il a forcément faim.', 'Il peut être mal à l\'aise.', 'Il demande toujours à jouer.', 'Il cherche à montrer sa dominance.'],
    bonne: 1,
    explication: "Se lécher la truffe peut être un signal associé à un inconfort ou à du stress. Il faut observer le contexte et les autres signaux corporels.",
    image: { src: 'images/q01-chien-leche-truffe.jpg', alt: 'Un chien qui se lèche la truffe, sans nourriture à proximité' } },
  { id: 'q02', cat: 'A',
    texte: "Un chien remue la queue. Cela signifie-t-il obligatoirement qu'il est content ?",
    choix: ['Oui, toujours.', 'Non, il peut aussi être excité ou tendu.', 'Oui, sauf lorsqu\'il aboie.', 'Cela signifie qu\'il veut manger.'],
    bonne: 1,
    explication: "La queue remuante indique une activation émotionnelle, pas nécessairement de la joie. Sa position et son mouvement, associés au reste du corps, sont importants.",
    image: { src: 'images/q02-chien-queue.jpg', alt: 'Un chien de profil, la queue bien visible' } },
  { id: 'q03', cat: 'A',
    texte: "Un chien détourne la tête pendant une interaction insistante. Que peut-on envisager ?",
    choix: ['Il essaie de communiquer un inconfort.', 'Il a oublié la présence de la personne.', 'Il cherche nécessairement à dominer.', 'Il demande une récompense.'],
    bonne: 0,
    explication: "Détourner la tête peut faire partie des signaux d'évitement. Il vaut mieux observer son comportement et lui laisser de l'espace.",
    image: { src: 'images/q03-chien-tete-detournee.jpg', alt: 'Un chien qui détourne la tête face à une personne penchée sur lui' } },
  { id: 'q04', cat: 'A',
    texte: "Un chien se fige lorsqu'une personne inconnue approche. Quelle réaction est la plus prudente ?",
    choix: ['Le caresser immédiatement.', 'Le tirer vers la personne.', 'Lui laisser de l\'espace.', 'Le forcer à s\'asseoir.'],
    bonne: 2,
    explication: "L'immobilité peut être un signe de tension. Il est préférable d'éviter d'imposer un contact et de respecter sa distance de confort.",
    image: { src: 'images/q04-chien-fige.jpg', alt: 'Un chien immobile, le corps raide, pendant qu\'une personne approche' } },
  { id: 'q05', cat: 'A',
    texte: "Un chien présente une posture souple, des mouvements détendus et recherche spontanément le contact. Qu'est-ce que cela suggère ?",
    choix: ['Il semble à l\'aise dans cette situation.', 'Il veut forcément contrôler la personne.', 'Il est nécessairement malade.', 'Il souhaite toujours être laissé seul.'],
    bonne: 0,
    explication: "Plusieurs signaux corporels cohérents peuvent suggérer un état détendu. Il faut néanmoins continuer à observer les réactions du chien.",
    image: { src: 'images/q05-chien-detendu.jpg', alt: 'Un chien au corps souple qui vient de lui-même vers une personne' } },

  // ---------- B — Que ferais-tu ? ----------
  { id: 'q06', cat: 'B',
    texte: "Ton chien grogne quand tu approches de son panier. Que fais-tu ?",
    choix: ['Je le punis immédiatement.', 'Je l\'oblige à sortir.', 'Je lui laisse de l\'espace et cherche à comprendre pourquoi.', 'Je continue à m\'approcher pour l\'habituer.'],
    bonne: 2,
    explication: "Le grognement est un signal de communication. Le punir peut supprimer l'avertissement sans résoudre l'inconfort à l'origine du comportement." },
  { id: 'q07', cat: 'B',
    texte: "Ton chien tire beaucoup en laisse pendant la promenade. Quelle approche privilégier ?",
    choix: ['Donner de grands coups de laisse.', 'Travailler progressivement la marche en laisse et renforcer les comportements souhaités.', 'Arrêter définitivement les promenades.', 'Le gronder à chaque mouvement.'],
    bonne: 1,
    explication: "Un apprentissage progressif avec des renforcements adaptés et des conditions de promenade appropriées aide à construire une marche en laisse plus agréable." },
  { id: 'q08', cat: 'B',
    texte: "Ton chien ne revient pas immédiatement au rappel. Quelle attitude adopter ?",
    choix: ['Le gronder lorsqu\'il revient.', 'Le poursuivre en criant.', 'Le récompenser lorsqu\'il revient et retravailler progressivement le rappel.', 'Abandonner le rappel.'],
    bonne: 2,
    explication: "Le retour doit rester intéressant et sécurisant pour le chien. On adapte la difficulté et on utilise une longe lorsque nécessaire." },
  { id: 'q09', cat: 'B',
    texte: "Un chien inconnu semble hésitant lorsque tu souhaites le caresser. Que fais-tu ?",
    choix: ['Je tends les mains vers sa tête.', 'Je le laisse choisir de s\'approcher ou non.', 'Je le prends dans mes bras.', 'Je le regarde fixement.'],
    bonne: 1,
    explication: "Respecter le choix et l'espace du chien limite les interactions imposées et favorise des rencontres plus sereines." },
  { id: 'q10', cat: 'B',
    texte: "Ton chien semble inquiet lorsqu'il rencontre un autre chien. Que privilégier ?",
    choix: ['Forcer une rencontre rapprochée.', 'Le maintenir immobile jusqu\'à ce qu\'il se calme.', 'Augmenter la distance et observer ses réactions.', 'Le laisser systématiquement se débrouiller seul.'],
    bonne: 2,
    explication: "La distance peut aider un chien à se sentir plus en sécurité. Les rencontres doivent être adaptées à ses capacités et à son état émotionnel." },

  // ---------- C — Vrai ou faux ? ----------
  { id: 'q11', cat: 'C', vf: true,
    texte: '« Un chien qui grogne est forcément agressif. »',
    choix: ['Vrai', 'Faux'], bonne: 1,
    explication: "Un grognement peut exprimer de la peur, de l'inconfort, une volonté de garder ses distances ou apparaître dans certains jeux. Le contexte est indispensable." },
  { id: 'q12', cat: 'C', vf: true,
    texte: '« Un chien peut apprendre de nouveaux comportements même lorsqu\'il est âgé. »',
    choix: ['Vrai', 'Faux'], bonne: 0,
    explication: "Les chiens peuvent apprendre tout au long de leur vie, avec des méthodes et des exercices adaptés à leurs capacités." },
  { id: 'q13', cat: 'C', vf: true,
    texte: '« Laisser son chien renifler pendant une promenade peut contribuer à son bien-être. »',
    choix: ['Vrai', 'Faux'], bonne: 0,
    explication: "Le flair permet au chien d'explorer son environnement et représente une activité mentale importante." },
  { id: 'q14', cat: 'C', vf: true,
    texte: '« Pour bien éduquer son chien, il faut absolument lui montrer qu\'on est le chef de meute. »',
    choix: ['Vrai', 'Faux'], bonne: 1,
    explication: "L'éducation ne nécessite pas d'imposer une relation de dominance. Une communication claire, des apprentissages cohérents et des renforcements adaptés permettent d'enseigner les comportements attendus." },
  { id: 'q15', cat: 'C', vf: true,
    texte: '« Un chien qui détruit des objets lorsqu\'il est seul cherche forcément à se venger. »',
    choix: ['Vrai', 'Faux'], bonne: 1,
    explication: "Les destructions peuvent être liées à plusieurs causes, comme l'ennui, des besoins non satisfaits ou une détresse liée à la séparation. Elles ne permettent pas à elles seules de conclure à une intention de vengeance." },

  // ---------- D — Incroyable mais vrai ! ----------
  { id: 'q16', cat: 'D',
    texte: "Quel sens occupe une place particulièrement importante dans l'exploration du monde chez le chien ?",
    choix: ['Le goût.', 'L\'odorat.', 'La vision des couleurs.', 'Le toucher des coussinets.'],
    bonne: 1,
    explication: "Le chien utilise énormément son odorat pour recueillir des informations sur son environnement." },
  { id: 'q17', cat: 'D',
    texte: "Pourquoi les activités de recherche olfactive sont-elles intéressantes ?",
    choix: ['Elles stimulent ses capacités naturelles.', 'Elles remplacent toujours les promenades.', 'Elles empêchent les chiens d\'aboyer.', 'Elles servent uniquement aux chiens policiers.'],
    bonne: 0,
    explication: "Les activités olfactives constituent une forme d'enrichissement et peuvent être adaptées à de nombreux chiens." },
  { id: 'q18', cat: 'D',
    texte: "Que perçoit un chien lorsqu'il regarde les couleurs ?",
    choix: ['Exactement les mêmes couleurs qu\'un humain à vision trichromatique normale.', 'Un monde entièrement noir et blanc.', 'Des couleurs, avec une perception différente de la nôtre.', 'Uniquement le rouge et le vert.'],
    bonne: 2,
    explication: "Les chiens possèdent une vision des couleurs différente de la vision humaine habituelle, avec notamment une distinction du bleu et du jaune." },
  { id: 'q19', cat: 'D',
    texte: "Pourquoi le sommeil est-il important pour un chien ?",
    choix: ['Il contribue notamment à sa récupération et à son fonctionnement cognitif.', 'Il supprime automatiquement tous ses problèmes de comportement.', 'Il remplace les activités physiques.', 'Il est utile uniquement chez les chiots.'],
    bonne: 0,
    explication: "Un repos suffisant contribue au bien-être et aux fonctions normales de l'organisme, chez les chiens jeunes comme adultes." },
  { id: 'q20', cat: 'D',
    texte: "Parmi ces activités, laquelle sollicite principalement le flair du chien ?",
    choix: ['Le nosework.', 'Le saut d\'obstacles.', 'La marche au pied.', 'La course derrière une balle.'],
    bonne: 0,
    explication: "Le nosework repose sur la recherche d'odeurs et mobilise les capacités olfactives du chien." },
];
