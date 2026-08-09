/* ═══════════════════════════════════════════════════════════════════
   TUȘE ANALYTICS LOADER — GA4
   Reads the ID from analytics-config.js. Does nothing until a real
   Measurement ID is set there. Loaded with `defer`, and the tag
   itself is injected `async`, so this never blocks rendering.

   Also fires two minimal, non-invasive conversion events that map
   directly to the acquisition funnel — no invasive tracking, no
   fingerprinting, no third party beyond Google's own gtag.js:

     app_store_click   — a store badge (App Store / Google Play) was
                          clicked, anywhere on the site.
     generate_lead      — a business enquiry was successfully
                          submitted (fires once, on the thank-you page,
                          which only loads after FormSubmit succeeds).
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
    // Conversion events still queue harmlessly into dataLayer even when
    // unconfigured, so nothing needs to change once a real ID is added.
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
    if (!link) return;
    var isAppStore = /apps\.apple\.com/.test(link.href);
    gtag('event', 'app_store_click', {
      store: isAppStore ? 'app_store' : 'google_play',
      link_url: link.href,
      page_path: location.pathname,
    });
  }, true);

  if (document.body && document.body.hasAttribute('data-conversion-lead')) {
    gtag('event', 'generate_lead', { page_path: location.pathname });
  }
})();
