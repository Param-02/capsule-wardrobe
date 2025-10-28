const yearEls = document.querySelectorAll('#year');
if (yearEls.length) {
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('primary-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const currentPage = document.body?.dataset?.page;
const navItems = document.querySelectorAll('.main-nav li');
if (currentPage && navItems.length) {
  navItems.forEach((item) => {
    const link = item.querySelector('a');
    if (!link) return;
    const href = link.getAttribute('href');
    const isHome = currentPage === 'home' && href.endsWith('index.html');
    const matchesPage = href.includes(`${currentPage}.html`);
    if (isHome || matchesPage) {
      item.classList.add('active');
    }
  });
}
