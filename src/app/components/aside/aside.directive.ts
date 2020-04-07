import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes} from "angular";
import {AsideController} from "@components/aside/aside.controller";
import {IAsideScope} from "@mocks/aside";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.template.html');
  controller = AsideController;
  scope = {};

  constructor() {}

  link = (scope: IAsideScope, element: IAugmentedJQuery, attrs: IAttributes) => {
    this.init(scope)
  };

  static factory(): IDirectiveFactory {
    return () => new asideDirective();
  }

  private init(scope) {
    scope.fields.forEach((el, index) => {
      scope.$watch(`fields[${index}].value`, (newVal, oldVal) => {
        console.debug(el.key, newVal);
      })
    })
  }

}

export default asideDirective;
