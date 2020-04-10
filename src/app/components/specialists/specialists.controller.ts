import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {ISpecialist} from '@mocks/user';

enum Order {
  specialty,
  alphabetically,
}

export interface ISpecialistsScope extends ng.IScope {
  noResults: boolean;
  value: ISpecialist | string;
  specialists: ISpecialist[];
  handleBlur: () => void;
  order: Order;
  selected: number[];
}

export class SpecialistsController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService'];

  constructor(private $scope: ISpecialistsScope, scheduleService: IScheduleService) {
    $scope.value = '';
    $scope.specialists = scheduleService.getSpecialists();
    $scope.order = Order.specialty;
    $scope.selected = [];

    $scope.$watch('value', this.handleValueChange);
    $scope.handleBlur = this.handleBlur;
  }

  private handleBlur = (): void => {
    if (this.$scope.noResults) {
      this.$scope.noResults = false;
      this.$scope.value = '';
    }
  }

  private handleValueChange = (): void => {
    if (typeof this.$scope.value !== 'object') return;
    const value = this.$scope.value as ISpecialist;
    if (!this.$scope.selected.includes(value.id)) {
      this.$scope.selected.push(value.id);
    }
  }
}
