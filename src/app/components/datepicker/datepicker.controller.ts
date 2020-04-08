import {IController} from "angular";
import {defaultConfig, IDatepickerScope} from "@components/datepicker/datepicker.model";

export class DatepickerController implements IController {

    constructor(private $scope: IDatepickerScope) {
        $scope.show = false;
        $scope.config = {...defaultConfig}
        $scope.toggleShow = this.toggleShow
    }

    private toggleShow = () => this.$scope.show = !this.$scope.show

}
