'use strict';

export const stats = {
  numberOftypedChars: 0,
  timeLimit: 0,
  charsPerSec: 0,
  numberOfErrors: 0,
  timeIdInterval: null,
  startDate: null,

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
    const dFormat = [
      `0${this.startDate.getDate()}`,
      `0${this.startDate.getMonth() + 1}`,
      `${this.startDate.getFullYear()}`,
      `0${this.startDate.getHours()}`,
      `0${this.startDate.getMinutes()}`,
      `0${this.startDate.getSeconds()}`,
    ].map((component, index) =>
      index !== 2 ? component.slice(-2) : component
    );

    return `${dFormat.slice(0, 3).join('-')} ${dFormat.slice(3).join(':')}`;
  },

  createStatsHtml() {
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
        Скорость набора сим./мин: ${this.numberOftypedChars*60/this.timeLimit}
      </li>
    </ul>`;
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
