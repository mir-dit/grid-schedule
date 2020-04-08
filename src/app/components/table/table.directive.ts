import {TableCtrl, ITableScope} from './table.controller';

export class tableDirective implements ng.IDirective {
  public restrict = 'E';
  public template = require('./table.html');
  public controller = TableCtrl;
  public scope = {
    columns: '=',
    onSelect: '=',
  };

  link = ($scope: ITableScope, element: ng.IAugmentedJQuery) => {
    $scope.element = element;
  }

  static factory() {
    return () => new tableDirective();
  }
}
