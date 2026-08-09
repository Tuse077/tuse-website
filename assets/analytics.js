/* ═══════════════════════════════════════════════════════════════════
   TUȘE ANALYTICS LOADER — GA4
   Reads the ID from analytics-config.js. Does nothing until a real
   Measurement ID is set there. Loaded with `defer`, and the tag
   itself is injected `async`, so this never blocks rendering.

   Conversion / funnel events (queued even when unconfigured):

     app_store_click    — store badge click (App Store / Google Play)
     generate_lead      — business enquiry thank-you page
     guide_view         — problem guide page load (body[data-guide])
     guide_cta_click    — [data-evt="guide_cta"]
     iranti_cta_click   — [data-evt="iranti_cta"]
     service_page_click — [data-evt="service_page"]
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  var cfg = window.TUSE_ANALYTICS || {};
  var id = cfg.GA_MEASUREMENT_ID || '';
  var configured = id && id.indexOf('XXXX') === -1;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  if (!configured) {
    if (window.console && console.info) {
      console.info('[Tuse] Analytics not configured — set GA_MEASUREMENT_ID in assets/analytics-config.js to enable.');
    }
  } else {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', id);
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest && e.target.closest('a.store');
    if (link) {
      var isAppStore = /apps\.apple\.com/.test(link.href);
      gtag('event', 'app_store_click', {
        store: isAppStore ? 'app_store' : 'google_play',
        link_url: link.href,
        page_path: location.pathname,
      });
      return;
    }

    var evtEl = e.target.closest && e.target.closest('[data-evt]');
    if (!evtEl) return;
    var name = evtEl.getAttribute('data-evt');
    if (name === 'guide_cta') {
      gtag('event', 'guide_cta_click', { page_path: location.pathname, link_url: evtEl.href || '' });
    } else if (name === 'iranti_cta') {
      gtag('event', 'iranti_cta_click', { page_path: location.pathname, link_url: evtEl.href || '' });
    } else if (name === 'service_page') {
      gtag('event', 'service_page_click', { page_path: location.pathname, link_url: evtEl.href || '' });
    }
  }, true);

  if (document.body && document.body.hasAttribute('data-conversion-lead')) {
    gtag('event', 'generate_lead', { page_path: location.pathname });
  }

  if (document.body && document.body.hasAttribute('data-guide')) {
    gtag('event', 'guide_view', {
      page_path: location.pathname,
      guide_slug: document.body.getAttribute('data-guide') || '',
      guide_service: document.body.getAttribute('data-guide-service') || '',
    });
  }
})();
