import { states } from './states';

export function showModalWindow(
  content = '',
  { extraClass = '', helpHandlerOk = null, helpHandlerClose = null } = {}
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
        helpHandlerOk // Если нет обработчика для ОК, то нет смысла в ней
          ? '<button class="btn-flat modal__btnOk" data-trriger="hide">Ok</button>'
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
  const handleRemoveleModal = ({ target }) => {
    states.isModalWindow
      ? removeModalWindow(target, helpHandlerOk, helpHandlerClose)
      : document.removeEventListener('click', handleRemoveleModal);
  };

  // Делегирование событий для элементов. Так как вставили элементы окна
  // с помощью insertAdjacentHTML
  document.addEventListener('click', handleRemoveleModal);

  return (states.isModalWindow = true);
}

// По нажатию кнопок или в оверлэй - удалить модальное окно,
// если добавлены доп.обработчики запускаем перед закрытием
function removeModalWindow(target, helpHandlerOk, helpHandlerClose) {
  if (target.dataset.trriger !== 'hide') return;

  if (target.closest('.modal__btnOk') && helpHandlerOk) {
    helpHandlerOk(); // обработчик для кнопки ок
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

  return (states.isModalWindow = false);
}
