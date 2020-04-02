import {IController, IScope} from 'angular';
import {Column, Row} from '../../components/table/table.model';
import {users, ISpecialist} from '../../../mocks/user';
import {records, IRecord} from '../../../mocks/record';
import {addDays, setTime, addMinutes} from '../../helpers/date';

const specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];

interface ISheldureScope extends IScope {
  timeGap: number;
  columns: Column[];
  updateColumns: () => void;
}

export class ScheduleCtrl implements IController {
  private title: string = 'Расписание специалистов';

  constructor(private $scope: ISheldureScope) {
    $scope.timeGap = 1;
    $scope.updateColumns = this.updateColumns;
    this.updateColumns();
  }

  private generateDates(from: Date): Date[] {
    const dates = [from];
    for (let i = 1; i < this.$scope.timeGap; i++)
      dates.push(addDays(from, i));
    return dates;
  }

  private getUserRecords(user: ISpecialist, date: Date): IRecord[] {
    return records.filter((record) => record.userId === user.id && record.start <= date &&  date <= record.end);
  }

  private getSpecialistsForDate(date: Date): ISpecialist[] {
    return specialists.filter(user => user.schedule.days.includes(date.getDay()));
  }

  private getUserTimes(user: ISpecialist, date: Date): Date[] {
    const start = setTime(date, user.schedule.start);
    const end = setTime(date, user.schedule.end);
    const times = [start];
    const diff = 60 / user.step;
    do {
      times.push(addMinutes(times[times.length - 1], diff));
    }  while (times[times.length - 1] <= end);
    return times;
  }

  private createRows(user: ISpecialist, date: Date): Row[] {
    const times = this.getUserTimes(user, date);
    const affairs = times
      .map((time) => this.getUserRecords(user, time).filter((record) => record.type !== 'danger' && record.type !== 'primary'))
      .flat()
      .filter((record, index, arr) => arr.findIndex((r: IRecord) => record.id === r.id) === index);
    return times
      .filter((time) => !affairs.find((affair) => affair.start < time && time < affair.end))
      .reduce((acc: Row[], time, index, arr) => {
        const firstAffair = index === 0 && affairs.find((affair) => affair.end <= time);
        if (firstAffair)
          return [{ reason: firstAffair.message }, { time }];
        const nextIndex = index + 1;
        const affair = affairs.find((affair) => time <= affair.start && (nextIndex === arr.length || affair.end <= arr[nextIndex]));
        return affair ? [...acc, { time }, { reason: affair.message }] : [...acc, { time }];
      }, []);
  }

  private createColumns(users: ISpecialist[], date: Date): Column[] {
    return users.map((user) => {
      const busy = this.getUserRecords(user, date).find((record) => record.type === 'danger');
      return {
        date,
        doctor: user.name,
        specialty: user.specialty,
        address: user.hospital,
        ...(busy ? {busy: busy.message} : {
          interval:  user.schedule.title,
          rows: this.createRows(user, date),
        }),
      };
    });
  }

  private updateColumns = (): void => {
    this.$scope.columns = this.generateDates(new Date(2019, 4, 1)).map(date => this.createColumns(this.getSpecialistsForDate(date), date)).flat();
  }

}
