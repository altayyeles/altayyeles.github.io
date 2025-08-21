// Tema toggle (localStorage ile kalıcı)
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const savedTheme = localStorage.getItem('altay-theme') || 'light';
html.setAttribute('data-theme', savedTheme);

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('altay-theme', next);
}
themeToggle?.addEventListener('click', toggleTheme);
themeToggleMobile?.addEventListener('click', toggleTheme);

// Hamburger menü
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => {
  const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
  mobileBtn.setAttribute('aria-expanded', String(!expanded));
  mobileMenu.setAttribute('aria-hidden', String(expanded));
});

// Yıl
document.getElementById('year').textContent = new Date().getFullYear();

// İletişim formu fallback (Formspree yoksa mailto ile aç)
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
  const action = contactForm.getAttribute('action') || '';
  if (!action.includes('formspree.io')) {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = encodeURIComponent(data.get('name') || '');
    const email = encodeURIComponent(data.get('email') || '');
    const message = encodeURIComponent(data.get('message') || '');
    const body = `Ad Soyad: ${name}%0AEmail: ${email}%0A%0AMesaj:%0A${message}`;
    window.location.href = `mailto:altay@example.com?subject=Portföy%20İletişim&body=${body}`;
  }
});

// Smooth scroll offset (mobil menü kapansın)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    if (mobileMenu?.getAttribute('aria-hidden') === 'false') {
      mobileBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
});
