
export class Watch {

  private light_on : boolean;
  private edit_hour : boolean;
  private edit_minute : boolean;
  private intervalId: number;
  private offset_hour : number;
  private offset_minute : number;
  private mod_hour : number;
  private mod_minute : number;

  constructor(mod_hour : number = 24, mod_minute : number = 60){
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
  }

  displayTime() : void {
    const now = new Date();
    const hours = (now.getHours() + this.offset_hour) % this.mod_hour;
    const minutes = (now.getMinutes() + this.offset_minute) % this.mod_minute;
    const seconds = now.getSeconds();

    const tm = document.getElementById("time-id") as HTMLSpanElement;
    const s = document.getElementById("second-id") as HTMLSpanElement;

    tm.innerHTML = `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')}`;
    s.innerHTML = `${seconds.toString().padStart(2, '0')}`;
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
    const watch_screen = document.getElementById('watch-id') as HTMLSpanElement;
    if(this.light_on){
      watch_screen.style.backgroundColor = 'red';
    }
    else
    {
      watch_screen.style.backgroundColor = 'white';
    }
  }

}
