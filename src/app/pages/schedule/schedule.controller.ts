import {IController} from "angular";

export class ScheduleCtrl implements IController{
  private title: string;

  constructor($scope) {
    this.title = 'Расписание специалистов';
    $scope.timeGap = 'week';
  }

  $onInit(): void {
    console.log('test');
  }
}
