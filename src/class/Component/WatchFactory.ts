import { DigitalWatch } from './Watch.ts'

export class DigitalWatchFactory {

  static createWatchElement() : HTMLElement{
    const watchElement = document.createElement('div');
    watchElement.className = 'watch';
    watchElement.innerHTML = `
    <span class="watch-screen">
    <span class="time"></span>
    <span class="seconds"></span>
    </span>
    <button class="button-watch button-mode" style="--angle:-45deg;"></button>
    <button class="button-watch button-increase" style="--angle:45deg;"></button>
    <button class="button-watch button-light" style="--angle:135deg;"></button>
    <button class="button-watch button-reset" style="--angle:225deg;"></button>
    <button class="button-watch button-am-pm" style="--angle:-90deg;"></button>
    `;

    return watchElement;
  }

  static createDigitalWatch(): DigitalWatch {
    const selectElementGMT = document.getElementById('timezone-select')  as HTMLSelectElement;;
    const container    = document.getElementById('watches-container');
    const watchElement = DigitalWatchFactory.createWatchElement();

    container.appendChild(watchElement);
    return new DigitalWatch(watchElement, parseInt(selectElementGMT.value, 10));
  }

  static createRandomDigitalWatch(): DigitalWatch {
    const selectElementGMT = document.getElementById('timezone-select')  as HTMLSelectElement;;
    const container    = document.getElementById('watches-container');
    const watchElement = DigitalWatchFactory.createWatchElement();

    container.appendChild(watchElement);

    /*create random position, rotation and scaling*/
    let scale_coefficiants = [Math.random()*2, Math.random()*2];
    let trans_coefficiants = [Math.random()*window.innerWidth, Math.random()*window.innerHeight];
    let rot_coefficiant    = Math.random()*360
    return new DigitalWatch(watchElement, parseInt(selectElementGMT.value, 10),
                            scale_coefficiants, trans_coefficiants, rot_coefficiant);
  }
}
