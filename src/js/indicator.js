'use strict';

import { indicatorBattery, indicatorText } from './vars';

export function changeUiIndicator(speed) {
  const indication =
    speed < 70 ? 'low' : speed >= 70 && speed < 170 ? 'medium' : 'high';
  const indicatorBatteryClassList = indicatorBattery.classList;

  if (indicatorBatteryClassList.contains(`indicator-battery--${indication}`)) {
    return;
  }

  clearUiIndicator();
  indicatorBatteryClassList.add(`indicator-battery--${indication}`);
  indicatorText.textContent = indication;
}

export function clearUiIndicator() {
  indicatorBattery.classList.remove(
    'indicator-battery--low',
    'indicator-battery--medium',
    'indicator-battery--high'
  );
  indicatorText.textContent = '';
}
