'use strict';

import { ApiError, HttpError } from './custom-error.js';
import { createElem } from './createElem.js';
import { states } from './states.js';
import { tempText } from './utils_dev/temp-text.js';
import { showTopToolTip } from './tooltip.js';
import { textField } from './vars.js';

export function textfromApi() {
  states.isLoading = true;

  textField.innerHTML = `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  `;

  fetch('https://fish-text.ru/get?numbеr=4')
    .then(response =>
      response.ok
        ? response.json()
        : Promise.reject(new HttpError(response.statusText))
    )
    // проверка статуса внутри json из API
    .then(({ status, text, errorCode }) =>
      status === 'success' ? text : Promise.reject(new ApiError(errorCode))
    )
    .then(showText)
    .catch(handleError);
}

// Добавляет текст в поле.
function showText(text) {
  states.isLoading = false;
  showTopToolTip('Начните печать для запуска таймера', textField, 'prestart');

  return (textField.innerHTML = text.replace(
    /./g,
    `<span class="char">$&</span>`
  ));
}

function showErrorText(text) {
  // Первая проверка для устарнения дублирования.
  if (textField.querySelector('.text-field__errorOverlay')) return;
  if (typeof text !== 'string') return;

  textField.innerHTML = '';

  let overlay = createElem({
    classElem: 'text-field__errorOverlay',
    textElem: text,
    where: textField,
  });

  // Добавляю свой текст. При клике оверлей удаляем. + очистка памяти
  const overlayHandler = () => {
    showText(tempText);
    overlay.remove();
    overlay.removeEventListener('click', overlayHandler);
    overlay = null;
  };

  overlay.addEventListener('click', overlayHandler);
}

function handleError(error) {
  if (error instanceof HttpError || error.name === 'TypeError') {
    showErrorText(`Сервис генерации случайного текста недоступен. 
      Запустить с текстом, что есть у нас? Для продолжения кликните 
      в это поле...`);
  }
  if (error instanceof ApiError) {
    const info = error.code === '21' ? ' - 120с' : ' - не известно на сколько';
    showErrorText(`Сервис генерации случайного текста недоступен ${info}. 
    Запустить с текстом, что есть у нас? Для продолжения кликните 
    в это поле...`);
  }
}
