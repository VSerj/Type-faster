'use strict';

import { ApiError, HttpError } from './custom-error.js';
import { states } from './states.js';
import { tempText } from './utils_dev/temp-text.js';
import { showTopToolTip } from './tooltip.js';
import { textField } from './vars.js';
import { showModalWindow } from './modal-window.js';
import { end } from './start-stop.js';

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

function handleError(error) {
  if (error instanceof HttpError || error.name === 'TypeError') {
    textField.innerHTML = '';

    showModalWindow(
      `
      <h4>Сервис генерации случайного текста недоступен.</h4>
      <p>Запустить с текстом, что есть у нас? Нажмите "Ок"</p>
      <p>Для отмены нажмите "Close"</p>`,
      {
        extraClass: 'error',
        customBtnText: 'Ок',
        helpHandlerCustomBtn: showText.bind(this, tempText),
        helpHandlerClose: end,
      }
    );
  }

  if (error instanceof ApiError) {
    textField.innerHTML = '';

    const info = error.code === '21' ? '2 минуты' : 'пока не известно';

    showModalWindow(
      `
      <h4>Сервис генерации случайного текста недоступен.</h4>
      <p>Сколько ждать: ${info}</p>
      <p>Запустить с текстом, что есть у нас? Нажмите "Ок"</p>
      <p>Для отмены нажмите "Close"</p>`,
      {
        extraClass: 'error',
        customBtnText: 'Ок',
        helpHandlerCustomBtn: showText.bind(this, tempText),
        helpHandlerClose: end,
      }
    );
  }
}
