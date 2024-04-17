import { TimeService } from './TimeService.ts';

export enum EditMode {
    None,
    Hour,
    Minute
}

export class WatchModel {

  public light_on    : boolean = false;
  public am_pm_flag  : boolean = false;

  public offset_hour   : number = 0;
  public offset_minute : number = 0;
  public offset_second : number = 0;
  public selectedZone  : number = 0;
  public mod_hour      : number = 24;
  public mod_minute    : number = 60;

  public editMode : EditMode = EditMode.None;
}
