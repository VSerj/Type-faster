'use strict';

import { showModalWindow } from './modal-window';

export const stats = {
  numberOftypedChars: 0,
  timeLimit: 0,
  charsPerSec: 0,
  numberOfErrors: 0,
  timeIdInterval: null,
  startDate: 0,

  initSpeedTyping(handlerChangeSpeed = null) {
    this.timeIdInterval = setInterval(() => {
      const avgSpeed = this.charsPerSec * 60;
      this.charsPerSec = 0;

      handlerChangeSpeed && handlerChangeSpeed(avgSpeed);
    }, 1000);
  },

  addCorrectChar() {
    this.numberOftypedChars += 1;
    this.charsPerSec += 1;
  },

  getFormatedStartDate() {
    return new Date(this.startDate).toLocaleString();
  },

  calcFinishSpeedCPS() {
    return (this.numberOftypedChars * 60) / this.timeLimit;
  },

  createCurrentStatsHtml() {
    return `
    <h4>Ваш результат</h4>
    <ul class="statistics__infoList">
      <li class="statistics__info">
        Время старта: ${this.getFormatedStartDate()}
      </li>
      <li class="statistics__info">
        Количество набранных символов: ${this.numberOftypedChars}
      </li>
      <li class="statistics__info">
        Количество ошибок: ${this.numberOfErrors}
      </li>
      <li class="statistics__info">
        Скорость набора сим./мин: ${this.calcFinishSpeedCPS()}
      </li>
    </ul>`;
  },

  updateStatsinLocalStorage() {
    const statistics = localStorage.getItem('statistics')
      ? JSON.parse(localStorage.getItem('statistics'))
      : [];

    statistics.push({
      id: statistics.length ? statistics.length + 1 : 1,
      startDate: this.getFormatedStartDate(),
      speed: this.calcFinishSpeedCPS(),
      numberOfErrors: this.numberOfErrors,
    });
    localStorage.setItem('statistics', JSON.stringify(statistics));
  },

  finishStats() {
    if (!this.startDate) return;

    clearInterval(this.timeIdInterval);
    this.updateStatsinLocalStorage();
    showModalWindow(`${this.createCurrentStatsHtml()}`, {
      helpHandlerClose: this.clearStats.bind(this),
    });
  },

  clearStats() {
    this.numberOftypedChars = 0;
    this.charsPerSec = 0;
    this.numberOfErrors = 0;
    this.timeIdInterval = null;
    this.startDate = null;
    this.timeLimit = 0;
  },
};
