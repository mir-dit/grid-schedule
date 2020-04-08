import {IController} from "angular";
import {IInputScope} from "@components/input/input.model";

export class InputController implements IController {

    constructor(private $scope: IInputScope) {
        $scope.scope = $scope;
        $scope.value = $scope.defaultValue || null;
        $scope.changeValue = this.changeValue
    }

    private changeValue = (scope) => {
        scope.$watch('value', (newVal, oldVal) => scope.ngModel.$setViewValue(newVal));
    }
}
