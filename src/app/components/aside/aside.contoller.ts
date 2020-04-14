import {IInputService, IInputState} from '@app/services/input.service';
import {setTime} from '@app/helpers/date';

interface IAsideScope extends ng.IScope {
  show: boolean;
  handleDateChange: (value: Date | null) => void;
  inputState: IInputState;
}

export class AsideController {
  static $inject = ['$scope', 'InputService'];

  constructor(private $scope: IAsideScope, private inputService: IInputService) {
    $scope.show = false;
    $scope.inputState = inputService.state;

    $scope.$watchCollection('inputState.specialists', this.handleSpecialistsChange);
    $scope.handleDateChange = this.handleDateChange;
  }

  private handleDateChange = (value: Date | null): void => {
    this.inputService.state.date = value;
  }

  private handleSpecialistsChange = (): void => {
    if (!this.inputService.state.date && this.inputService.state.specialists.length) {
      this.inputService.state.date = setTime(new Date(), new Date(2020, 1, 1, 0, 0, 0));
    }
  }
}
