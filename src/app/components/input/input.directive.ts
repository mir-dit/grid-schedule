import {InputController} from '@components/input/input.controller';

export class InputDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./input.html');
  controller = InputController;
  scope = {
    id: '=',
    placeholder: '=',
    type: '@',
    before: '=',
    after: '=',
    value: '=',
  };

  static factory() {
    return (): ng.IDirective => new InputDirective();
  }
}
