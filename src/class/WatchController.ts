import { WatchModel } from './WatchModel.ts';
import { DigitalWatchUI } from './WatchUI.ts';

class WatchController {}

export class DigitalWatchController extends WatchController{

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
    this.modeButton     = watchElement.querySelector('.button-mode')!;
    this.increaseButton = watchElement.querySelector('.button-increase')!;
    this.lightButton    = watchElement.querySelector('.button-light')!;
    this.resetButton    = watchElement.querySelector('.button-reset')!;
    this.am_pm_Button   = watchElement.querySelector('.button-am-pm')!;
    this.modelWatch     = modelWatch;
    this.watchUI        = watchUI;

    if (!this.modeButton)     throw new Error("Failed to find the .button-mode element within the provided watchElement.");
    if (!this.increaseButton) throw new Error("Failed to find the .button-increase within the provided watchElement.");
    if (!this.lightButton)    throw new Error("Failed to find the .button-light element within the provided watchElement.");
    if (!this.resetButton)    throw new Error("Failed to find the .button-reset element within the provided watchElement.");
    if (!this.am_pm_Button)   throw new Error("Failed to find the .button-am-pm element within the provided watchElement.");
    if (!this.watchUI)        throw new Error("Failed to bind watchUI in DigitalWatchController.");

    this.setupEventListeners();
  }

  private setupEventListeners() : void {
    this.lightButton.addEventListener('click',    () => { this.modelWatch.turn_on_off_light() ; this.watchUI.toggleLight(this.modelWatch.getLighvalue());} );
    this.modeButton.addEventListener('click',     () => this.modelWatch.setMode()           );
    this.increaseButton.addEventListener('click', () => this.modelWatch.updateTime()        );
    this.resetButton.addEventListener('click',    () => this.modelWatch.resetWatch()        );
    this.am_pm_Button.addEventListener('click',   () => this.modelWatch.setPmAm()           );
  }
}
