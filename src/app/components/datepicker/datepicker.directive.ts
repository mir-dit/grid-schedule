import {IAugmentedJQuery, IDirective, IDirectiveFactory, IAttributes} from "angular";
import {DatepickerController} from "@components/datepicker/datepicker.controller";
import {IDatepickerScope} from "@components/datepicker/datepicker.model";

export class datepickerDirective implements IDirective {
  restrict = 'E';
  template = require('./datepicker.html');
  controller = DatepickerController;
  scope = {
    value: '=',
    placeholder: '=',
    id: '=',
    callback: '='
  };

  constructor() {}

  link = (scope: IDatepickerScope, element: IAugmentedJQuery, attrs: IAttributes) => {};

  static factory(): IDirectiveFactory {
    return () => new datepickerDirective();
  }

}

export default datepickerDirective;
