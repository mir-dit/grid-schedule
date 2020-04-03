import {
  IAugmentedJQuery,
  IDirective,
  IDirectiveFactory,
  IScope,
  IAttributes,
  IRootScopeService
} from "angular";

export class filterListDirective implements IDirective {
  restrict = 'E';
  scope = {
    'items': '=',
    'tabs': '='
  }
  template = require('./filterList.template.html');

  constructor($rootScope: IRootScopeService) {}

  link = (scope: IScope | any, element: IAugmentedJQuery, attrs: IAttributes) => {

    this.init(scope)
  }

  static factory(): IDirectiveFactory {
    const directive = ($rootScope: IRootScopeService) => new filterListDirective($rootScope);
    directive.$inject = ['$rootScope'];
    return directive;
  }

  init(scope) {
    console.debug(scope)
  }

}

export default filterListDirective;
