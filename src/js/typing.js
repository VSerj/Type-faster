'use strict';

import { states } from './states.js';
import { textField, textInput } from './vars.js';
import { countdown } from './timer.js';
import { removeTooltip } from './tooltip.js';
import { stats } from './utils_dev/statistics.js';
import { showModalWindow } from './modal-window.js';
import { end } from './start-stop.js';

// Для слушателя keydown
export function initTyping() {
  if (!states.isTyping) {
    states.isTyping = true;
    textField.firstElementChild.classList.add('current'); // Устанавливаем текущий символ
    textInput.addEventListener('input', handleInputChars);
    removeTooltip('prestart'); // Удаляем подсказку
    countdown(); // Запускаем обратный отсчет
  }

  textInput.focus(); //Фокусируем в невидиме поле
}

export function handleInputChars() {
  if (!states.isTyping) return;

  const typedString = textInput.value;
  const typedChar = typedString.charAt(typedString.length - 1); // последний символ строки
  const currentCharSpan = textField.querySelector('.char.current');
  const currentChar = textField.querySelector('.char.current').textContent; // текущий символ из текста

  if (typedChar === currentChar) {
    currentCharSpan.classList.contains('error')
      ? currentCharSpan.classList.remove('error')
      : (stats.numberOftypedChars += 1);

    currentCharSpan.classList.add('correct'); // Выделить символ как корректный
    currentCharSpan.classList.remove('current');

    if (!currentCharSpan.nextElementSibling) { // Когда все сиволы набраны
      end(); // переходим в стартовое положение
      return showModalWindow('<h4>Amazing<h>'); //Выходим из фукции + показать результат
    }

    return currentCharSpan.nextElementSibling.classList.add('current'); // Следующий символ
  }

  if (currentCharSpan.classList.contains('error')) return; //Уже есть ошибка

  currentCharSpan.classList.add('error'); // Выделить символ как ошибка
  stats.numberOfErrors += 1;
}

