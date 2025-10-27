const tabButtons = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.lookbook-panel');

function activateTab(targetId) {
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.target === targetId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
  });
  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === targetId);
  });
}

if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activateTab(button.dataset.target);
    });
  });
}
