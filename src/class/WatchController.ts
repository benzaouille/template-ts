export class DigitalWatchController {

  //watch button
  private modeButton     : HTMLElement;
  private increaseButton : HTMLElement;
  private lightButton    : HTMLElement;
  private resetButton    : HTMLElement;
  private am_pm_Button   : HTMLElement;

  constructor(watchElement: HTMLElement) {
    this.modeButton     = watchElement.querySelector('.button-mode')!;
    this.increaseButton = watchElement.querySelector('.button-increase')!;
    this.lightButton    = watchElement.querySelector('.button-light')!;
    this.resetButton    = watchElement.querySelector('.button-reset')!;
    this.am_pm_Button   = watchElement.querySelector('.button-am-pm')!;
  }

  getModeButton()     : HTMLElement { return this.modeButton;     }
  getIncreaseButton() : HTMLElement { return this.increaseButton; }
  getLightButton()    : HTMLElement { return this.lightButton;    }
  getResetButton()    : HTMLElement { return this.resetButton;    }
  getAmPmButton()     : HTMLElement { return this.am_pm_Button;   }
}
