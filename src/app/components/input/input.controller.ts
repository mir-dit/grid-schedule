import {IInputScope} from '@components/input/input.model';

export class InputController {
  constructor(private $scope: IInputScope) {
    $scope.scope = $scope;
    $scope.value = $scope.defaultValue || null;
    $scope.changeValue = this.changeValue;
  }

    private changeValue = (): void => this.$scope.ngModel.$setViewValue(this.$scope.value)
}
