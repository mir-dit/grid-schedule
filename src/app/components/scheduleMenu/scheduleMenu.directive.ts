import {ScheduleMenuCtrl} from './scheduleMenu.controller';

export class ScheduleMenuDirective implements ng.IDirective {
  public restrict = 'E';
  public template = require('./scheduleMenu.html');
  public controller = ScheduleMenuCtrl;
  public scope = {
    selected: '=',
    onClose: '=',
    selectedPatient: '=',
  };

  static factory() {
    return (): ng.IDirective => new ScheduleMenuDirective();
  }
}
