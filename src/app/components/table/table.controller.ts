import {IController, IScope, IAugmentedJQuery, ITimeoutService} from 'angular';
import {Column} from './table.model';

const BORDER_SIZE = 2;

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
  unrolledIndex: number | null;
  heights: ITableHeigts | null;
  headerLockedHeight: number;
  maxRolledHeight: number;
}

enum HeaderColumnDiv {
  doctor = 1,
  specialty,
  address,
  interval,
}

export class TableCtrl implements IController {

  constructor(private $scope: ITableScope, $timeout: ITimeoutService) {
    $scope.offset = 0;
    $scope.rolled = [];
    $scope.unrolledIndex = null;
    $scope.heights = null;
    $scope.$on('ps-scroll-y', this.scroll);
    $scope.$watch('columns', () => {
      this.resetScroll();
      $timeout(this.updateRolled, 0);
    });
    $scope.$watch('offset', this.resetUnrolled);
    $scope.unroll = this.unroll;
  }

  private resetScroll(): void {
    this.$scope.offset = 0;
    const table = this.$scope.element[0].getElementsByClassName('table')[0] as HTMLDivElement;
    table.scrollTop = 0;
    table.scrollLeft = 0;
  }

  private unroll = (index: number): void => {
    this.$scope.unrolledIndex = index;
  }

  private resetUnrolled = (): void => {
    if (this.$scope.unrolledIndex !== null)
      this.$scope.unrolledIndex = null;
  }
  
  private scroll = (event: any, target: any): void => {
    this.$scope.$apply(() => {
      this.$scope.offset = target.scrollTop;
    });
  }

  private getMaxHeight(columns: HTMLDivElement[], div: HeaderColumnDiv) {
    return Math.max(...columns.map((columnDiv: HTMLDivElement) => (columnDiv.children[div] as HTMLDivElement).offsetHeight));
  }

  private updateRolled = (): void => {
    const columns = Array.from(this.$scope.element[0].getElementsByClassName('table__header-column')) as HTMLDivElement[]; 
    this.$scope.headerLockedHeight = columns[0].offsetHeight;
    const halfOffsets: number[] = columns.map((columnDiv: HTMLDivElement) => {
      const intervlalDiv = columnDiv.children[HeaderColumnDiv.interval] as HTMLDivElement;
      return columnDiv.offsetHeight - intervlalDiv.offsetTop - intervlalDiv.offsetHeight / 2 + BORDER_SIZE;
    });
    const minHalfOffset = Math.min(...halfOffsets);
    const maxHalfOffset = Math.max(...halfOffsets);
    this.$scope.maxRolledHeight = maxHalfOffset;
    this.$scope.rolled = halfOffsets.map((halfOffset: number) => halfOffset === minHalfOffset ? minHalfOffset : maxHalfOffset);
    this.$scope.heights = {
      doctor: this.getMaxHeight(columns, HeaderColumnDiv.doctor),
      specialty: this.getMaxHeight(columns, HeaderColumnDiv.specialty),
      address: this.getMaxHeight(columns, HeaderColumnDiv.address),
    };
  }

}
