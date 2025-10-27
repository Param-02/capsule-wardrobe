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
