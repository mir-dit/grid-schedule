import {DatepickerController} from '@components/datepicker/datepicker.controller';

export class DatepickerDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./datepicker.html');
  controller = DatepickerController;
  scope = {
    value: '=',
    placeholder: '=',
    id: '=',
    callback: '=',
  };

  static factory() {
    return (): ng.IDirective => new DatepickerDirective();
  }
}
