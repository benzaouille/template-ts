import { DigitalWatch } from './class/Watch.ts'
import { WatchFactory } from './class/WatchFactory.ts'

//array that will contain digital watch
let digital_watch_container : DigitalWatch[] = [];


//Create a digital watch each time a click is submitted on the 'addWatchButton'.
document.addEventListener("DOMContentLoaded", () => {
    const addWatchButton = document.getElementById('addWatchButton') as HTMLButtonElement;
    addWatchButton?.addEventListener('click', () => {
      digital_watch_container.push(WatchFactory.createDigitalWatch());
    });
});
