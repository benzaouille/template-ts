class WatchUI{}

export class DigitalWatchUI extends WatchUI {

  private watchScreen   : HTMLElement;
  private timeScreen    : HTMLElement;
  private secondsScreen : HTMLElement;

  private modeButton     : HTMLElement;
  private increaseButton : HTMLElement;
  private lightButton    : HTMLElement;
  private resetButton    : HTMLElement;
  private am_pm_Button   : HTMLElement;

  private container : HTMLElement[] = [];

  constructor(watchElement: HTMLElement) {
    super();
    this.watchScreen    = watchElement.querySelector('.watch-screen')!;
    this.timeScreen     = watchElement.querySelector('.time')!;
    this.secondsScreen  = watchElement.querySelector('.seconds')!;

    this.modeButton     = watchElement.querySelector('.button-mode')!;
    this.increaseButton = watchElement.querySelector('.button-increase')!;
    this.lightButton    = watchElement.querySelector('.button-light')!;
    this.resetButton    = watchElement.querySelector('.button-reset')!;
    this.am_pm_Button   = watchElement.querySelector('.button-am-pm')!;

    if (!this.watchScreen)   throw new Error("Failed to find the .watch-screen element within the provided watchElement.");
    if (!this.timeScreen)    throw new Error("Failed to find the .time element within the provided watchElement.");
    if (!this.secondsScreen) throw new Error("Failed to find the .seconds element within the provided watchElement.");

    if (!this.modeButton)     throw new Error("Failed to find the .button-mode element within the provided watchElement.");
    if (!this.increaseButton) throw new Error("Failed to find the .button-increase element within the provided watchElement.");
    if (!this.lightButton)    throw new Error("Failed to find the .button-light element within the provided watchElement.");
    if (!this.resetButton)    throw new Error("Failed to find the .button-reset element within the provided watchElement.");
    if (!this.am_pm_Button)   throw new Error("Failed to find the .button-am-pm element within the provided watchElement.");

    this.container.push(this.watchScreen) ; this.container.push(this.timeScreen)     ; this.container.push(this.secondsScreen) ;
    this.container.push(this.modeButton)  ; this.container.push(this.increaseButton) ; this.container.push(this.lightButton) ;
    this.container.push(this.resetButton) ; this.container.push(this.am_pm_Button)   ;
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
    this.addTransform(this.container, `scale(${scale_coefficiants[0]}, ${scale_coefficiants[1]})`);
  }

  private addTransform(container : HTMLElement[], newTransform : string) : void {
    container.forEach(element => {
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
