import {IController, IScope, ILogService, IWindowService} from 'angular';
import {Column} from './tabe.directive';

interface ITableScope extends IScope {
  columns: Column[];
  offset: Number;
}

export class TableCtrl implements IController {

  constructor(private $scope: ITableScope) {
    $scope.offset = 0;
    $scope.$on('ps-scroll-y', this.scroll);
  }

  private scroll = (event: any, target: any): void => {
    this.$scope.$apply(() => {
      this.$scope.offset = target.scrollTop;
    });
  }

}
