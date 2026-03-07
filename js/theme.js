/* ============================================
   TalkTime — theme.js
   Shared theme toggle logic
   ============================================ */

/**
 * Toggle between dark and light theme.
 * Stores preference in localStorage.
 */
function toggleTheme() {
  document.documentElement.classList.toggle('light');
  const isDark = !document.documentElement.classList.contains('light');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* Apply saved theme on page load */
(function () {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light');
  }
})();