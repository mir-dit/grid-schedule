import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IAttributes} from 'angular';
import {TableCtrl, ITableScope} from './table.controller';

export class tableDirective implements IDirective {
  public restrict = 'E';
  public template = require('./table.html');
  public controller = TableCtrl;
  public scope = {
    columns: '=',
  };

  link = ($scope: ITableScope, element: IAugmentedJQuery, attrs: IAttributes) => {
    $scope.element = element;
  }

  static factory(): IDirectiveFactory {
    return () => new tableDirective();
  }
}

export default tableDirective;
