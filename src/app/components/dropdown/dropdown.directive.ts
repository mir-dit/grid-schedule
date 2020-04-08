import {IAugmentedJQuery, IDirective, IDirectiveFactory, IAttributes} from "angular";
import {DropdownController} from "@components/dropdown/dropdown.controller";
import {IDropdownScope} from "@components/dropdown/dropdown.model";

export class dropdownDirective implements IDirective {
  restrict = 'E';
  template = require('./dropdown.html');
  controller = DropdownController;
  scope = {
    icon: '=',
    items: '=',
    type: '@',
    handler: '='
  };

  constructor() {}

  link = (scope: IDropdownScope, element: IAugmentedJQuery, attrs: IAttributes) => {};

  static factory(): IDirectiveFactory {
    return () => new dropdownDirective();
  }

}

export default dropdownDirective;
