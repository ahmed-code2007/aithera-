(function () {
  var STORE = 'lang';
  var dict = window.__UI__ || {};
  function current() {
    return localStorage.getItem(STORE) || 'fr';
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var v = dict[lang] && dict[lang][key];
      if (v) el.textContent = v;
    });
    document.querySelectorAll('[data-fr][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.textContent = lang === 'fr' ? 'EN' : 'FR';
      b.setAttribute('aria-label', lang === 'fr' ? 'Switch to English' : 'Passer en français');
    });
    window.__LANG__ = lang;
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }
  function toggle() {
    var next = current() === 'fr' ? 'en' : 'fr';
    localStorage.setItem(STORE, next);
    apply(next);
  }
  document.addEventListener('DOMContentLoaded', function () {
    apply(current());
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.addEventListener('click', toggle);
    });
  });
  window.__i18nApply = apply;
  window.__i18nCurrent = current;
})();
