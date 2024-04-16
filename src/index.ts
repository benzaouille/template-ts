import { Watch } from './class/Watch.ts'
import { WatchFactory } from './class/WatchFactory.ts'

let watch_container : Watch[] = [];



document.addEventListener("DOMContentLoaded", () => {
    const addWatchButton = document.getElementById('addWatchButton') as HTMLButtonElement;
    addWatchButton?.addEventListener('click', () => {
      watch_container.push(WatchFactory.createWatch());
    });
});
