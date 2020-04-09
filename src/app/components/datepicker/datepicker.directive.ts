import {IDirective, IDirectiveFactory} from 'angular';
import {DatepickerController} from '@components/datepicker/datepicker.controller';

export class DatepickerDirective implements IDirective {
  restrict = 'E';
  template = require('./datepicker.html');
  controller = DatepickerController;
  scope = {
    value: '=',
    placeholder: '=',
    id: '=',
    callback: '=',
  };

  static factory(): IDirectiveFactory {
    return (): IDirective => new DatepickerDirective();
  }
}
