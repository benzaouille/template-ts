import { TimeService } from './TimeService.ts';
import { DigitalWatchUI } from './WatchUI.ts';
import { DigitalWatchController } from './WatchController.ts';
import { Matrix } from '../Math/Matrix.ts';

enum EditMode {
    None,
    Hour,
    Minute
}

// Watch Base class : implement this class if you want to create any other kind of watch
class Watch {
  protected intervalId : number;

  /* Instance of the TimeService, DigitalWatchUI, DigitalWatchController
     for handling time operations, manage watch UI and Controller */
  protected timeService     : TimeService;
  protected watchUI         : DigitalWatchUI;
  protected watchController : DigitalWatchController;

  protected scaleMatrix : Matrix;
  protected transMatrix : Matrix;
  protected rotMatrix   : Matrix;

  constructor(scale_coefficiants : number[],
              trans_coefficiants : number[],
              rot_coefficiant : number) {
    this.scaleMatrix = Matrix.buildScaleMatrix(scale_coefficiants);
    this.transMatrix = Matrix.buildTransMatrix(trans_coefficiants);
    this.rotMatrix   = Matrix.buildRotMatrix(rot_coefficiant);
  }

}

// Digital watch implementation
export class DigitalWatch extends Watch {
  private light_on    : boolean = false;
  private am_pm_flag  : boolean = false;

  private offset_hour   : number = 0;
  private offset_minute : number = 0;
  private offset_second : number = 0;
  private selectedZone  : number = 0;
  private mod_hour      : number = 24;
  private mod_minute    : number = 60;

  private editMode: EditMode = EditMode.None;


  constructor(watchElement : HTMLElement,
              selectedZone : number,
              scale_coefficiants : number[] = [1, 1],
              trans_coefficiants : number[] = [0, 0],
              rot_coefficiant : number = 0)
  {
    super(scale_coefficiants, trans_coefficiants, rot_coefficiant);
    this.selectedZone  = selectedZone;

    // Initialize the TimeService, DigitalWatchUI and DigitalWatchController.
    this.timeService     = new TimeService();
    this.watchUI         = new DigitalWatchUI(watchElement);
    this.watchController = new DigitalWatchController(watchElement);

    /*use watchUI to update the watch transformation*/
    this.watchUI.transform(scale_coefficiants, trans_coefficiants, rot_coefficiant);

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

  /*This function will update the digital watch using timeService and watchUI*/
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

  /*we set editMode baased on it value*/
  private setMode(): void {
    switch (this.editMode) {
      case EditMode.None:
      this.editMode = EditMode.Hour;
      break;
      case EditMode.Hour:
      this.editMode = EditMode.Minute;
      break;
      case EditMode.Minute:
      this.editMode = EditMode.None;
      break;
    }
  }

  private updateTime() : void {
      if(this.editMode === EditMode.Hour){
        this.offset_hour = this.offset_hour + 1;
      }
      else if(this.editMode === EditMode.Minute){
        this.offset_minute = this.offset_minute + 1;
      }
  }

  private turn_on_off_light() : void {
    this.light_on = !this.light_on;
    this.watchUI.toggleLight(this.light_on);
  }

  private resetWatch() : void {
    if(this.editMode === EditMode.Hour || this.editMode === EditMode.Minute){
      let now = new Date();
      now = this.timeService.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), this.selectedZone);
      this.offset_hour   = -now.getHours();
      this.offset_minute = -now.getMinutes();
      this.offset_second = -now.getSeconds();
    }
  }

  /*we set am_pm_flag to am or pm based on its current value*/
  private setPmAm() : void {
    this.am_pm_flag = !this.am_pm_flag;
  }
}
