import {IController} from "angular";
import {IInputScope} from "@components/input/input.model";

export class InputController implements IController {

    constructor(private $scope: IInputScope) {
        $scope.scope = $scope;
        $scope.value =  $scope.defaultValue || '';
        $scope.changeValue = this.changeValue
    }

    private changeValue = (event, ngModel) => {
        console.debug(event);
        console.debug(ngModel);
        // scope.$emit('change', scope.value.value)
    }
}
