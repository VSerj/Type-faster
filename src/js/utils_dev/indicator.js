'use strict';

import { indicatorBattery, indicatorText } from '../vars';

export function changeUiIndicator(speed) {
  const indication =
    speed < 70 ? 'low' : speed >= 70 && speed < 160 ? 'medium' : 'high';

  if (indicatorBattery.classList.contains(`indicator-battery--${indication}`)) {
    return;
  }

  indicatorBattery.classList.remove(
    'indicator-battery--low',
    'indicator-battery--medium',
    'indicator-battery--high'
  );
  indicatorBattery.classList.add(`indicator-battery--${indication}`);
  indicatorText.textContent = indication;
}
