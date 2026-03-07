/* ============================================
   TalkTime — login.js
   ============================================ */

/**
 * Toggle password field visibility.
 * @param {string} inputId - The id of the password input
 * @param {HTMLElement} iconEl - The eye icon element
 */
function togglePw(inputId, iconEl) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  iconEl.textContent = isHidden ? '🙈' : '👁️';
}

/**
 * Handle login form submission.
 * Replace the body with real auth logic (e.g. fetch to your API).
 * @param {Event} e
 */
function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  const btn = document.getElementById('login-btn');
  btn.textContent = 'Signing in…';
  btn.disabled = true;

  // TODO: Replace with real API call
  setTimeout(() => {
    // Simulate success — redirect to chat
    // window.location.href = 'chat.html';
    btn.textContent = 'Sign In';
    btn.disabled = false;
    showError('Demo mode: connect your backend to proceed.');
  }, 1400);
}

/**
 * Show an inline error message.
 * @param {string} message
 */
function showError(message) {
  let el = document.getElementById('login-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'login-error';
    el.style.cssText = 'color: var(--error); font-size: 13px; margin-top: -8px; margin-bottom: 12px;';
    const btn = document.getElementById('login-btn');
    btn.parentNode.insertBefore(el, btn);
  }
  el.textContent = message;
}