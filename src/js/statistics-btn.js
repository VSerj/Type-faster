'use strict';

import { showModalWindow } from './modal-window';

export function showStats() {
  const statsList = JSON.parse(localStorage.getItem('statistics'));

  const content = !statsList
    ? '<h4>Результатов еще нет</h4>'
    : statsList.reduceRight((accum, listObj) => {
        return (
          accum +
          `<ul>
            <li>Сессия: ${listObj.id}</li>
            <li>Время старта :${listObj.startDate}</li>
            <li>Скорость набора сим./мин: ${listObj.speed}</li>
            <li>Количество ошибок: ${listObj.numberOfErrors}</li>
          </ul>`
        );
      }, '<h4>Все результаты</h4>');

  showModalWindow(content, {
    customBtnText: 'Clear All',
    helpHandlerCustomBtn: () => localStorage.removeItem('statistics'),
  });
}
