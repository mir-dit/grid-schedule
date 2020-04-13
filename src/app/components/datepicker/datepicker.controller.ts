import {IInputService, IInputState} from '@app/services/input.service';
import {setTime} from '@app/helpers/date';

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
  inputState: IInputState;
}

export class DatepickerController {
  static $inject = ['$scope', 'InputService'];

  constructor(private $scope: IDatepickerScope, private inputService: IInputService) {
    $scope.show = false;
    $scope.config = config;
    $scope.value = inputService.state.date || '';
    $scope.inputState = inputService.state;

    $scope.$watchCollection('inputState.specialists', this.handleSpecialistsChange);
    $scope.handleValueChange = this.handleValueChange;
  }

  private handleValueChange = (): void => {
    this.inputService.state.date = this.$scope.value instanceof Date ? this.$scope.value : null;
  }

  private handleSpecialistsChange = (): void => {
    if (!this.inputService.state.date && this.inputService.state.specialists.length) {
      this.$scope.value = setTime(new Date(), new Date(2020, 1, 1, 0, 0, 0));
      this.handleValueChange();
    }
  }
}
