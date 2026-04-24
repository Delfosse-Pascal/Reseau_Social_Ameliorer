/* =========================================================
   MENU RÉSEAUX SOCIAUX — ENRICHISSEMENT AUTO
   Ajoute icônes SVG + data-network + effet ripple,
   sans modifier le HTML.
   ========================================================= */
(function () {
  const ICONS = {
    pinterest: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.17-.1-.95-.2-2.4.04-3.44.22-.94 1.4-5.96 1.4-5.96s-.36-.72-.36-1.78c0-1.67.97-2.92 2.17-2.92 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 4-.28 1.2.6 2.18 1.79 2.18 2.15 0 3.8-2.27 3.8-5.54 0-2.9-2.08-4.92-5.05-4.92-3.44 0-5.46 2.58-5.46 5.25 0 1.04.4 2.16.9 2.77.1.12.11.22.08.34-.09.37-.29 1.2-.33 1.37-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.75-7.25 7.92-7.25 4.16 0 7.39 2.96 7.39 6.92 0 4.13-2.6 7.46-6.22 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15C9.57 23.8 10.76 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg>',
    flickr: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="6.5" cy="12" r="5.5"/><circle cx="17.5" cy="12" r="5.5" opacity=".85"/></svg>',
    tumblr: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.819v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.168z"/></svg>',
    x: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
  };

  function detectNetwork(href) {
    if (!href) return null;
    const h = href.toLowerCase();
    if (h.includes('pinterest.'))       return 'pinterest';
    if (h.includes('flickr.'))          return 'flickr';
    if (h.includes('tumblr.'))          return 'tumblr';
    if (/(^|\/\/)(www\.)?(x\.com|twitter\.com)/.test(h)) return 'x';
    if (h.includes('youtube.') || h.includes('youtu.be')) return 'youtube';
    if (h.includes('facebook.'))        return 'facebook';
    if (h.includes('instagram.'))       return 'instagram';
    if (h.includes('linkedin.'))        return 'linkedin';
    if (h.includes('tiktok.'))          return 'tiktok';
    return null;
  }

  function enhanceLink(link) {
    if (link.dataset.socialEnhanced) return;
    link.dataset.socialEnhanced = '1';

    const net = detectNetwork(link.getAttribute('href'));
    if (net) link.setAttribute('data-network', net);

    // Label original
    const label = link.textContent.trim();

    // Injecte icône SVG avant le texte
    if (net && ICONS[net]) {
      link.innerHTML = ICONS[net] + '<span class="social-label">' + label + '</span>';
    }

    // Effet ripple au clic
    link.addEventListener('click', function (e) {
      const rect = link.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top  = (e.clientY - rect.top  - size / 2) + 'px';
      link.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  function enhanceAll() {
    document.querySelectorAll('.social-menu ul li a').forEach(enhanceLink);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceAll);
  } else {
    enhanceAll();
  }

  // Si le menu est injecté plus tard (SPA, include dynamique)
  const mo = new MutationObserver(() => enhanceAll());
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();

/* =========================================================
   CANONICAL (inchangé)
   ========================================================= */
(function () {
  var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
  url = url.replace(/index\.html$/i, '');
  var link = document.createElement('link');
  link.rel = 'canonical';
  link.href = url;
  document.head.appendChild(link);
})();

/* =========================================================
   TITRE DE PAGE AUTO (inchangé)
   ========================================================= */
(function () {
  var path = window.location.pathname;
  var page = path.substring(path.lastIndexOf('/') + 1) || 'Accueil';
  page = page.replace('.html', '')
             .replace(/[-_]/g, ' ')
             .replace(/\b\w/g, function (l) { return l.toUpperCase(); });
  document.title = page + ' – Le site de Pascal Delfosse - Artiste Contemporain';
})();
