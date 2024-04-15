
export class Watch {

  //watch button
  private modeElement     : HTMLElement;
  private increaseElement : HTMLElement;
  private lightButton     : HTMLElement;

  //watch screen
  private watchScreen   : HTMLElement;
  private timeScreen    : HTMLElement;
  private secondsScreen : HTMLElement;

  private light_on    : boolean;
  private edit_hour   : boolean;
  private edit_minute : boolean;

  private intervalId    : number;
  private offset_hour   : number;
  private offset_minute : number;
  private mod_hour      : number;
  private mod_minute    : number;
  private id            : number;

  constructor(watchElement : HTMLElement,
              mod_hour : number = 24,
              mod_minute : number = 60)
{
    this.watchScreen  = watchElement.querySelector('.watch-screen');
    this.timeScreen   = watchElement.querySelector('.time')!;
    this.secondsScreen = watchElement.querySelector('.seconds')!;

    this.modeElement     = watchElement.querySelector('.button-mode')!;
    this.increaseElement = watchElement.querySelector('.button-increase')!;
    this.lightButton     = watchElement.querySelector('.button-light')!;


    this.offset_hour   = 0;
    this.offset_minute = 0;
    this.light_on      = false;
    this.edit_hour     = false;
    this.edit_minute   = false;
    this.mod_hour      = mod_hour;
    this.mod_minute    = mod_minute;


    // Immediately display time and update every seconds
    this.displayTime();
    this.intervalId = window.setInterval(() => this.displayTime(), 1000);

    this.setupEventListeners();
  }

  private setupEventListeners() : void {
    this.lightButton.addEventListener('click', () => {
      this.turn_on_off_light();
    });

    this.modeElement.addEventListener('click', () => {
      this.setMode();
    });

    this.increaseElement.addEventListener('click', () => {
      this.updateTime();
    });
  }

  displayTime() : void {
    const now = new Date();
    const hours = (now.getHours() + this.offset_hour) % this.mod_hour;
    const minutes = (now.getMinutes() + this.offset_minute) % this.mod_minute;
    const seconds = now.getSeconds();

    this.timeScreen.innerHTML = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;
    this.secondsScreen.innerHTML = `${seconds.toString().padStart(2, '0')}`;
  }

  setMode() : void {
    if(!this.edit_hour && !this.edit_minute){
      this.edit_hour = true;
    }
    else if(this.edit_hour)
    {
      this.edit_hour = false;
      this.edit_minute = true;
    }
    else if(this.edit_minute)
    {
      this.edit_hour = false;
      this.edit_minute = false;
    }
  }

  updateTime() : void{
      if(this.edit_hour){
        this.offset_hour = this.offset_hour + 1;
      }
      else if(this.edit_minute){
        this.offset_minute = this.offset_minute + 1;
      }
  }

  turn_on_off_light() : void {
    this.light_on = !this.light_on;
    if(this.light_on){
      this.watchScreen.style.backgroundColor = 'red';
    }
    else
    {
      this.watchScreen.style.backgroundColor = 'white';
    }
  }

}
