/* ==========================================================================
   Hari Sujan - Modern Portfolio Interactive Features
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const header = document.querySelector('.header');
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  const sections = document.querySelectorAll('section');

  // 1. Mobile Menu Toggle
  if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
      });
    });
  }

  // 2. Sticky Header and Active Section Highlight on Scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header sticky styling
    if (header) {
      header.classList.toggle('sticky', scrollPos > 80);
    }

    // Scroll active link detection
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Dynamic Typewriter Effect for Hero Headline
  const phrases = [
    'modern web applications',
    'responsive UI/UX designs',
    'fast interactive interfaces',
    'clean, accessible code'
  ];
  const typewriterElem = document.getElementById('typewriter');
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typingSpeed = 80;
  const pauseTime = 1800;

  function typeEffect() {
    if (!typewriterElem) return;

    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriterElem.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typewriterElem.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
    }

    let delay = typingSpeed;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }

  typeEffect();

  // 4. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = document.getElementById('name')?.value || 'Friend';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="bx bx-loader-alt bx-spin"></i>`;
      }

      // Simulate sending inquiry
      setTimeout(() => {
        if (feedback) {
          feedback.textContent = `Thank you, ${nameVal}! Your message has been sent successfully.`;
          feedback.className = 'form-feedback success';
        }

        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>Sent!</span> <i class="bx bx-check"></i>`;

          setTimeout(() => {
            submitBtn.innerHTML = `<span>Send Message</span> <i class="bx bx-send"></i>`;
            if (feedback) {
              feedback.style.display = 'none';
            }
          }, 4500);
        }
      }, 900);
    });
  }
});
