import { TimeService } from './TimeService.ts';

enum EditMode {
    None,
    Hour,
    Minute
}

export class WatchModel {

  private light_on    : boolean = false;
  private am_pm_flag  : boolean = false;

  private offset_hour   : number = 0;
  private offset_minute : number = 0;
  private offset_second : number = 0;
  private selectedZone  : number = 0;
  private mod_hour      : number = 24;
  private mod_minute    : number = 60;

  private editMode: EditMode = EditMode.None;

  /*we set editMode baased on it value*/
  public setMode(): void {
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

  public updateTime() : void {
      if(this.editMode === EditMode.Hour){
        this.offset_hour = this.offset_hour + 1;
      }
      else if(this.editMode === EditMode.Minute){
        this.offset_minute = this.offset_minute + 1;
      }
  }

  public turn_on_off_light() : void {
    this.light_on = !this.light_on;
  }

  public resetWatch() : void {
    if(this.editMode === EditMode.Hour || this.editMode === EditMode.Minute){
      let now = new Date();
      now = TimeService.adjustDateToGMT(now.getTime(), now.getTimezoneOffset(), this.selectedZone);
      this.offset_hour   = 0;
      this.offset_minute = 0;
      this.offset_second = 0;
    }
  }

  /*we set am_pm_flag to am or pm based on its current value*/
  public setPmAm() : void {
    this.am_pm_flag = !this.am_pm_flag;
  }

  public getAmPmFlag() : boolean {
    return this.am_pm_flag;
  }

  public getLighvalue() : boolean {
    return this.light_on;
  }

  public getOffsetHour() : number {
    return this.offset_hour;
  }

  public getOffsetMinute() : number {
    return this.offset_minute;
  }

  public getOffsetSecond() : number {
    return this.offset_second;
  }

  public getModHour() : number {
    return this.mod_hour;
  }

  public getModMinute() : number {
    return this.mod_minute;
  }
}
