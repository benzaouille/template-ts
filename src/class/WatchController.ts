import { WatchModel, EditMode  } from './WatchModel.ts';
import { DigitalWatchUI } from './WatchUI.ts';
import { TimeService } from './TimeService.ts';

class WatchController {}

export class DigitalWatchController extends WatchController{

  private watchScreen    : HTMLElement;

  //watch button
  private modeButton     : HTMLElement;
  private increaseButton : HTMLElement;
  private lightButton    : HTMLElement;
  private resetButton    : HTMLElement;
  private am_pm_Button   : HTMLElement;

  private modelWatch : WatchModel;
  private watchUI    : DigitalWatchUI;

  constructor(watchElement: HTMLElement, modelWatch : WatchModel, watchUI : DigitalWatchUI) {
    super();
    this.watchScreen   = watchElement.querySelector('.watch-screen')!;
    this.modeButton     = watchElement.querySelector('.button-mode')!;
    this.increaseButton = watchElement.querySelector('.button-increase')!;
    this.lightButton    = watchElement.querySelector('.button-light')!;
    this.resetButton    = watchElement.querySelector('.button-reset')!;
    this.am_pm_Button   = watchElement.querySelector('.button-am-pm')!;
    this.modelWatch     = modelWatch;
    this.watchUI        = watchUI;

    if (!this.watchScreen)   throw new Error("Failed to find the .watch-screen element within the provided watchElement.");
    if (!this.modeButton)     throw new Error("Failed to find the .button-mode element within the provided watchElement.");
    if (!this.increaseButton) throw new Error("Failed to find the .button-increase within the provided watchElement.");
    if (!this.lightButton)    throw new Error("Failed to find the .button-light element within the provided watchElement.");
    if (!this.resetButton)    throw new Error("Failed to find the .button-reset element within the provided watchElement.");
    if (!this.am_pm_Button)   throw new Error("Failed to find the .button-am-pm element within the provided watchElement.");
    if (!this.watchUI)        throw new Error("Failed to bind watchUI in DigitalWatchController.");

    this.setupEventListeners();
  }

  private setupEventListeners() : void {
    this.lightButton.addEventListener('click',    () => this.turn_on_off_light() );
    this.modeButton.addEventListener('click',     () => this.setMode()           );
    this.increaseButton.addEventListener('click', () => this.updateTime()        );
    this.resetButton.addEventListener('click',    () => this.resetWatch()        );
    this.am_pm_Button.addEventListener('click',   () => this.setPmAm()           );
  }

  /*we set am_pm_flag to am or pm based on its current value*/
  public setPmAm() : void {
    this.modelWatch.am_pm_flag = !this.modelWatch.am_pm_flag;
  }

  /*we set editMode baased on it value*/
  public setMode(): void {
    switch (this.modelWatch.editMode) {
      case EditMode.None:
        this.modelWatch.editMode = EditMode.Hour;
        break;
      case EditMode.Hour:
        this.modelWatch.editMode = EditMode.Minute;
        break;
      case EditMode.Minute:
        this.modelWatch.editMode = EditMode.None;
        break;
    }
  }

  public updateTime() : void {
      if(this.modelWatch.editMode === EditMode.Hour){
        this.modelWatch.offset_hour = this.modelWatch.offset_hour + 1;
      }
      else if(this.modelWatch.editMode === EditMode.Minute){
        this.modelWatch.offset_minute = this.modelWatch.offset_minute + 1;
      }
  }

  public turn_on_off_light() : void {
    this.modelWatch.light_on = !this.modelWatch.light_on;
    this.watchScreen.style.backgroundColor = this.modelWatch.light_on ? 'red' : 'white';
  }

  public resetWatch() : void {
    if(this.modelWatch.editMode === EditMode.Hour || this.modelWatch.editMode === EditMode.Minute){
      this.modelWatch.offset_hour   = 0;
      this.modelWatch.offset_minute = 0;
      this.modelWatch.offset_second = 0;
    }
  }
}
