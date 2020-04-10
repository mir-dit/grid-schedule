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
}

export class SpecialistsController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService'];

  constructor(private $scope: ISpecialistsScope, scheduleService: IScheduleService) {
    $scope.value = '';
    $scope.specialists = scheduleService.getSpecialists();
    $scope.order = Order.specialty;

    // $scope.$watch('value', this.handleValueChange);
    $scope.handleBlur = this.handleBlur;
  }

  private handleBlur = (): void => {
    if (this.$scope.noResults) {
      this.$scope.noResults = false;
      this.$scope.value = '';
    }
  }
}
