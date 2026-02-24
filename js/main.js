/* ============================================================
   ACADEMIC PERSONAL WEBSITE — MAIN JAVASCRIPT
   ============================================================ */

// ---- Year in footer ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleScrollTop();
});

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ---- Active nav link on scroll ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ---- Scroll to top button ----
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

// ---- Publication filter ----
const pubBtns  = document.querySelectorAll('.pub-btn');
const pubItems = document.querySelectorAll('.pub-item');

pubBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    pubBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    pubItems.forEach(item => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.style.display = 'flex';
        item.style.animation = 'fadeIn 0.3s ease';
      } else {
        item.style.display = 'none';
      }
    });

    // Hide year groups that have no visible items
    document.querySelectorAll('.pub-year-group').forEach(group => {
      const visible = Array.from(group.querySelectorAll('.pub-item'))
        .some(i => i.style.display !== 'none');
      group.style.display = visible ? 'block' : 'none';
    });
  });
});

// ---- Intersection Observer for fade-in animations ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe cards and items
document.querySelectorAll(
  '.research-card, .course-card, .pub-item, .news-item, .info-card, .contact-item'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ---- Profile image fallback ----
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    profileImg.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 220px; height: 220px; border-radius: 50%;
      background: linear-gradient(135deg, #1a3a5c 0%, #2a5298 100%);
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 5rem; border: 5px solid white;
      box-shadow: 0 8px 40px rgba(26,58,92,0.16);
    `;
    placeholder.innerHTML = '<i class="fas fa-user"></i>';
    profileImg.parentNode.insertBefore(placeholder, profileImg);
  });
}
