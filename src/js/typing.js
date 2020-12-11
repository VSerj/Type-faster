'use strict';

import { states } from './states.js';
import { textField, textInput, radioBtns} from './vars.js';
import { countdown } from './timer.js';
import { removeTooltip } from './tooltip.js';
import { stats } from './statistics.js';
import { showModalWindow } from './modal-window.js';
import { end } from './start-stop.js';
import { changeUiIndicator } from './utils_dev/indicator.js';

// Для слушателя keydown
export function initTyping() {
  if (!states.isTyping) {
    states.isTyping = true;
    stats.startDate = new Date();
    stats.timeLimit = +radioBtns.querySelector('input:checked').value;
    textField.firstElementChild.classList.add('current'); // Устанавливаем текущий символ
    textInput.addEventListener('input', handleInputChars);
    countdown(); // Запускаем обратный отсчет
    removeTooltip('prestart'); // Удаляем подсказку
    stats.initSpeedTyping(changeUiIndicator);
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
    currentCharSpan.classList.contains('error') &&
      currentCharSpan.classList.remove('error');

    stats.addCorrectChar();
    currentCharSpan.classList.add('correct'); // Выделить символ как корректный
    currentCharSpan.classList.remove('current');

    if (!currentCharSpan.nextElementSibling) { // Когда все сиволы набраны
      end(); // переходим в стартовое положение
      return showModalWindow(`${stats.createStatsHtml}`, {
        helpHandlerClose: stats.clearStats.bind(stats),
      }); //Выходим из фукции + показать результат
    }

    return currentCharSpan.nextElementSibling.classList.add('current'); // Следующий символ
  }

  if (currentCharSpan.classList.contains('error')) return; //Уже есть ошибка

  currentCharSpan.classList.add('error'); // Выделить символ как ошибка
  stats.numberOfErrors += 1;
}
