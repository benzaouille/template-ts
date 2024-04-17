class WatchUI{}

export class DigitalWatchUI extends WatchUI {

  private watchId       : HTMLElement;
  private watchScreen   : HTMLElement;
  private timeScreen    : HTMLElement;
  private secondsScreen : HTMLElement;

  private container : HTMLElement[] = [];

  constructor(watchElement: HTMLElement) {
    super();

    this.watchId        = watchElement;
    this.watchScreen    = watchElement.querySelector('.watch-screen')!;
    this.timeScreen     = watchElement.querySelector('.time')!;
    this.secondsScreen  = watchElement.querySelector('.seconds')!;

    if (!this.watchId)       throw new Error("Failed to bind watchElement to watchId.");
    if (!this.watchScreen)   throw new Error("Failed to find the .watch-screen element within the provided watchElement.");
    if (!this.timeScreen)    throw new Error("Failed to find the .time element within the provided watchElement.");
    if (!this.secondsScreen) throw new Error("Failed to find the .seconds element within the provided watchElement.");

    this.container.push(this.watchId);
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

  public transform(scale_coefficiants : number[],
                  trans_coefficiants : number[],
                  rot_coefficiant : number): void {
    this.addTransform(`scale(${scale_coefficiants[0]}, ${scale_coefficiants[1]})`);
    this.addTransform(`rotate(${rot_coefficiant})`);

  }

  private addTransform(newTransform : string) : void {
    this.container.forEach(element => {
      const currentTransform = window.getComputedStyle(element).transform;
      if (currentTransform && currentTransform !== 'none') {
        element.style.transform =  currentTransform + ' ' + newTransform;
      }
      else {
        element.style.transform =  newTransform;
      }
    });
  }
}
