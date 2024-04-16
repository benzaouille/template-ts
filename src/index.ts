import { DigitalWatch } from './class/Watch.ts'
import { WatchFactory } from './class/WatchFactory.ts'

let digital_watch_container : DigitalWatch[] = [];



document.addEventListener("DOMContentLoaded", () => {
    const addWatchButton = document.getElementById('addWatchButton') as HTMLButtonElement;
    addWatchButton?.addEventListener('click', () => {
      digital_watch_container.push(WatchFactory.createWatch());
    });
});
