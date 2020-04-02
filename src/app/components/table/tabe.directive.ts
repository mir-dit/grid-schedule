import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IAttributes} from 'angular';
import {TableCtrl, ITableScope} from './table.controller';

export interface IRowAffairs  {
  reason: string;
}

export interface IRowUsed {
  time: Date;
  patient: string;
}

export interface IRowFree {
  time: Date;
}

export interface IColumn {
  date: Date;
  doctor: string;
  specialty: string;
  adress: string;
}

export interface IColumnBusy extends IColumn {
  busy: string;
}

export interface IColumnFree extends IColumn {
  interval: string;
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
