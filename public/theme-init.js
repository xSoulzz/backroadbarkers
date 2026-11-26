// Apply the saved preference before the first paint and React hydration.
(function () {
 var night = false;
 try { night = localStorage.getItem('barkers-theme') === 'evergreen'; } catch (_) {}
 document.documentElement.dataset.theme = night ? 'night' : 'day';
 document.documentElement.dataset.galleryTheme = night ? 'evergreen' : 'cream';
 document.documentElement.style.colorScheme = night ? 'dark' : 'light';
 var meta = document.querySelector('meta[name="theme-color"]');
 if (meta) meta.setAttribute('content', night ? '#071f18' : '#173d30');
})();
