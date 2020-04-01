import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IScope, IAttributes} from 'angular';
import {TableCtrl} from './table.controller';

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

export interface IRow  {
  [columnKey: string]: (IRowAffairs | IRowFree | IRowUsed);
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
}

export type Column = IColumnBusy | IColumnFree;
export type Rows = IRow[];

interface ITableScope extends IScope {
  columns: Column[];
  rows: Rows;
}

export class tableDirective implements IDirective {
  public restrict = 'E';
  public template = require('./table.html');
  public controller = TableCtrl;
  public scope = {
    columns: '=',
    rows: '=',
  };

  constructor(private $location: ILocationService) {}

  static factory(): IDirectiveFactory {
    const directive = ($location: ILocationService) => new tableDirective($location);
    directive.$inject = ['$location'];
    return directive;
  }
}

export default tableDirective;
