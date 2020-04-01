import {IController, IScope, ILogService} from 'angular';
import {Columns} from '../../components/table/tabe.directive';
import {users, ISpecialist} from '../../../mocks/user';
import {records} from '../../../mocks/record';

const specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];

interface ISheldureScope extends IScope {
  timeGap: String;
  columns: Columns;
}

function addDays(date: Date, days: number): Date {
  const clone = new Date(date.valueOf());
  clone.setDate(date.getDate() + days);
  return clone;
}

export class ScheduleCtrl implements IController {
  private title: string = 'Расписание специалистов';

  constructor(private $scope: ISheldureScope) {
    $scope.timeGap = '1day';
    $scope.$watch('timeGap', this.updateColumns)
  }

  private generateDates(from: Date): Date[] {
    switch (this.$scope.timeGap) {
      case '1day': return [from];
      case '2days': return [from, addDays(from, 1)];
      case 'week':
        const dates = [from];
        for (let i = 1; i < 14; i++)
          dates.push(addDays(from, i));
        return dates;
    }
  }

  private getSpecialistsForDate(date: Date): ISpecialist[] {
    return specialists.filter(user => user.schedule.days.includes(date.getDay()));
  }

  private createColumn(user, date) {
    return {
      date,
      doctor: user.name,
      specialty: user.specialty,
      adress: user.hospital,
      interval: user.schedule.title,
    };
  }

  private updateColumns = (): void => {
    const dates = this.generateDates(new Date());
    this.$scope.columns = dates.map(date => this.getSpecialistsForDate(date).map((user) => this.createColumn(user, date))).flat();
  }

}
