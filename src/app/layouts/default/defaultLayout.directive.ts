import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes} from "angular";

export class defaultLayoutDirective implements IDirective {
  restrict = 'E';
  scope = {};
  template = require('./defaultLayout.template.html');

  constructor() {}

  link = (scope: IScope, element: IAugmentedJQuery, attrs: IAttributes) => {};

  static factory(): IDirectiveFactory {
    return () => new defaultLayoutDirective();
  }
}

export default defaultLayoutDirective;
