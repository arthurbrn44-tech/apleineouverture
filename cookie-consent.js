/* Bandeau de consentement cookies — À Pleine Ouverture
   Bloque Google Analytics tant que le visiteur n'a pas cliqué "Accepter".
   Choix mémorisé 6 mois (recommandation CNIL), modifiable via le lien
   "Gérer les cookies" du pied de page. */
(function () {
  'use strict';

  var GA_ID = 'G-6ZQ9D77WMC';
  var STORAGE_KEY = 'apo-cookies-consent';
  var STORAGE_DATE_KEY = 'apo-cookies-consent-date';
  var SIX_MONTHS_MS = 1000 * 60 * 60 * 24 * 30 * 6;

  function getStoredConsent() {
    var value = localStorage.getItem(STORAGE_KEY);
    var date = parseInt(localStorage.getItem(STORAGE_DATE_KEY), 10);
    if (!value || !date || (Date.now() - date) > SIX_MONTHS_MS) return null;
    return value;
  }

  function storeConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
    localStorage.setItem(STORAGE_DATE_KEY, String(Date.now()));
  }

  function loadGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function buildBanner() {
    var el = document.createElement('div');
    el.id = 'apo-cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Gestion des cookies');
    el.innerHTML =
      '<style>' +
      '#apo-cookie-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:1000;' +
      'max-width:640px;margin:0 auto;background:#111111;color:#F0F0EC;' +
      'border-radius:14px;padding:22px 24px;box-shadow:0 12px 40px rgba(0,0,0,0.35);' +
      'font-family:-apple-system,BlinkMacSystemFont,"Helvetica Neue",Arial,sans-serif;' +
      'display:flex;flex-direction:column;gap:16px;}' +
      '#apo-cookie-banner p{margin:0;font-size:14.5px;line-height:1.6;color:#D4D4D0;}' +
      '#apo-cookie-banner a{color:#F0F0EC;text-decoration:underline;}' +
      '#apo-cookie-actions{display:flex;gap:12px;flex-wrap:wrap;}' +
      '#apo-cookie-actions button{flex:1;min-width:120px;padding:11px 18px;border-radius:8px;' +
      'font-size:14px;font-weight:500;cursor:pointer;border:1px solid transparent;}' +
      '#apo-cookie-accept{background:#059669;color:#fff;}' +
      '#apo-cookie-accept:hover{background:#047857;}' +
      '#apo-cookie-refuse{background:transparent;color:#F0F0EC;border-color:#444;}' +
      '#apo-cookie-refuse:hover{border-color:#777;}' +
      '@media (max-width:520px){#apo-cookie-banner{left:10px;right:10px;bottom:10px;padding:18px;}}' +
      '</style>' +
      '<p>Ce site utilise Google Analytics pour mesurer l\'audience, uniquement si vous l\'acceptez. ' +
      'Vous pouvez changer d\'avis à tout moment depuis le lien « Gérer les cookies » en pied de page. ' +
      'Détails dans notre <a href="confidentialite.html">politique de confidentialité</a>.</p>' +
      '<div id="apo-cookie-actions">' +
      '<button id="apo-cookie-refuse" type="button">Refuser</button>' +
      '<button id="apo-cookie-accept" type="button">Accepter</button>' +
      '</div>';
    return el;
  }

  function showBanner() {
    if (document.getElementById('apo-cookie-banner')) return;
    var banner = buildBanner();
    document.body.appendChild(banner);
    document.getElementById('apo-cookie-accept').addEventListener('click', function () {
      storeConsent('accepted');
      loadGoogleAnalytics();
      banner.remove();
    });
    document.getElementById('apo-cookie-refuse').addEventListener('click', function () {
      storeConsent('refused');
      banner.remove();
    });
  }

  function init() {
    var consent = getStoredConsent();
    if (consent === 'accepted') {
      loadGoogleAnalytics();
    } else if (consent === 'refused') {
      // rien à charger
    } else {
      showBanner();
    }
  }

  // Permet de rouvrir le choix depuis le lien "Gérer les cookies" du footer
  window.apoOpenCookiePreferences = function () {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_DATE_KEY);
    var existing = document.getElementById('apo-cookie-banner');
    if (existing) existing.remove();
    showBanner();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
