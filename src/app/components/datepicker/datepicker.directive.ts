import {DatepickerController} from './datepicker.controller';

export class DatepickerDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./datepicker.html');
  controller = DatepickerController;
  scope = {
    value: '=',
    onChange: '=',
  };

  static factory() {
    return (): ng.IDirective => new DatepickerDirective();
  }
}
