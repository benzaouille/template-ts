import { Watch } from './class/Watch.ts'

let watch_container : Watch[] = [];

// Function to create a new watch instance and add it to the DOM
function createNewWatch() {
    const container = document.getElementById('watches-container');
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
    `;
    container.appendChild(watchElement);
    watch_container.push(new Watch(watchElement));
}


document.addEventListener("DOMContentLoaded", () => {
    const addWatchButton = document.getElementById('addWatchButton') as HTMLButtonElement;
    addWatchButton?.addEventListener('click', () => {
        createNewWatch();
    });
});
