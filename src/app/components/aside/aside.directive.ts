import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes, INgModelController} from "angular";
import {AsideController} from "@components/aside/aside.controller";
import {IAsideScope} from "@components/aside/aside.model";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.html');
  controller = AsideController;
  scope = {};

  constructor() {}

  link = (scope: IAsideScope, element: IAugmentedJQuery, attrs: IAttributes) => {};

  static factory(): IDirectiveFactory {
    return () => new asideDirective();
  }


}

export default asideDirective;
