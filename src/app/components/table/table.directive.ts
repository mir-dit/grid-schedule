import {TableCtrl, ITableScope} from './table.controller';

export class TableDirective implements ng.IDirective {
  public restrict = 'E';
  public template = require('./table.html');
  public controller = TableCtrl;
  public scope = {
    columns: '=',
    onSelect: '&',
  };

  link = ($scope: ITableScope, element: ng.IAugmentedJQuery): void => {
    $scope.element = element;
  }

  static factory() {
    return (): ng.IDirective => new TableDirective();
  }
}
