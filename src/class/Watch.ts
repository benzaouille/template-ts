import { TimeService } from './TimeService.ts';
import { WatchUI } from './WatchUI.ts';
import { WatchController } from './WatchController.ts';

export class SWatch {
  protected intervalId : number;

  // Instance of the TimeService for handling time operations
  protected timeService     : TimeService;
  protected watchUI         : WatchUI;
  protected watchController : WatchController;
}

export class Watch extends SWatch {
  private light_on    : boolean;
  private edit_hour   : boolean;
  private edit_minute : boolean;
  private am_pm_flag  : boolean;

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
    super();

    this.offset_hour   = 0;
    this.offset_minute = 0;
    this.offset_second = 0;
    this.mod_hour      = mod_hour;
    this.mod_minute    = mod_minute;
    this.selectedZone  = selectedZone;

    this.light_on    = false;
    this.edit_hour   = false;
    this.edit_minute = false;
    this.am_pm_flag  = false;

    // Initialize the TimeService
    this.timeService     = new TimeService();
    this.watchUI         = new WatchUI(watchElement);
    this.watchController = new WatchController(watchElement);

    // Immediately display time and update every seconds
    this.displayTime();
    this.intervalId = window.setInterval(() => this.displayTime(), 1000);

    this.setupEventListeners();
  }

  private setupEventListeners() : void {
    this.watchController.getLightButton().addEventListener('click',    () => this.turn_on_off_light() );
    this.watchController.getModeButton().addEventListener('click',     () => this.setMode()           );
    this.watchController.getIncreaseButton().addEventListener('click', () => this.updateTime()        );
    this.watchController.getResetButton().addEventListener('click',    () => this.resetWatch()        );
    this.watchController.getAmPmButton().addEventListener('click',     () => this.setPmAm()           );
  }

  private displayTime() : void {
    let now = new Date();
    now = this.timeService.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), this.selectedZone);
    let hours = (now.getHours() + this.offset_hour) % this.mod_hour;
    const minutes = (now.getMinutes() + this.offset_minute) % this.mod_minute;
    const seconds = (now.getSeconds() + this.offset_second) % this.mod_minute;

    if(this.am_pm_flag)
      hours = this.timeService.pm2am(hours);

    this.watchUI.updateDisplay(hours, minutes, seconds);
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
    this.watchUI.toggleLight(this.light_on);
  }

  private resetWatch() : void {
    if(this.edit_hour || this.edit_minute){
      let now = new Date();
      now = this.timeService.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), this.selectedZone);
      this.offset_hour   = -now.getHours();
      this.offset_minute = -now.getMinutes();
      this.offset_second = -now.getSeconds();
    }
  }

  private setPmAm() : void {
    this.am_pm_flag = !this.am_pm_flag;
  }
}
