class WatchController {}

export class DigitalWatchController extends WatchController{

  //watch button
  private modeButton     : HTMLElement;
  private increaseButton : HTMLElement;
  private lightButton    : HTMLElement;
  private resetButton    : HTMLElement;
  private am_pm_Button   : HTMLElement;

  constructor(watchElement: HTMLElement) {
    super();
    this.modeButton     = watchElement.querySelector('.button-mode')!;
    this.increaseButton = watchElement.querySelector('.button-increase')!;
    this.lightButton    = watchElement.querySelector('.button-light')!;
    this.resetButton    = watchElement.querySelector('.button-reset')!;
    this.am_pm_Button   = watchElement.querySelector('.button-am-pm')!;

    if (!this.modeButton)     throw new Error("Failed to find the .button-mode element within the provided watchElement.");
    if (!this.increaseButton) throw new Error("Failed to find the .button-increase within the provided watchElement.");
    if (!this.lightButton)    throw new Error("Failed to find the .button-light element within the provided watchElement.");
    if (!this.resetButton)    throw new Error("Failed to find the .button-reset element within the provided watchElement.");
    if (!this.am_pm_Button)   throw new Error("Failed to find the .button-am-pm element within the provided watchElement.");


  }

  getModeButton()     : HTMLElement { return this.modeButton;     }
  getIncreaseButton() : HTMLElement { return this.increaseButton; }
  getLightButton()    : HTMLElement { return this.lightButton;    }
  getResetButton()    : HTMLElement { return this.resetButton;    }
  getAmPmButton()     : HTMLElement { return this.am_pm_Button;   }
}
