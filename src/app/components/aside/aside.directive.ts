import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes} from "angular";
import {datepickerMeta} from "@app/dictionary/datepicker";
import {users} from "@mocks/user";
import {AsideController} from "@components/aside/aside.controller";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.template.html');
  controller = AsideController;
  scope = {};

  constructor() {}

  link = (scope: IScope | any, element: IAugmentedJQuery, attrs: IAttributes) => {};

  static factory(): IDirectiveFactory {
    return () => new asideDirective();
  }

}

export default asideDirective;
