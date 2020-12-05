import { startBtn, stopBtn, radioBtns } from './vars.js';
import { textfromApi } from './text-from-api.js';
import { states } from './states.js';
import { startTyping } from './temp-helpers-dev.js';
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
  // обратный отсчет и фокус в невидимый input
  document.addEventListener('keydown', startTyping);
}

function initStopBtn() {
  // пока не покажется текст в поле
  if (states.isLoading) return;

  end();
  // Для проверки и удаления подсказки, если она активна.
  removeTooltip('prestart');
}

function toggleControlParams() {
  states.isStart = !states.isStart;
  radioBtns.classList.toggle('disabled');
  startBtn.classList.toggle('disabled');
  stopBtn.classList.toggle('disabled');
}
