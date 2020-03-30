import {IAugmentedJQuery, IDirective, IDirectiveFactory, ILocationService, IScope, IAttributes} from 'angular'';

export interface IColumn {
  date: Date,
  doctor: String,
  specialty: String,
  adress: String,
}

interface ITableScope implements IScope {
  columns: IColumn[],
}

export class tableDirective implements IDirective {
  public restrict = 'E';
  public template = require('./table.html');
  public scope = {
    columns: '=',
  };

  constructor(private $location: ILocationService) {}

  public link: (scope: ITableScope, element: IAugmentedJQuery, attrs: IAttributes, ctrl: any) => void;

  static factory(): IDirectiveFactory {
    const directive = ($location: ILocationService) => new tableDirective($location);
    directive.$inject = ['$location'];
    return directive;
  }
}

export default tableDirective;
