import { startBtn, stopBtn, radioBtns } from './vars.js';
import { textfromApi } from './text-from-api.js';
import { states } from './states.js';
import { startTyping } from './utils_dev/start-typing.js';
import { removeTooltip } from './tooltip.js';
import { setTime } from './timer.js'

export function initControlBtn() {
  startBtn.addEventListener('click', initStatBtn);
  stopBtn.addEventListener('click', initStopBtn);
}

export function end() {
  states.isTyping = false;
  toggleControlParams();
  document.removeEventListener('keydown', startTyping);
  setTime(+radioBtns.querySelector('input:checked').value); // временно
}

function initStatBtn() {
  toggleControlParams()
  textfromApi();
  document.addEventListener('keydown', startTyping); // Запускаем отсчет.
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
