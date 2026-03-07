/* ============================================
   TalkTime — register.js
   ============================================ */

/**
 * Toggle password field visibility.
 * @param {string} inputId
 * @param {HTMLElement} iconEl
 */
function togglePw(inputId, iconEl) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === 'password';
  input.type = isHidden ? 'text' : 'password';
  iconEl.textContent = isHidden ? '🙈' : '👁️';
}

/**
 * Validate username format (3–20 chars, letters/numbers/underscores).
 * @param {HTMLInputElement} el
 */
function validateUsername(el) {
  const hint = document.getElementById('username-hint');
  const valid = /^[a-zA-Z0-9_]{3,20}$/.test(el.value);
  const hasInput = el.value.length > 0;

  el.classList.toggle('error', hasInput && !valid);
  hint.className = 'hint' + (hasInput && !valid ? ' err' : '');
  hint.textContent = hasInput && !valid
    ? 'Username must be 3–20 characters: letters, numbers, underscores only.'
    : '3–20 characters — letters, numbers, underscores';
}

/**
 * Validate email format.
 * @param {HTMLInputElement} el
 */
function validateEmail(el) {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value);
  el.classList.toggle('error', el.value.length > 0 && !valid);
}

/**
 * Update the password strength indicator (4-bar).
 * @param {HTMLInputElement} el
 */
function checkStrength(el) {
  const v = el.value;
  let score = 0;
  if (v.length >= 8)           score++;
  if (/[A-Z]/.test(v))         score++;
  if (/[0-9]/.test(v))         score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const bar = document.getElementById('pw-strength');
  bar.className = 'pw-strength' + (v.length ? ' s' + score : '');
}

/**
 * Check that confirm-password matches password.
 * @param {HTMLInputElement} el
 */
function checkMatch(el) {
  const pw = document.getElementById('pw').value;
  el.classList.toggle('error', el.value.length > 0 && el.value !== pw);
}

/**
 * Handle registration form submission.
 * @param {Event} e
 */
function handleRegister(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email    = document.getElementById('email').value.trim();
  const pw       = document.getElementById('pw').value;
  const pw2      = document.getElementById('pw2').value;
  const terms    = document.getElementById('terms-check').checked;

  // Validate
  if (!username || !email || !pw || !pw2) {
    showFormError('Please fill in all fields.'); return;
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    showFormError('Invalid username format.'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormError('Please enter a valid email address.'); return;
  }
  if (pw !== pw2) {
    document.getElementById('pw2').classList.add('error');
    showFormError('Passwords do not match.'); return;
  }
  if (pw.length < 8) {
    showFormError('Password must be at least 8 characters.'); return;
  }
  if (!terms) {
    showFormError('You must agree to the Terms of Service.'); return;
  }

  const btn = document.getElementById('register-btn');
  btn.textContent = 'Creating account…';
  btn.disabled = true;

  // TODO: Replace with real API call
  setTimeout(() => {
    btn.textContent = 'Create Account';
    btn.disabled = false;
    showFormError('Demo mode: connect your backend to proceed.');
  }, 1400);
}

/**
 * Show an inline form error.
 * @param {string} message
 */
function showFormError(message) {
  let el = document.getElementById('register-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'register-error';
    el.style.cssText = 'color: var(--error); font-size: 13px; margin-bottom: 10px;';
    const btn = document.getElementById('register-btn');
    btn.parentNode.insertBefore(el, btn);
  }
  el.textContent = message;
}