// для получения текста использую https://fish-text.ru/api
// https://fish-text.ru/get вернет по умолчанию 3 предложения в формате JSON.
// Данное приложение запрашивает 4 предложения, это более 500 символов.

'use strict';

import { initSwitchNightTheme } from './night_theme.js';
import { initControlBtn } from './start-stop.js';
import { showStats } from './statistics-btn.js';
import { initTimeSetting } from './timer.js';
import { statsBtn, textInput } from './vars.js';

document.addEventListener('DOMContentLoaded', initSwitchNightTheme);

window.addEventListener('load', () => {
  initTimeSetting();
  initControlBtn();
  textInput.oncut = textInput.oncopy = textInput.onpaste = () => false;
  statsBtn.addEventListener('click', showStats);
});
