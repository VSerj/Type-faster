'use strict';
import { AppError } from './custom-error.js';
import { isStart } from './states.js';

const timer = document.querySelector('.timer');
const timerNumber = timer.querySelector('.timer__number');
const radioBtns = document.querySelector('.radio-buttons');

export function handleTimeSetting() {
  if (isStart) return;

  setTime(+radioBtns.querySelector('input[checked]').value)
  radioBtns.addEventListener('change', ({ target }) => {
    setTime(+target.value)
  });
}

function setTime(time) {
  if (time == 0 || typeof time !== 'number') {
    throw new AppError('Некорректные данные для таймера');
  }

  timerNumber.textContent = `${time}`;
  timer.classList.add('timer--scale');
  timer.addEventListener('animationend', () => {
    timer.classList.remove('timer--scale');
  });
}
