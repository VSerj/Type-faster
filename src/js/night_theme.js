'use strict';

export function initSwitchNightTheme() {
  if (localStorage.getItem('night-theme') === 'true') {
    document.querySelector('input[name="theme"]').checked = true;
    document.body.classList.toggle(`night-theme`);
  }

  document
    .querySelector('.toggle-theme')
    .addEventListener('change', ({ target: { checked } }) => {
      document.body.classList.toggle('night-theme');
      localStorage.setItem('night-theme', `${checked}`);
    });
}
