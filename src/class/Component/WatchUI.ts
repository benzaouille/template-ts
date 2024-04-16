class WatchUI{}

export class DigitalWatchUI extends WatchUI {

  //screen
  private watchScreen: HTMLElement;
  private timeScreen: HTMLElement;
  private secondsScreen: HTMLElement;
  private watch_id : HTMLElement;

  constructor(watchElement: HTMLElement) {
    super();
    this.watchScreen = watchElement.querySelector('.watch-screen')!;
    this.timeScreen = watchElement.querySelector('.time')!;
    this.secondsScreen = watchElement.querySelector('.seconds')!;
    this.watch_id = watchElement.querySelector('.watch-id')!;
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
    //this.watch_id.style.transform = 'scale(1.5)';//`scale(${scale_coefficiants[0]}, ${scale_coefficiants[1]}) rotate(${scale_coefficiants}deg) translate(${trans_coefficiants[0]}, ${trans_coefficiants[1]})`;
  }
}
