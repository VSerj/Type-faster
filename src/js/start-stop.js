'use strict';

import { startBtn, stopBtn, radioBtns, textInput } from './vars.js';
import { textfromApi } from './text-from-api.js';
import { states } from './states.js';
import { initTyping, handleInputChars } from './typing.js';
import { removeTooltip } from './tooltip.js';
import { setTime } from './timer.js';
import { stats } from './statistics.js';
import { showModalWindow } from './modal-window.js';
import { clearUiIndicator } from './utils_dev/indicator.js';

export function initControlBtn() {
  startBtn.addEventListener('click', initStatBtn);
  stopBtn.addEventListener('click', initStopBtn);
}

export function end() {
  states.isTyping = false;
  document.removeEventListener('keydown', initTyping);
  textInput.removeEventListener('input', handleInputChars);
  textInput.blur();
  textInput.value = '';
  clearInterval(stats.timeIdInterval);
  clearUiIndicator();
  toggleControlParams();
  showModalWindow(`${stats.createCurrentStatsHtml()}`, {
    helpHandlerClose: stats.clearStats.bind(stats),
  });
  setTime(+radioBtns.querySelector('input:checked').value);
  stats.updateStatsinLocalStorage();
}

function initStatBtn() {
  toggleControlParams();
  textfromApi();
  document.addEventListener('keydown', initTyping);
}

function initStopBtn() {
  if (states.isLoading) return; // Пока не покажется текст в поле

  end();
  removeTooltip('prestart'); // Проверка на существование и удаления подсказки.
}

function toggleControlParams() {
  states.isStart = !states.isStart;
  radioBtns.classList.toggle('disabled');
  startBtn.classList.toggle('disabled');
  stopBtn.classList.toggle('disabled');
}
