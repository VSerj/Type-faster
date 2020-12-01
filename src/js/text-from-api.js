'use strict';

import { ApiError, HttpError } from './custom-error.js';
import { tempText } from './temp-text.js';
import { textField } from './vars.js';

export function textfromApi() {
  textField.innerHTML = 'Подождите, текст загружается...'
  fetch('https://fish-text.ru/get?number=4')
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
  return (textField.innerHTML = text.replace(
    /./g,
    `<span class="char">$&</span>`
  ));
}

function showErrorText(text) {
  // Первая проверка для устарнения дублирования.
  if (textField.querySelector('.api-text-field__errorOverlay')) return;
  if (typeof text !== 'string') return;

  const overlay = document.createElement('div');

  overlay.className = 'api-text-field__errorOverlay';
  overlay.textContent = text;
  textField.append(overlay);
  // добавляю свой текст
  overlay.addEventListener('click', () => {
    showText(tempText);
    overlay.remove();
  });
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
