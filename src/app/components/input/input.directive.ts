import {IInputScope} from '@components/input/input.model';
import {InputController} from '@components/input/input.controller';

export class InputDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./input.html');
  controller = InputController;
  scope = {
    id: '=',
    placeholder: '=',
    defaultValue: '=',
    type: '@',
    before: '=',
    after: '=',
  };
  require = '^ngModel';

  link = (scope: IInputScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel): void => {
    scope.ngModel = ngModel;
  };

  static factory() {
    return (): ng.IDirective => new InputDirective();
  }
}
