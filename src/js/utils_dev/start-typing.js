// Сдесь хранятся временные вспомагатильные штуки,
// которые еще не разработаны,
// но необходимы для тестирования текущих разработок.

import { states } from '../states.js';
import { textInput } from '../vars.js';
import { countdown } from '../timer.js';
import { removeTooltip } from '../tooltip.js';

// Для слушателя keydown при старте 
// -запускаем обратный отсчет
// -удаляем подсказку
// -ставим фокус в невидиме поле, для будущей обработки текста
export function startTyping() {
  if (!states.isTyping) {
    states.isTyping = true;
    removeTooltip('prestart');
    countdown();
  }
  textInput.focus();
}
