// для получения текста использую https://fish-text.ru/api
// https://fish-text.ru/get вернет по умолчанию 3 предложения в формате JSON
class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HttpError';
  }
}

class ApiError extends Error {
  constructor(errorCode) {
    super(errorCode);
    this.name = 'ApiError';
    this.status = errorCode;
  }
}

function status(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new HttpError('API недоступен'));
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
// Первый параметр - строка, второй - для оборачивания символов в span
function insertIntoField(text, isCharAsDomElem = false) {
  if (isCharAsDomElem) {
    return textField.innerHTML = text.replace(/./g, `<span class=char>$&</span>`)
    // return textField.insertAdjacentHTML('beforeend', HTML);
  }

  return (textField.textContent = text);
}

function showText(text) {
  const start = Date.now();

  insertIntoField(text, true);

  const res = start - Date.now();
  console.log(res);
}

function handleError(error) {
  if (error instanceof HttpError) {
    console.log('недоступен API');
    // Если постоянная, сообщить "в процессе воставноления" и предложить свой текст
  }
  if (error instanceof ApiError) {
    console.log(`${error.errorCode} недоступен API`);
    // Уведомить пользователя, будет ли возможность показывть случайный текст.
    // Если блокировка временная, сколько ждать и предложить свой сохраненный текст
    // Если постоянная, сообщить "в процессе воставноления" и предложить свой текст
  }
}

const textField = document.querySelector('.api-text-field');
const textFieldoverlay = textField.querySelector('.api-text-field__overlay');
const startBtn = document.querySelector('.buttons__start');

startBtn.addEventListener('click', () => {
  fetch('https://fish-text.ru/get?number=4')
    .then(status)
    .then(json)
    .then(jsonStatus)
    .then(showText)
    // .then(showText)
    .catch(handleError);
});
