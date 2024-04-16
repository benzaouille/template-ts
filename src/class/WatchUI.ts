export class DigitalWatchUI {

  //screen
  private watchScreen: HTMLElement;
  private timeScreen: HTMLElement;
  private secondsScreen: HTMLElement;

  constructor(watchElement: HTMLElement) {
      this.watchScreen = watchElement.querySelector('.watch-screen')!;
      this.timeScreen = watchElement.querySelector('.time')!;
      this.secondsScreen = watchElement.querySelector('.seconds')!;
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
