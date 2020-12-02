'use strict';
import { AppError } from './custom-error.js';
import { isStart } from './states.js';

const timer = document.querySelector('.timer');
const timerNumber = timer.querySelector('.timer__number');
const radioBtns = document.querySelector('.radio-buttons');

export function handleCountdownTiming() {
  // if (isStart) return;
  radioBtns.addEventListener('change', ({ target }) => {
    const inputNumber = +target.value;

    if (inputNumber == 0 || typeof inputNumber !== 'number') {
      throw new AppError('Некорректные данные для таймера');
    }

    timerNumber.textContent = `${inputNumber}`;
    timer.classList.add('timer--scale');
    timer.addEventListener('animationend', () => {
      timer.classList.remove('timer--scale');
    });
  });
}
