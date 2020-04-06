import {TableCtrl, ITableScope} from './table.controller';

export class tableDirective implements ng.IDirective {
  public restrict = 'E';
  public template = require('./table.html');
  public controller = TableCtrl;
  public scope = {
    columns: '=',
  };

  link = ($scope: ITableScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
    $scope.element = element;
  }

  static factory() {
    return () => new tableDirective();
  }
}

export default tableDirective;
