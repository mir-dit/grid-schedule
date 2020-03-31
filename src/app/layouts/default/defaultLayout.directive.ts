import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IScope, IAttributes} from "angular";

export class defaultLayoutDirective implements IDirective {
  restrict = 'E';
  scope = {};
  template = require('./defaultLayout.html');

  constructor(private $location: ILocationService) {}

  link = (scope: IScope, element: IAugmentedJQuery, attrs: IAttributes, ctrl: any) => {
    console.log('$location', this.$location);
  };

  static factory(): IDirectiveFactory {
    const directive = ($location: ILocationService) => new defaultLayoutDirective($location);
    directive.$inject = ['$location'];
    return directive;
  }
}

export default defaultLayoutDirective;
