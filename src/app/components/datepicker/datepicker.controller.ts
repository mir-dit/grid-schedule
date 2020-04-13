import {IInputService} from '@app/services/input.service';

interface IDatepicker {
  format: string;
  minDate: Date;
  maxDate: Date;
  options: {
    formatYear: string;
    startingDay: number;
  };
}

const config: IDatepicker = {
  format: 'dd.MM.yyyy',
  minDate: new Date(),
  maxDate: new Date(2025, 1, 1),
  options: {
    formatYear: 'yy',
    startingDay: 1,
  },
};

interface IDatepickerScope extends ng.IScope {
  show: boolean;
  config: IDatepicker;
  value: Date | string;
  handleValueChange: () => void;
}

export class DatepickerController {
  static $inject = ['$scope', 'InputService'];

  constructor(private $scope: IDatepickerScope, private inputService: IInputService) {
    $scope.show = false;
    $scope.config = config;
    $scope.value = inputService.state.date || '';

    $scope.handleValueChange = this.handleValueChange;
  }

  private handleValueChange = (): void => {
    this.inputService.state.date = this.$scope.value instanceof Date ? this.$scope.value : null;
  }
}
