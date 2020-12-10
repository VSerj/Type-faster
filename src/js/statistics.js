'use strict';

export const stats = {
  _numberOftypedChars: 0,
  speedTyping: 0,
  numberOftypedCharsPerSec: 0,
  numberOfErrors: 0,
  startDate: null,

  get numberOftypedChars() {
    return this._numberOftypedChars;
  },

  set numberOftypedChars(value) {
    this._numberOftypedChars = value;
    this.numberOftypedCharsPerSec = value;
  },

  setSpeedTyping() {
    this.speedTyping = this.numberOftypedCharsPerSec * 60;
    this.numberOftypedCharsPerSec = 0;
    console.log(this.speedTyping);
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
    return `<p class="statistics__info">
      Время старта: ${this.getFormatedStartDate()}
    </p>
    <p class="statistics__info">
      Количество набранных символов: ${this.numberOftypedChars}
    </p>
    <p class="statistics__info">
      Количство сделанных ошибок: ${this.numberOfErrors}
    </p>
    <p class="statistics__info">
      Speed: ${this.speedTyping}
    </p>`;
  },

  clearStats() {
    this.numberOftypedChars = 0;
    this.speedTyping = 0;
    this.numberOftypedCharsPerSec = 0;
    this.numberOfErrors = 0;
    this.startDate = null;
  },
};
