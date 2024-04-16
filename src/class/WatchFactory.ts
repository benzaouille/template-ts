import { DigitalWatch } from './Watch.ts'

export class WatchFactory {
    static createWatch(): DigitalWatch {
      const selectElementGMT = document.getElementById('timezone-select')  as HTMLSelectElement;;
      const container    = document.getElementById('watches-container');
      const watchElement = document.createElement('div');
      watchElement.className = 'watch';
      watchElement.innerHTML = `
          <span class="watch-screen">
              <span class="time"></span>
              <span class="seconds"></span>
          </span>
          <button class="button-watch button-mode"></button>
          <button class="button-watch button-increase"></button>
          <button class="button-watch button-light"></button>
          <button class="button-watch button-reset"></button>
          <button class="button-watch button-am-pm"></button>
      `;
      container.appendChild(watchElement);
      return new DigitalWatch(watchElement, parseInt(selectElementGMT.value, 10));
    }
}
