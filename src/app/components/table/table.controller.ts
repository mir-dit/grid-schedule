import {IController, IScope, ILogService, IWindowService} from 'angular';
import {Columns, Rows} from './tabe.directive';
import {users} from '../../../mocks/user';

interface ITableScope extends IScope {
  columns: Columns;
  rows: Rows;
  offset: Number;
}

export class TableCtrl implements IController {

  constructor(private $scope: ITableScope, private $window: IWindowService, private $timeout) {
    const date = new Date();
    $scope.columns = [
      {key: '1', date, doctor: users[0].name, specialty: String(users[0].specialty), adress: 'teafsddfdfdfdffdfdf', interval: users[0].schedule || ''},
      {key: '2', date, doctor: users[1].name, specialty: String(users[1].specialty), adress: 'teafsdaf', interval: users[1].schedule || ''},
      {key: '3', date, doctor: users[2].name, specialty: String(users[2].specialty), adress: 'teafsdaf', interval: users[2].schedule || ''},
      {key: '4', date, doctor: users[3].name, specialty: String(users[3].specialty), adress: 'teafsdaf', busy: 'Врач на больничном' },
      {key: '5', date, doctor: users[4].name, specialty: String(users[4].specialty), adress: 'teafsdaf', interval: users[4].schedule || ''},
    ];
    $scope.rows = [
      { '1': {time: date}, '2': {time: date}, '3': {time: date}, '5': {time: date}},
      { '1': {time: date}, '2': {time: date}, '3': {time: date}, '5': {time: date}},
      { '1': {time: date}, '2': {reason: 'Курит мануалы'}, '3': {time: date}, '5': {time: date}},
      { '1': {time: date}, '3': {time: date}},
      { '1': {time: date}, '3': {time: date}},
    ];

    $scope.offset = 0;

    $scope.$on('ps-scroll-y', this.scroll);
  }

  private scroll = (event: any, target: any): void => {
    this.$scope.offset = -target.scrollTop;
  }

}
