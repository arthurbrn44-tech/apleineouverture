# Projet — Site vitrine À Pleine Ouverture

## Ce que c'est
Le site vitrine de l'agence. **HTML / CSS / JavaScript statique** (pas de framework, pas de
`package.json`). Pages : `index.html`, `architecte-interieur.html`, `mentions-legales.html`,
`confidentialite.html`. Beaucoup de médias (photos, vidéos hero/animation).

## Avant d'écrire un texte
Lis d'abord `../marque-a-pleine-ouverture.md` et applique le skill `copywriting-fr`.
Aucun texte « bateau », vocabulaire de marque cohérent.

## Design
- **Vert**, jamais d'orange (surtout pas l'orange « Claude » : effet site IA, rejeté).
- Cohérence entre les pages : elles doivent partager le même système (couleurs, typo,
  rythme). Un souci récurrent a été des pages non coordonnées.
- Halo lumineux : dans l'esprit de la marque, ok.
- Pas de logo tiers visible (ex. logo Gemini sur une vidéo).

## Animation (au scroll) — sensible
- Le scroll doit **ralentir et s'arrêter** sur les moments-clés de texte pour laisser lire.
  Réglage historique trop rapide : les textes défilaient/​se chevauchaient. Toujours tester
  qu'un petit coup de scroll ne fait pas tout défiler d'un coup.

## Mettre en ligne
- Repo GitHub : `arthurbrn44-tech/signal-website` (ancien nom « Signal »).
- Flux : commit → push GitHub → **Vercel** déploie automatiquement.
- Étapes détaillées, en français pas à pas : voir `../../memo-git-deploiement.md`.

## Rappels
- Prévenir avant toute action longue/coûteuse.
- Expliquer chaque terme technique.
