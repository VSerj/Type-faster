import { makeElem } from './makeElem';

export function showTopToolTip(text, where) {
  const box = where.getBoundingClientRect();
  const toolTip = makeElem({ textElem: text, classElem: 'tooltip' });

  toolTip.style.top = `${box.top + pageYOffset - toolTip.offsetHeight - 6}px`;
  toolTip.style.left = `${box.left + pageXOffset - 6}px`;
}
