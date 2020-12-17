// Если 2Хвысота текущего символаlet

export function observeScrollUpText(char, observationArea) {
  const {
    height: charHeight,
    left: charCoordLeft,
  } = char.getBoundingClientRect();

  if (!char?.nextElementSibling) return;

  const {
    left: nextCharCoordLeft,
    bottom: nextCharCoordBottom,
  } = char.nextElementSibling.getBoundingClientRect();
  const boundy = observationArea.getBoundingClientRect().bottom - charHeight;

  if (
    nextCharCoordLeft <= charCoordLeft && // проверка: символ на новой строке?
    nextCharCoordBottom > boundy // проверка: новая строка в предал видимости?
  ) {
    observationArea.scrollTop += charHeight; // поднять на высоту символа
  }
}
