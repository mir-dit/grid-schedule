import {IController} from 'angular';
import {IDropdownScope} from '@components/dropdown/dropdown.model';

export class DropdownController implements IController {
  constructor(private $scope: IDropdownScope) {
    $scope.show = false;
    $scope.scope = $scope;
    $scope.toggleShow = this.toggleShow;
  }

    private toggleShow = (): void => {
      this.$scope.show = !this.$scope.show;
    }
}
