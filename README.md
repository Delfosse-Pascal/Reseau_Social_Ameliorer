# Menu Réseaux Sociaux — Moderne & Animé

Menu réseaux sociaux moderne, animé et personnalisable pour le site de Pascal Delfosse.
Deux fichiers (`style.css` + `script.js`) — aucune modification HTML requise sur les pages existantes.

**Statut : déployé et fonctionnel** sur tout le site (racine + tiroirs).

---

## Aperçu

- Fond animé (gradient en mouvement) avec halo conique qui tourne
- Boutons flottants avec effet de vague décalée
- Reflet brillant au survol
- Couleurs de marque automatiques au hover (Pinterest, Flickr, Tumblr, X, YouTube…)
- Icônes SVG injectées automatiquement par JavaScript (détection via `href`)
- Effet ripple au clic
- Responsive (mobile / tablette / desktop)
- Respecte `prefers-reduced-motion`

---

## Structure du projet

```
reseau_social_ameliorer/
├── style.css      # styles + animations du menu
├── script.js      # injection icônes + ripple + canonical + titre
├── index.html     # page d'accueil (référence)
├── test.html      # page de diagnostic (vérifie CSS/JS chargés)
└── README.md
```

### Déploiement sur filedn

Les fichiers sont utilisés à deux endroits sur filedn :

| Emplacement | Utilisé par |
|-------------|-------------|
| `https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/` (racine) | page `test.html` locale et preview |
| `https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/` | toutes les pages HTML du site (tiroirs inclus) |

**⚠ Important :** toute modification de `style.css` ou `script.js` doit être uploadée dans **`Site_Web/`** pour être prise en compte par les pages HTML existantes.

---

## Installation (déjà faite)

Chaque page HTML contient :

```html
<link rel="stylesheet" type="text/css" href="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/style.css?v=4">
<script src="https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/Site_Web/script.js?v=4"></script>
```

Structure du menu :

```html
<nav class="social-menu">
  <ul>
    <li><a href="https://..." target="_blank">Nom</a></li>
  </ul>
</nav>
```

Le script détecte les liens et injecte icônes + comportements.

---

## Mise à jour des fichiers

Pour que les navigateurs rechargent les nouveaux fichiers (au lieu du cache) :

1. Modifier `style.css` ou `script.js` localement
2. Uploader dans `Site_Web/` sur filedn (remplacer anciens)
3. **Incrémenter le cache-bust** dans chaque page HTML : `?v=4` → `?v=5`
   - Sinon les visiteurs gardent l'ancienne version en cache

Astuce : faire un `find/replace` global `?v=4` → `?v=5` sur toutes les pages HTML.

---

## Personnalisation — Fond du menu

Une seule variable à modifier dans `style.css` (bloc `:root`) :

```css
:root {
  --social-menu-bg: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5ed 100%);
}
```

### Exemples de fonds

| Style | Valeur |
|-------|--------|
| Couleur unie sombre | `--social-menu-bg: #1a1a2e;` |
| Néon violet/bleu | `--social-menu-bg: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff);` |
| Doré | `--social-menu-bg: linear-gradient(135deg, #f7971e, #ffd200);` |
| Image de fond | `--social-menu-bg: url('fond.jpg') center/cover;` |
| Verre (glassmorphism) | `--social-menu-bg: rgba(255,255,255,0.15);` |
| Nuit étoilée | `--social-menu-bg: radial-gradient(circle, #0f2027, #203a43, #2c5364);` |
| Coucher de soleil | `--social-menu-bg: linear-gradient(135deg, #ff6e7f, #bfe9ff);` |
| Aurore boréale | `--social-menu-bg: linear-gradient(135deg, #00c9ff, #92fe9d);` |

---

## Autres variables CSS

Toutes dans `:root` — modifier selon besoin :

| Variable | Rôle | Défaut |
|----------|------|--------|
| `--social-menu-bg` | Fond du menu | gradient bleu |
| `--social-menu-radius` | Arrondi du menu | `60px` |
| `--social-menu-padding` | Espacement intérieur | `10px 14px` |
| `--social-menu-gap` | Écart entre boutons | `10px` |
| `--social-menu-text` | Couleur du texte | `#ffffff` |
| `--social-menu-shadow` | Ombre portée | `0 10px 30px rgba(0,0,0,0.25)` |
| `--social-menu-border` | Bordure | `1px solid rgba(255,255,255,0.25)` |
| `--c-pinterest` … `--c-youtube` | Couleurs de marque (hover) | officielles |

---

## Réseaux supportés (icônes SVG auto)

- Pinterest
- Flickr
- Tumblr
- X (ex-Twitter)
- YouTube
- Facebook, Instagram, LinkedIn, TikTok (détectés — couleur de marque à ajouter si besoin)

Pour ajouter un réseau : compléter l'objet `ICONS` dans `script.js` et la couleur `--c-xxx` dans `style.css`.

---

## Fonctionnalités du `script.js`

Trois blocs indépendants (tous conservés) :

1. **Enrichissement du menu social** — injecte les icônes, `data-network`, ripple au clic.
   Utilise un `MutationObserver` pour gérer les menus injectés dynamiquement.
2. **Balise canonical** — ajoute `<link rel="canonical">` sur chaque page (supprime `index.html`).
3. **Titre automatique** — génère le `<title>` à partir du nom de fichier.

---

## Page de diagnostic

`test.html` contient un auto-diagnostic qui vérifie :

- ✅ CSS `.social-menu` appliqué (gradient détecté)
- ✅ Variable `--social-menu-bg` présente
- ✅ JS enrichissement (icônes SVG injectées)
- ✅ `data-network` posé sur les liens
- 📄 Liste des CSS et JS réellement chargés

URL : `https://filedn.eu/llN3kr5vmyEBPIWCwFj3O6h/test.html`

---

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Edge, Safari, Opera, Brave)
- `backdrop-filter` avec fallback `-webkit-backdrop-filter`
- Animations désactivées si `prefers-reduced-motion: reduce`

---

## Dépannage

| Problème | Cause probable | Solution |
|----------|----------------|----------|
| Menu non stylé sur les tiroirs | Fichiers pas uploadés dans `Site_Web/` | Upload `style.css` + `script.js` dans `Site_Web/` |
| Changements CSS/JS non visibles | Cache navigateur | Incrémenter `?v=N` dans les pages HTML, puis `Ctrl+F5` |
| Icônes absentes | `href` non reconnu par `detectNetwork()` | Ajouter le domaine dans `script.js` |
| Animations absentes | `prefers-reduced-motion` activé | Comportement volontaire (accessibilité) |
| Menu déborde mobile | Largeur écran très petite | Déjà géré par `@media (max-width: 640px)` |
| Preview locale ne style pas | Preview bloque le CDN filedn | `index.html` charge aussi `style.css` + `script.js` en local (racine) |

---

## Historique

- **v4** — Cache-bust `?v=4`, menu déplacé en haut du container, chargement local + filedn pour preview
- **v3** — Cache-bust initial
- **v1** — Refonte complète : gradient animé, icônes SVG auto, hover brand, ripple, flottement, responsive

---

## Licence

Usage libre pour le site de Pascal Delfosse — Artiste Contemporain.
