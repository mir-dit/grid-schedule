import {IController} from "angular";
import {asideFields, IAsideScope} from "@mocks/aside";
import users from "@mocks/user";

export class AsideController implements IController {

    constructor($scope: IAsideScope) {
        $scope.scope = $scope;
        $scope.fields = asideFields;
        $scope.users = users;
    }

    private init() {
        this.scope.fields.forEach((el, index) => {
            this.scope.$watch(`fields[${index}].value`, (newVal, oldVal) => {
                console.debug(el.key, newVal);
            })
        })
    }

    public toggleAction() {
        console.debug('toggleAction')
    }

}
