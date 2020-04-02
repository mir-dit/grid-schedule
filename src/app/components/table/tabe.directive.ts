import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IScope, IAttributes} from 'angular';
import {TableCtrl, ITableScope} from './table.controller';

export interface IRowAffairs  {
  reason: String;
}

export interface IRowUsed {
  time: Date;
  patient: String;
}

export interface IRowFree {
  time: Date;
}

export interface IColumn {
  date: Date;
  doctor: String;
  specialty: String;
  adress: String;
}

export interface IColumnBusy extends IColumn {
  busy: String;
}

export interface IColumnFree extends IColumn {
  interval: String;
  rows: Row[];
}

export type Column = IColumnBusy | IColumnFree;
export type Row = IRowAffairs | IRowFree | IRowUsed;


export class tableDirective implements IDirective {
  public restrict = 'E';
  public template = require('./table.html');
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
