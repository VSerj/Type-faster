'use strict';

import { isStart } from './states.js';

const timer = document.querySelector('.timer');
const timeNumber = timer.querySelector('.timer__number');
const radioBtns = document.querySelector('.radio-buttons');

export function handleCountdownTiming() {
  if (isStart) return;
  radioBtns.addEventListener('change', ({ target }) => {
    timeNumber.textContent = target.value;
  });
}
