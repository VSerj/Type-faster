export function makeElem({
  typeElem = 'div',
  classElem = '',
  textElem,
  where = document.body,
}) {
  const el = document.createElement(typeElem);

  el.className = classElem;
  el.textContent = textElem;
  where.append(el);

  return el;
}
