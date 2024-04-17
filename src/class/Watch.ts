import { DigitalWatchUI } from './WatchUI.ts';
import { DigitalWatchController } from './WatchController.ts';
import { WatchModel } from './WatchModel.ts';

// Watch Base class : implement this class if you want to create any other kind of watch
class Watch {
  protected intervalId   : number;
  protected selectedZone : number;

  /* Instance of the TimeService, DigitalWatchUI, DigitalWatchController
     for handling time operations, manage watch UI and Controller */
  protected watchUI         : DigitalWatchUI;
  protected watchController : DigitalWatchController;
  protected watchModel      : WatchModel;
}

// Digital watch implementation
export class DigitalWatch extends Watch {

  constructor(watchElement : HTMLElement,
              selectedZone : number)
  {
    super();
    this.selectedZone  = selectedZone;

    // Initialize the TimeService, DigitalWatchUI and DigitalWatchController.
    this.watchModel      = new WatchModel();
    this.watchUI         = new DigitalWatchUI(watchElement, this.watchModel);
    this.watchController = new DigitalWatchController(watchElement, this.watchModel, this.watchUI);


    // Immediately display time and update every seconds
    this.execute(selectedZone);
    this.intervalId = window.setInterval(() => this.execute(selectedZone), 1000);
  }



  private execute(selectedZone : number) : void {
    this.watchUI.updateDisplay(selectedZone);
  }
}
