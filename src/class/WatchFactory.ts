import { DigitalWatch } from './Watch.ts'

export class WatchFactory {
    static createDigitalWatch(): DigitalWatch {
      const selectElementGMT = document.getElementById('timezone-select')  as HTMLSelectElement;;
      const container        = document.getElementById('watches-container');

      if (!selectElementGMT)   throw new Error("Failed to find the timezone-select Id element within the DOM.");
      if (!container)    throw new Error("Failed to find the watches-container Id within the DOM.");

      const watchElement = document.createElement('div');
      watchElement.className = 'watch';
      watchElement.innerHTML = `
          <span class="watch-screen">
              <span class="time"></span>
              <span class="seconds"></span>
          </span>
          <button class="button-watch button-mode">m</button>
          <button class="button-watch button-increase">i</button>
          <button class="button-watch button-light">l</button>
          <button class="button-watch button-reset">r</button>
          <button class="button-watch button-am-pm">ap</button>
      `;
      container.appendChild(watchElement);
      return new DigitalWatch(watchElement, parseInt(selectElementGMT.value, 10));
    }
}
