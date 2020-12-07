// для получения текста использую https://fish-text.ru/api
// https://fish-text.ru/get вернет по умолчанию 3 предложения в формате JSON.
// Данное приложение запрашивает 4 предложения, это более 500 символов.

'use strict';

import { initControlBtn } from './start-stop.js';
import { initTimeSetting } from './timer.js';

window.addEventListener('load', () => {
  initTimeSetting();
  initControlBtn();
});
