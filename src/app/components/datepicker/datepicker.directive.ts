import {DatepickerController} from './datepicker.controller';

export class DatepickerDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./datepicker.html');
  controller = DatepickerController;
  controllerAs = 'dateCtrl';
  bindToController = true;
  scope = {
    value: '=',
    onChange: '&',
    active: '=',
  };

  static factory() {
    return (): ng.IDirective => new DatepickerDirective();
  }
}
