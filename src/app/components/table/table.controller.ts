import {IController, IScope, IAugmentedJQuery, ITimeoutService} from 'angular';
import {Column} from './table.model';

interface ITableHeigts {
  doctor: number;
  specialty: number;
  address: number;
}

export interface ITableScope extends IScope {
  columns: Column[];
  offset: number;
  element: IAugmentedJQuery;
  rolled: number[];
  unroll: (index: number) => void;
  heights: ITableHeigts | null;
  headerLockedHeight: Number;
}

interface IHeaderColumn {
  doctorHeight: number;
  specialtyHeight: number;
  addressHeight: number;
  intervalHalfOffset: number;
  isMax: boolean;
  isBusy: boolean;
}

enum HeaderColumnDiv {
  doctor = 1,
  specialty,
  address,
  interval,
}

export class TableCtrl implements IController {

  headerColumns: IHeaderColumn[] = [];

  constructor(private $scope: ITableScope, $timeout: ITimeoutService) {
    $scope.offset = 0;
    $scope.rolled = [];
    this.$scope.heights = null;
    $scope.$on('ps-scroll-y', this.scroll);
    $scope.$watch('columns', () => {
      $scope.offset = 0;
      this.$scope.element[0].getElementsByClassName('table')[0].scrollTop = 0;
      $timeout(this.updateIntervals, 0);
    });
    $scope.$watch('offset', this.updateRolled);
    $scope.$watch('rolled', this.updateHeights);
    $scope.unroll = this.unroll;
  }

  private unroll = (index: number): void => {
    if (this.$scope.rolled.includes(index))
      this.$scope.rolled.splice(this.$scope.rolled.indexOf(index), 1);
  }
  
  private scroll = (event: any, target: any): void => {
    this.$scope.$apply(() => {
      this.$scope.offset = target.scrollTop;
    });
  }

  private updateIntervals = (): void => {
    const columns = Array.from(this.$scope.element[0].getElementsByClassName('table__header-column')) as HTMLDivElement[];
    this.$scope.headerLockedHeight = columns[0].offsetHeight;
    this.headerColumns = columns.map((columnDiv: HTMLDivElement) => {
      const intervalDiv = columnDiv.children[HeaderColumnDiv.interval] as HTMLDivElement;
      return {
        doctorHeight: (columnDiv.children[HeaderColumnDiv.doctor] as HTMLDivElement).offsetHeight,
        specialtyHeight: (columnDiv.children[HeaderColumnDiv.specialty] as HTMLDivElement).offsetHeight,
        addressHeight: (columnDiv.children[HeaderColumnDiv.address] as HTMLDivElement).offsetHeight,
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
    const rollableColumns = this.headerColumns.filter(({isBusy}) => !isBusy);
    if (rollableColumns.length === 0) {
      this.$scope.rolled = [];
      return;
    }
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

  private updateHeights = (): void => {
    const rollableColumns = this.headerColumns.filter(({isBusy}) => !isBusy);
    if (this.$scope.rolled.length === 0 || rollableColumns.length !== this.$scope.rolled.length) {
      this.$scope.heights = null;
      return;
    }
    this.$scope.heights = {
      doctor: Math.max(...rollableColumns.map(({ doctorHeight }) => doctorHeight)),
      specialty: Math.max(...rollableColumns.map(({ specialtyHeight }) => specialtyHeight)),
      address: Math.max(...rollableColumns.map(({ addressHeight }) => addressHeight)),
    };
  }

}
