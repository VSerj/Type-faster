'use strict';
import { AppError } from './custom-error.js';
import { end } from './start-stop.js';
import { states } from './states.js';
import { radioBtns } from './vars.js';

const timer = document.querySelector('.timer');
const timerNumber = timer.querySelector('.timer__number');
let time;

export function handleTimeSetting() {
  // установка времени в таймер после загрузки страницы.
  setTime(+radioBtns.querySelector('input[checked]').value);
  // установка времени из предоставленных опций.
  radioBtns.addEventListener('change', ({ target }) => {
    setTime(+target.value);
  });
}
// Обратный отсчет. На последних сек. увеличиваем таймер.
export function countdown() {
  timerNumber.textContent = `${--time}`;
  if (time < 4) {
    scaleTimer();
  }
  return time < 0 ? end() : setTimeout(countdown, 1000);
}

function setTime(selectedTime) {
  // Если нажато старт, то значения таймера не изменить.
  if (states.isStart) return;

  if (
    selectedTime === 0 || // значение "0" безсмысленно
    typeof selectedTime !== 'number' ||
    Number.isNaN(selectedTime)
  ) {
    // ошбика для дева
    throw new AppError('Некорректные данные для таймера');
  }

  time = selectedTime;
  timerNumber.textContent = `${selectedTime}`;
  scaleTimer();
}

// увеличивает таймер
function scaleTimer() {
  timer.classList.add('timer--scale');
  // Удаляем по завершении анимации обработчик и селектор для анимации
  const removeScale = () => {
    timer.classList.remove('timer--scale');
    timer.removeEventListener('animationend', removeScale);
  };

  timer.addEventListener('animationend', removeScale);
}
