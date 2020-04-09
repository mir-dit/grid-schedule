import {IInputScope} from '@components/input/input.model';

export class InputController {
  constructor(private $scope: IInputScope) {
    $scope.scope = $scope;
  }
}
