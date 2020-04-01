import {IController, IScope, ILogService} from 'angular';
import {Column, Row} from '../../components/table/tabe.directive';
import {users, ISpecialist} from '../../../mocks/user';
import {records, IRecord} from '../../../mocks/record';

const specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];

interface ISheldureScope extends IScope {
  timeGap: Number;
  columns: Column[];
}

function cloneDate(date: Date): Date {
  return new Date(date.valueOf());
}

function addDays(date: Date, days: number): Date {
  const clone = cloneDate(date);
  clone.setDate(date.getDate() + days);
  return clone;
}

function addMinutes(date: Date, minutes: number): Date {
  const clone = cloneDate(date);
  clone.setMinutes(date.getMinutes() + minutes );
  return clone;
}

export class ScheduleCtrl implements IController {
  private title: string = 'Расписание специалистов';

  constructor(private $scope: ISheldureScope) {
    $scope.timeGap = 1;
    $scope.$watch('timeGap', this.updateColumns)
  }

  private generateDates(from: Date): Date[] {
    const dates = [from];
    for (let i = 1; i < this.$scope.timeGap; i++)
      dates.push(addDays(from, i));
    return dates;
  }

  private getUserRows(user: ISpecialist): Row[] {
    const times = [user.schedule.start];
    const diff = 60 / user.step;
    do {
      times.push(addMinutes(user.schedule.start, diff));
    }  while (times[times.length] <= user.schedule.end);
    return times.map((time) => ({ time }));
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
      ...(busy ? {busy: busy.message} : {
        interval:  user.schedule.title,
        rows: this.getUserRows(user),
      }),
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
