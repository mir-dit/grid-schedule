import {IController, IScope, ILogService} from 'angular';
import {Column} from '../../components/table/tabe.directive';
import {users, ISpecialist} from '../../../mocks/user';
import {records, IRecord} from '../../../mocks/record';

const specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];

interface ISheldureScope extends IScope {
  timeGap: String;
  columns: Column[];
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

  private getUserBusyRecord(user: ISpecialist, date: Date): IRecord | undefined {
    return records.find((record) => record.userId === user.id && record.type === 'danger' && record.start <= date && record.end >= date);
  }

  private getSpecialistsForDate(date: Date): ISpecialist[] {
    return specialists.filter(user => user.schedule.days.includes(date.getDay()));
  }

  private createColumn(user: ISpecialist, date: Date): Column {
    const busy = this.getUserBusyRecord(user, date);
    return {
      date,
      doctor: user.name,
      specialty: user.specialty,
      adress: user.hospital,
      ...(busy ? {busy: busy.message} : {interval:  user.schedule.title})
    };
  }

  private updateColumns = (): void => {
    const dates = this.generateDates(new Date(2019, 4, 1));
    this.$scope.columns = dates.map(date => 
      this.getSpecialistsForDate(date)
          .map((user) => this.createColumn(user, date))
    ).flat();
  }

}
