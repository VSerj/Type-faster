// для получения текста использую https://fish-text.ru/api
// https://fish-text.ru/get вернет по умолчанию 3 предложения в формате JSON.
// Данное приложение запрашивает 4 предложения, это более 500 символов.

'use strict';

import { startBtn, stopBtn, radioBtns } from './vars.js';
import { handleTimeSetting } from './timer.js';
import { textfromApi } from './text-from-api.js';
import { states } from './states.js';

window.addEventListener('load', () => {
  handleTimeSetting();
  startBtn.addEventListener('click', () => {
    states.isStart = true;
    // блокирую клик по блоку для невозможности выбора времени.
    radioBtns.style.pointerEvents = 'none';
    startBtn.classList.add('disabled');
    stopBtn.classList.remove('disabled');
    textfromApi();
  });
  stopBtn.addEventListener('click', () => {
    // будем ждать текста (временно)
    if (states.isLoading) return;

    states.isStart = false;
    startBtn.classList.remove('disabled');
    stopBtn.classList.add('disabled');
    radioBtns.style.pointerEvents = 'auto';
    // Для проверки и удаления подсказки, если она активна.
    const tooltipBtn = document.querySelector('div[data-tooltip="btn"]');

    if (tooltipBtn) {
      tooltipBtn.remove();
    }
  });
});
