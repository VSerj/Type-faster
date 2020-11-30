import { ApiError, HttpError } from './custom-error.js';
import { tempText } from './temp-text.js';
import { textField } from './vars.js';

export function textfromApi() {
  fetch('https://fish-text.ru/get?number=4')
    .then(status)
    .then(json)
    .then(jsonStatus)
    .then(showText)
    .catch(handleError);
}

function status(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new HttpError(response.statusText));
  }
}

function json(response) {
  return response.json();
}

// проверка статуса внутри json из API
function jsonStatus(json) {
  const { status, text, errorCode } = json;
  if (status === 'success') {
    return Promise.resolve(text);
  }
  if (status === 'error') {
    return Promise.reject(new ApiError(errorCode));
  }
}

// Добавляет текст в поле.
function showText(text) {
  return (textField.innerHTML = text.replace(
    /./g,
    `<span class=char>$&</span>`
  ));
}

function showErrorText(text) {
  // Первая проверка временно, добавить один раз
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
  console.log(error.name);
  // TypeError прилетает из примера https://1
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
