import {IController} from "angular";
import {IInputScope} from "@components/input/input.model";

export class InputController implements IController {

    constructor(private $scope: IInputScope) {
        $scope.scope = $scope;
        $scope.value = $scope.defaultValue || null;
        $scope.changeValue = this.changeValue
    }

    private changeValue = () => this.$scope.ngModel.$setViewValue(this.$scope.value)
}
