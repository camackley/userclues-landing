/*
  Behaviour for the User Clues landing page.  Handles form validation, local
  storage of signups (to simulate backend functionality), dynamic year in the
  footer, and the back‑to‑top button visibility.
*/

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero-title');

  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetHeight;
    if (window.scrollY > heroBottom - 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Insert current year into footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Back‑to‑top button logic
  const backToTop = document.querySelector('.back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  /**
   * Validate a simple email address using regex.
   * @param {string} email
   * @returns {boolean}
   */
  function validateEmail(email) {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(email);
  }

  /**
   * Handle sign‑up form submission.  Saves entries in localStorage and shows
   * feedback messages without refreshing the page.
   * @param {HTMLFormElement} form
   * @param {HTMLInputElement} emailInput
   * @param {HTMLElement} messageContainer
   */
  function handleSignup(form, emailInput, messageContainer) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      if (!validateEmail(email)) {
        messageContainer.textContent = 'Please enter a valid email address.';
        messageContainer.style.color = 'var(--error)';
        return;
      }
      // Save email to localStorage (simulate a backend call)
      try {
        const list = JSON.parse(localStorage.getItem('userclues_waitlist') || '[]');
        list.push({ email: email, date: new Date().toISOString() });
        localStorage.setItem('userclues_waitlist', JSON.stringify(list));
      } catch (err) {
        // In case localStorage is unavailable, fall back silently
      }
      messageContainer.textContent = "Thanks for signing up! We'll keep you posted.";
      messageContainer.style.color = 'var(--success)';
      emailInput.value = '';
    });
  }

  // Bind the two sign‑up forms
  const signupFormTop = document.getElementById('signup-form');
  const signupEmailTop = document.getElementById('email');
  const signupMessageTop = document.getElementById('form-message');
  if (signupFormTop && signupEmailTop && signupMessageTop) {
    handleSignup(signupFormTop, signupEmailTop, signupMessageTop);
  }
  const signupFormBottom = document.getElementById('bottom-form');
  const signupEmailBottom = document.getElementById('email-cta');
  const signupMessageBottom = document.getElementById('bottom-message');
  if (signupFormBottom && signupEmailBottom && signupMessageBottom) {
    handleSignup(signupFormBottom, signupEmailBottom, signupMessageBottom);
  }
});