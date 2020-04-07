import {IController} from "angular";
import {asideFields, IAsideScope} from "@mocks/aside";
import users from "@mocks/user";
import {preset} from "@app/models/datepicker"

export class AsideController implements IController {

    constructor(private $scope: IAsideScope) {
        $scope.scope = $scope;
        $scope.fields = asideFields;
        $scope.users = users;
        $scope.datepicker = preset
    }

}
