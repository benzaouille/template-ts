import { TimeService } from './TimeService.ts';
import { WatchModel } from './WatchModel.ts';


class WatchUI{}

export class DigitalWatchUI extends WatchUI {

  //screen
  private watchScreen   : HTMLElement;
  private timeScreen    : HTMLElement;
  private secondsScreen : HTMLElement;

  private watchModel : WatchModel;

  constructor(watchElement: HTMLElement, watchModel : WatchModel) {
    super();
    this.watchScreen   = watchElement.querySelector('.watch-screen')!;
    this.timeScreen    = watchElement.querySelector('.time')!;
    this.secondsScreen = watchElement.querySelector('.seconds')!;
    this.watchModel    = watchModel;

    if (!this.watchScreen)   throw new Error("Failed to find the .watch-screen element within the provided watchElement.");
    if (!this.timeScreen)    throw new Error("Failed to find the .time element within the provided watchElement.");
    if (!this.secondsScreen) throw new Error("Failed to find the .seconds element within the provided watchElement.");
    if (!this.watchModel)    throw new Error("Failed to bind watchModel in DigitalWatchUI.");
  }


  public updateDisplay(selectedZone : number): void {
    let now = new Date();
    now = TimeService.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), selectedZone);
    let hours = (now.getHours() + this.watchModel.getOffsetHour()) % this.watchModel.getModHour();
    const minutes = (now.getMinutes() + this.watchModel.getOffsetMinute()) % this.watchModel.getModMinute();
    const seconds = (now.getSeconds() + this.watchModel.getOffsetMinute()) % this.watchModel.getModMinute();

    if(this.watchModel.getAmPmFlag())
      hours = TimeService.pm2am(hours);
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
