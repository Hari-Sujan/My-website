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

    if (header) {
      header.classList.toggle('sticky', scrollPos > 80);
    }

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

  // 4. Contact Form WhatsApp and Gmail Handler
  const btnSendWhatsApp = document.getElementById('btn-send-whatsapp');
  const btnSendGmail = document.getElementById('btn-send-gmail');
  const feedback = document.getElementById('form-feedback');

  function getFormData() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim() || 'N/A';
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !subject || !message) {
      if (feedback) {
        feedback.textContent = 'Please fill out all required fields (*)';
        feedback.className = 'form-feedback error';
      }
      return null;
    }

    if (feedback) {
      feedback.style.display = 'none';
    }

    return { name, email, phone, subject, message };
  }

  // Send via WhatsApp
  if (btnSendWhatsApp) {
    btnSendWhatsApp.addEventListener('click', () => {
      const data = getFormData();
      if (!data) return;

      const waMessage = `*New Portfolio Message*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Subject:* ${data.subject}\n\n` +
        `*Message:*\n${data.message}`;

      const waUrl = `https://wa.me/917339260108?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');

      if (feedback) {
        feedback.textContent = 'Opening WhatsApp with your message...';
        feedback.className = 'form-feedback success';
      }
    });
  }

  // Send via Gmail
  if (btnSendGmail) {
    btnSendGmail.addEventListener('click', () => {
      const data = getFormData();
      if (!data) return;

      const emailSubject = `[Portfolio Contact] ${data.subject}`;
      const emailBody = `Hi Hari,\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=harisujan04@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailUrl, '_blank');

      if (feedback) {
        feedback.textContent = 'Opening Gmail compose tab with your inquiry...';
        feedback.className = 'form-feedback success';
      }
    });
  }
});
