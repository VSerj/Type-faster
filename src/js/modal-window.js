import { states } from './states';

export function showModalWindow(
  content = '',
  {
    extraClass = '',
    customBtnText = 'Click',
    helpHandlerCustomBtn = null,
    helpHandlerClose = null,
  } = {}
) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <div class="modal modal-fixed-footer ${extraClass}">
      <div class="modal-content">
        ${content}
      </div>
      <div class="modal-footer ${extraClass}">
      ${
        helpHandlerCustomBtn // Если нет обработчика для кнопки, то нет смысла в ней
          ? `<button class="btn-flat modal__btnCustom" data-trriger="hide">${customBtnText}</button>`
          : ''
      }
        <button class="btn-flat modal__btnClose" data-trriger="hide">
          Close
        </button>
      </div>
    </div>
    <div class="modal-overlay" data-trriger="hide"></div>`
  );

  // Обертка для возможности передачи параметров обработчику removeModalWindow
  function handleRemoveleModal({ target }) {
    removeModalWindow(target, helpHandlerCustomBtn, helpHandlerClose);
  }

  // По нажатию кнопок или в оверлэй - удалить модальное окно,
  // если добавлены доп.обработчики запускаем перед закрытием
  function removeModalWindow(target, helpHandlerCustomBtn, helpHandlerClose) {
    if (target.dataset.trriger !== 'hide') return;

    if (target.closest('.modal__btnCustom') && helpHandlerCustomBtn) {
      helpHandlerCustomBtn(); // обработчик для для кастомной
    }

    if (
      (helpHandlerClose && target.closest('.modal__btnClose')) ||
      (helpHandlerClose && target.closest('.modal-overlay'))
    ) {
      helpHandlerClose(); // обработчик для кнопки CLose и оверлэя
    }

    document // Удаляет модал.окно и его оверлей по клику на кнопку или оверлей.
      .querySelectorAll('.modal, .modal-overlay')
      .forEach(elem => elem.remove());

    document.removeEventListener('click', handleRemoveleModal);

    return (states.isModalWindow = false);
  }

  // Делегирование событий для элементов. Так как вставили элементы окна
  // с помощью insertAdjacentHTML
  document.addEventListener('click', handleRemoveleModal);

  return (states.isModalWindow = true);
}
