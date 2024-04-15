

export class Watch {

  //watch button
  private modeElement     : HTMLElement;
  private increaseElement : HTMLElement;
  private lightButton     : HTMLElement;
  private resetButton     : HTMLElement;
  private am_pm_Button    : HTMLElement;

  //watch screen
  private watchScreen   : HTMLElement;
  private timeScreen    : HTMLElement;
  private secondsScreen : HTMLElement;

  private light_on    : boolean;
  private edit_hour   : boolean;
  private edit_minute : boolean;
  private am_pm_flag  : boolean;

  private intervalId    : number;
  private offset_hour   : number;
  private offset_minute : number;
  private offset_second : number;
  private mod_hour      : number;
  private mod_minute    : number;
  private selectedZone  : number;

  constructor(watchElement : HTMLElement,
              selectedZone : number,
              mod_hour     : number = 24,
              mod_minute   : number = 60)
  {
    this.watchScreen  = watchElement.querySelector('.watch-screen');
    this.timeScreen   = watchElement.querySelector('.time')!;
    this.secondsScreen = watchElement.querySelector('.seconds')!;

    this.modeElement     = watchElement.querySelector('.button-mode')!;
    this.increaseElement = watchElement.querySelector('.button-increase')!;
    this.lightButton     = watchElement.querySelector('.button-light')!;
    this.resetButton     = watchElement.querySelector('.button-reset')!;
    this.am_pm_Button    = watchElement.querySelector('.button-am-pm')!;


    this.offset_hour   = 0;
    this.offset_minute = 0;
    this.offset_second = 0;
    this.mod_hour      = mod_hour;
    this.mod_minute    = mod_minute;
    this.selectedZone  = selectedZone;

    this.light_on     = false;
    this.edit_hour    = false;
    this.edit_minute  = false;
    this.am_pm_flag = false;

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

    this.resetButton.addEventListener('click', () => {
      this.resetWatch();
    });

    this.am_pm_Button.addEventListener('click', () => {
      this.setPmAm();
    });
  }

  private adjustDateToGMT(time : number, timeZoneOffset : number, gmtOffset : number) : Date {
    const utc = time + (timeZoneOffset * 60000);
    // Calculate the new date and time with the specified GMT offset
    const newTime = new Date(utc + (3600000 * gmtOffset));
    return newTime;
  }

  private displayTime() : void {
    let now = new Date();
    now = this.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), this.selectedZone);
    let hours = (now.getHours() + this.offset_hour) % this.mod_hour;
    const minutes = (now.getMinutes() + this.offset_minute) % this.mod_minute;
    const seconds = (now.getSeconds() + this.offset_second) ;

    if(this.am_pm_flag)
      hours = this.pm2am(hours);

    this.timeScreen.innerHTML = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;
    this.secondsScreen.innerHTML = `${seconds.toString().padStart(2, '0')}`;
  }

  private setMode() : void {
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

  private updateTime() : void {
      if(this.edit_hour){
        this.offset_hour = this.offset_hour + 1;
      }
      else if(this.edit_minute){
        this.offset_minute = this.offset_minute + 1;
      }
  }

  private turn_on_off_light() : void {
    this.light_on = !this.light_on;
    if(this.light_on){
      this.watchScreen.style.backgroundColor = 'red';
    }
    else
    {
      this.watchScreen.style.backgroundColor = 'white';
    }
  }

  private resetWatch() : void {
    if(this.edit_hour || this.edit_minute){
      let now = new Date();
      now = this.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), this.selectedZone);
      this.offset_hour   = -now.getHours();
      this.offset_minute = -now.getMinutes();
      this.offset_second = -now.getSeconds();
    }
  }

  private setPmAm() : void {
    this.am_pm_flag = !this.am_pm_flag;
  }

  private pm2am(hours : number) : number {
    // Check if the hour is '0' (midnight), set it to '12' and designate as 'AM'
    if (hours === 0) {
        return 12;
    }
    // Check if the hour is '12' (noon), return '12' with 'PM'
    else if (hours === 12) {
        return 12;
    }
    // If the hour is greater than 12, subtract 12 to convert to PM time
    else if (hours > 12) {
        return hours - 12;
    }
    // Otherwise, it's AM time and no conversion is needed
    else {
        return hours;
    }
  }
}
