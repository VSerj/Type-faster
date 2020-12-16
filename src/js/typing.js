'use strict';

import { states } from './states.js';
import { textField, textInput, radioBtns } from './vars.js';
import { countdown } from './timer.js';
import { removeTooltip } from './tooltip.js';
import { stats } from './statistics.js';
import { showModalWindow } from './modal-window.js';
import { end } from './start-stop.js';
import { changeUiIndicator } from './indicator.js';

// Для слушателя keydown
export function initTyping() {
  if (states.isLoading) return;

  if (!states.isTyping) {
    states.isTyping = true;
    stats.startDate = Date.now();
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
  const currentCharSpanClassList = currentCharSpan.classList;
  const currentChar = currentCharSpan.textContent; // текущий символ из текста

  if (typedChar === currentChar) {
    currentCharSpanClassList.contains('error') &&
      currentCharSpanClassList.remove('error');

    stats.addCorrectChar();
    currentCharSpanClassList.add('correct'); // Выделить символ как корректный
    currentCharSpanClassList.remove('current');

    if (!currentCharSpan.nextElementSibling) { // Когда все сиволы набраны
      end(); // переходим в стартовое положение
      return showModalWindow(`${stats.createCurrentStatsHtml}`, {
        helpHandlerClose: stats.clearStats.bind(stats),
      }); //Выходим из фукции + показать результат
    }

    return currentCharSpan.nextElementSibling.classList.add('current'); // Следующий символ
  }

  if (currentCharSpanClassList.contains('error')) return; //Уже есть ошибка

  currentCharSpanClassList.add('error'); // Выделить символ как ошибка
  stats.numberOfErrors += 1;
}
