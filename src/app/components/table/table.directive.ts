import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IAttributes} from 'angular';
import {TableCtrl, ITableScope} from './table.controller';

export class tableDirective implements IDirective {
  public restrict = 'E';
  public template = require('./table.template.html');
  public controller = TableCtrl;
  public scope = {
    columns: '=',
  };

  constructor(private $location: ILocationService) {}

  link = ($scope: ITableScope, element: IAugmentedJQuery, attrs: IAttributes) => {
    $scope.element = element;
  }

  static factory(): IDirectiveFactory {
    const directive = ($location: ILocationService) => new tableDirective($location);
    directive.$inject = ['$location'];
    return directive;
  }
}

export default tableDirective;
