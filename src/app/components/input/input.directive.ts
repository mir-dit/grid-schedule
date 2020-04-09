import {IAugmentedJQuery, IDirective, IDirectiveFactory, IAttributes} from 'angular';
import {IInputScope} from '@components/input/input.model';
import {InputController} from '@components/input/input.controller';

export class InputDirective implements IDirective {
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

  link = (scope: IInputScope, element: IAugmentedJQuery, attrs: IAttributes, ngModel: any): void => {
    scope.ngModel = ngModel;
  };

  static factory(): IDirectiveFactory {
    return (): IDirective => new InputDirective();
  }
}
