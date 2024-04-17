class WatchUI{}

export class DigitalWatchUI extends WatchUI {

  //screen
  private watchScreen: HTMLElement;
  private timeScreen: HTMLElement;
  private secondsScreen: HTMLElement;

  constructor(watchElement: HTMLElement) {
    super();
    this.watchScreen = watchElement.querySelector('.watch-screen')!;
    this.timeScreen = watchElement.querySelector('.time')!;
    this.secondsScreen = watchElement.querySelector('.seconds')!;

    if (!this.watchScreen)   throw new Error("Failed to find the .watch-screen element within the provided watchElement.");
    if (!this.timeScreen)    throw new Error("Failed to find the .time element within the provided watchElement.");
    if (!this.secondsScreen) throw new Error("Failed to find the .seconds element within the provided watchElement.");
  }

  public updateDisplay(hours: number, minutes: number, seconds: number): void {
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    this.timeScreen.innerHTML = `${formattedHours} : ${formattedMinutes}`;
    this.secondsScreen.innerHTML = `${formattedSeconds}`;
  }

  public toggleLight(light_on: boolean): void {
    this.watchScreen.style.backgroundColor = light_on ? 'red' : 'white';
  }
}
