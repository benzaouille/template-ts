import { Watch } from './class/Watch.ts'

let w = new Watch;

document.addEventListener("DOMContentLoaded", () => {
    const changeColorButton = document.getElementById('changeColorButton') as HTMLButtonElement;
    changeColorButton?.addEventListener('click', () => {
        w.turn_on_off_light();
    });

    const changeModeButton = document.getElementById('changeModeButton') as HTMLButtonElement;
    changeModeButton?.addEventListener('click', () => {
        w.setMode();
    });

    const changeIncreaseButton = document.getElementById('changeIncreaseButton') as HTMLButtonElement;
    changeIncreaseButton?.addEventListener('click', () => {
        w.updateTime();
    });
});
