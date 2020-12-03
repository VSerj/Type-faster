// для получения текста использую https://fish-text.ru/api
// https://fish-text.ru/get вернет по умолчанию 3 предложения в формате JSON.
// Данное приложение запрашивает 4 предложения, это более 500 символов.

'use strict';

import { startBtn, stopBtn } from './vars.js';
import { handleTimeSetting } from './timer.js';
import { textfromApi } from './text-from-api.js';
import { states } from './states.js';

window.addEventListener('load', () => {
  handleTimeSetting();
  startBtn.addEventListener('click', () => {
    states.isStart = true;
    startBtn.classList.add('disabled');
    stopBtn.classList.remove('disabled');
    textfromApi();
  });
});
