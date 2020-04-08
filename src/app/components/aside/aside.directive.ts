import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes, INgModelController} from "angular";
import {AsideController} from "@components/aside/aside.controller";
import {IAsideScope} from "@components/aside/aside.model";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.html');
  controller = AsideController;
  scope = {};

  constructor() {}

  link = (scope: IAsideScope, element: IAugmentedJQuery, attrs: IAttributes, ngModel: any) => {
    this.watchDebug(scope)
  };

  static factory(): IDirectiveFactory {
    return () => new asideDirective();
  }

  private watchDebug(scope) {
    scope.fields.forEach((el, index) => {
      scope.$watch(`fields[${index}].value`, (newVal, oldVal) => {
        console.debug(el.key, newVal);
      })
    })
  }

}

export default asideDirective;
