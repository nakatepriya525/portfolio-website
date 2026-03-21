// =====================
// THEME TOGGLE
// =====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
if (localStorage.getItem('theme') === 'light') body.classList.add('light');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
});

// =====================
// MOBILE MENU
// =====================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  mobileMenu.classList.remove('open');
}

// =====================
// NAV SCROLL EFFECT
// =====================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.style.padding = '0.8rem 2.5rem';
  } else {
    nav.style.padding = '1.2rem 2.5rem';
  }
});

// =====================
// SCROLL REVEAL
// =====================
const revealElements = document.querySelectorAll('.section-title, .skill-card, .project-card, .about-grid, .contact-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// =====================
// SKILL BAR ANIMATION
// =====================
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
  barObserver.observe(card);
});

// =====================
// CONTACT FORM
// =====================
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Basic validation
  if (!name || !email || !message) {
    formNote.textContent = '⚠️ Please fill in all fields.';
    formNote.style.color = '#e57373';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formNote.textContent = '⚠️ Please enter a valid email address.';
    formNote.style.color = '#e57373';
    return;
  }

  // Simulate sending
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    formNote.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formNote.style.color = '#4caf50';
    form.reset();
    btn.textContent = 'Send Message ✉';
    btn.disabled = false;
  }, 1500);
});

// =====================
// ACTIVE NAV LINK
// =====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

// =====================
// TYPING EFFECT (Hero sub)
// =====================
const roles = [
  'BSc IT Student & Aspiring Web Developer',
  'Frontend Developer',
  'Python Enthusiast',
  'Full Stack Learner',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const heroSub = document.querySelector('.hero-sub');
const originalText = heroSub.innerHTML;

// Start typing after page loads
setTimeout(() => {
  heroSub.innerHTML = '';
  const typeSpan = document.createElement('span');
  heroSub.appendChild(typeSpan);
  heroSub.insertAdjacentHTML('beforeend', '<br>Building the web, one line at a time.');
  typeRole(typeSpan);
}, 800);

function typeRole(el) {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    el.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(() => typeRole(el), 2000);
      return;
    }
  } else {
    el.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  const speed = isDeleting ? 50 : 90;
  setTimeout(() => typeRole(el), speed);
}
