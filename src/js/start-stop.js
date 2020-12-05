import { startBtn, stopBtn, radioBtns } from './vars.js';
import { handleTimeSetting } from './timer.js';
import { textfromApi } from './text-from-api.js';
import { states } from './states.js';
import { startTyping } from './temp-helpers-dev.js';
import { removeTooltip } from './tooltip.js';

export function initControlBtn() {
  startBtn.addEventListener('click', initStatBtn);
  stopBtn.addEventListener('click', initStopBtn);
}

function initStatBtn(e) {
  console.log(e.target);
  states.isStart = true;
  // Запрещаю выбора времени, выбор недоступен.
  radioBtns.style.pointerEvents = 'none';
  startBtn.classList.add('disabled');
  stopBtn.classList.remove('disabled');
  textfromApi();
  // обратный отсчет и фокус в невидимый nput
  document.addEventListener('keydown', startTyping);
}

function initStopBtn() {
  // пока не покажется текст в поле
  if (states.isLoading) return;

  end();
  // Для проверки и удаления подсказки, если она активна.
  removeTooltip('prestart');
}

export function end() {
  states.isTyping = false;
  states.isStart = false;
  startBtn.classList.remove('disabled');
  stopBtn.classList.add('disabled');
  radioBtns.style.pointerEvents = 'auto';
  document.removeEventListener('keydown', startTyping);
  handleTimeSetting();
}
