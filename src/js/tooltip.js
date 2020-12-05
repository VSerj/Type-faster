import { makeElem } from './makeElem';

// функция создает ToolTip над указаным элементом,
// добавляет в доку и додает идентификатор семантики
// для возможности удалять необходимое и других целей
export function showTopToolTip(text, where, idSemantic = 'common') {
  const box = where.getBoundingClientRect();
  const toolTip = makeElem({ textElem: text, classElem: 'tooltip' });

  toolTip.setAttribute('data-tooltip', idSemantic);
  toolTip.style.top = `${box.top + pageYOffset - toolTip.offsetHeight - 6}px`;
  toolTip.style.left = `${
    box.left + box.width / 2 + pageXOffset - toolTip.offsetWidth / 2
  }px`;
}
// Для проверки и удаления подсказки, если она активна.
export function removeTooltip(idSemantic) {
  let tooltip = document.querySelector(`div[data-tooltip="${idSemantic}"]`);

  if (tooltip) {
    tooltip.remove();
    // очитска памяти
    tooltip = null;
  }
}
