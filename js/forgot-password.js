/* ============================================
   TalkTime — forgot-password.js
   ============================================ */

/**
 * Handle the "send reset link" form submission.
 * Shows success state after simulated API call.
 * @param {Event} e
 */
function handleReset(e) {
  e.preventDefault();

  const email = document.getElementById('reset-email').value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('Please enter a valid email address.');
    return;
  }

  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // TODO: Replace with real API call
  setTimeout(() => {
    // Show success state
    document.getElementById('form-state').style.display = 'none';
    const successEl = document.getElementById('success-state');
    successEl.style.display = 'block';
    document.getElementById('sent-email').textContent = email;
  }, 1200);
}

/**
 * Handle "Resend email" click.
 * Throttles so user can't spam the button.
 * @param {Event} e
 */
function resend(e) {
  const el = e.target;
  el.textContent = 'Sent!';
  el.style.pointerEvents = 'none';

  // Re-enable after 4 seconds
  setTimeout(() => {
    el.textContent = 'Resend email';
    el.style.pointerEvents = '';
  }, 4000);
}

/**
 * Show an inline error message below the email field.
 * @param {string} message
 */
function showError(message) {
  let el = document.getElementById('reset-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'reset-error';
    el.style.cssText = 'color: var(--error); font-size: 13px; margin-top: -8px; margin-bottom: 12px;';
    const btn = document.getElementById('submit-btn');
    btn.parentNode.insertBefore(el, btn);
  }
  el.textContent = message;
}