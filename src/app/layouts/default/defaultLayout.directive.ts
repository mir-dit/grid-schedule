import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IScope, IAttributes} from "angular";

export class defaultLayoutDirective implements IDirective {
  restrict = 'E';
  scope = {};
  template = require('./defaultLayout.html');

  constructor() {}

  link = (scope: IScope, element: IAugmentedJQuery, attrs: IAttributes, ctrl: any) => {};

  static factory(): IDirectiveFactory {
    const directive = () => new defaultLayoutDirective();
    directive.$inject = [];
    return directive;
  }
}

export default defaultLayoutDirective;
