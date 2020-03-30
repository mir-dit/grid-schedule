import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IScope, IAttributes} from "angular";

export class tableDirective implements IDirective {
  restrict = 'E';
  scope = {
    'name': '='
  };
  template = require('./table.html');

  constructor(private $location: ILocationService) {}

  link = (scope: IScope, element: IAugmentedJQuery, attrs: IAttributes, ctrl: any) => {
    console.log(this.$location);
    console.log(scope);
  };

  static factory(): IDirectiveFactory {
    const directive = ($location: ILocationService) => new tableDirective($location);
    directive.$inject = ['$location'];
    return directive;
  }
}

export default tableDirective;
