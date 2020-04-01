import {IController, IScope, ILogService} from 'angular';
import {Columns} from '../../components/table/tabe.directive';
import {users} from '../../../mocks/user';

interface ISheldureScope extends IScope {
  timeGap: String;
  columns: Columns;
}

export class ScheduleCtrl implements IController {
  private title: string = 'Расписание специалистов';

  constructor(private $scope: ISheldureScope, private $log: ILogService) {
    $scope.timeGap = 'week';
    $scope.columns = [];
  }

}
