document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const heroBg = document.querySelector('.hero-bg');
  const year = document.getElementById('year');
  const form = document.getElementById('contactForm');

  // Set current year
  year.textContent = new Date().getFullYear();

  // BURGER MENU TOGGLE
  const burgerLines = burger.querySelectorAll('span');
  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('open');

    if (isOpen) {
      burgerLines[0].style.transform = 'translateY(6px) rotate(45deg)';
      burgerLines[1].style.opacity = '0';
      burgerLines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
    } else {
      burgerLines[0].style.transform = '';
      burgerLines[1].style.opacity = '';
      burgerLines[2].style.transform = '';
    }
  });

  // Close nav on window resize > 720px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 720) {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burgerLines[0].style.transform = '';
      burgerLines[1].style.opacity = '';
      burgerLines[2].style.transform = '';
    }
  });

  // HERO PARALLAX
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const scale = 1 + Math.min(scrolled / 4000, 0.06);
    if (heroBg) heroBg.style.transform = `scale(${scale}) translateY(${scrolled * 0.02}px)`;
  });

  // CONTACT FORM TO WHATSAPP
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const name = encodeURIComponent(form.name.value.trim());
    const phone = encodeURIComponent(form.phone.value.trim());
    const message = encodeURIComponent(form.message.value.trim());
    const whatsappNumber = '96176634625'; // your number without +

    const text = `Hello!%0AName: ${name}%0APhone/WhatsApp: ${phone}%0AMessage: ${message}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      form.reset();
    }, 500);
  });

  // SMOOTH ANCHOR SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 86;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close nav if open
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burgerLines[0].style.transform = '';
        burgerLines[1].style.opacity = '';
        burgerLines[2].style.transform = '';
      }
    });
  });
});
