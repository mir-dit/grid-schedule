import {IController, IScope, IAugmentedJQuery, ITimeoutService} from 'angular';
import {Column} from './tabe.directive';

export interface ITableScope extends IScope {
  columns: Column[];
  offset: Number;
  element: IAugmentedJQuery;
  rolled: Number[];
  unroll: Function;
}

interface IHeaderColumn {
  intervalHalfOffset: Number;
  isMax: Boolean;
  isBusy: Boolean;
}

enum HeaderColumnDiv {
  name = 1,
  specialty,
  adress,
  interval,
}

export class TableCtrl implements IController {

  headerColumns: IHeaderColumn[] = [];

  constructor(private $scope: ITableScope, $timeout: ITimeoutService) {
    $scope.offset = 0;
    $scope.rolled = [];
    $scope.$on('ps-scroll-y', this.scroll);
    $scope.$watch('columns', () => {
      $scope.offset = 0;
      this.$scope.element[0].getElementsByClassName('table')[0].scrollTop = 0;
      $timeout(this.updateIntervals, 0);
    });
    $scope.$watch('offset', this.updateRolled);
    $scope.unroll = this.unroll;
  }

  private unroll = (index: Number): void => {
    if (this.$scope.rolled.includes(index))
      this.$scope.rolled.splice(this.$scope.rolled.indexOf(index), 1);
  }
  
  private scroll = (event: any, target: any): void => {
    this.$scope.$apply(() => {
      this.$scope.offset = target.scrollTop;
    });
  }

  private updateIntervals = (): void => {
    this.headerColumns = Array.from(this.$scope.element[0].getElementsByClassName('table__header-column')).map((columnDiv: HTMLDivElement) => {
      const intervalDiv = columnDiv.children[HeaderColumnDiv.interval] as HTMLDivElement;
      return {
        intervalHalfOffset: columnDiv.offsetHeight - intervalDiv.offsetTop - intervalDiv.offsetHeight / 2,
        isMax: columnDiv.offsetHeight === intervalDiv.offsetTop + intervalDiv.offsetHeight,
        isBusy: Boolean(columnDiv.getElementsByClassName('table__header-interval_busy').length),
      };
    });
  }

  private isHeaderColumnRolled = (headerColumn: IHeaderColumn): Boolean => {
    return headerColumn.intervalHalfOffset < this.$scope.offset;

  }

  private updateRolled = (): void => {
    if (this.headerColumns.length === 0) {
      this.$scope.rolled = [];
      return;
    }
    const rollableColumns = this.headerColumns.filter(({isBusy}) => !isBusy);
    if (rollableColumns.every(this.isHeaderColumnRolled)) {
      this.$scope.rolled = rollableColumns.map((headerColumn) => this.headerColumns.indexOf(headerColumn));
      return;
    }
    const maxHeaderColumns = rollableColumns.filter(({isMax}) => isMax);
    if (maxHeaderColumns.length === 0)
      throw new Error('isMax determenition logic is broken');
    if (!this.isHeaderColumnRolled(maxHeaderColumns[0])) {
      this.$scope.rolled = [];
      return;
    }
    this.$scope.rolled = maxHeaderColumns.map((headerColumn) => this.headerColumns.indexOf(headerColumn));
  }

}
