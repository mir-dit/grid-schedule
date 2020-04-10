import {asideFields, IAsideScope} from '@components/aside/aside.model';
import users from '@mocks/user';
import {preset} from '@app/models/datepicker';

export class AsideController {
  constructor(private $scope: IAsideScope) {
    $scope.scope = $scope;
    $scope.fields = asideFields;
    $scope.users = users;
    $scope.datepicker = preset;
  }
}
