import {asideFields, IAsideScope} from '@components/aside/aside.model';
import users from '@mocks/user';
import {preset} from '@app/models/datepicker';

export class AsideController {
  constructor(private $scope: IAsideScope) {
    $scope.scope = $scope;
    $scope.fields = asideFields;
    $scope.users = users;
    $scope.datepicker = preset;

    // Initialization
    this.watchDebug();
  }

  private watchDebug(): void {
    this.$scope.fields.forEach((el, index) => {
      this.$scope.$watch(`fields[${index}].value`, (newVal) => {
        console.log(el.key, newVal);
      });
    });
  }
}
