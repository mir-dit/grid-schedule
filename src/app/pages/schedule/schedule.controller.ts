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
    const dates: Date[] = [from];
    for (let i = 1; i < this.$scope.timeGap; i++)
      dates.push(addDays(from, i));
    return dates;
  }

  private getUserRecords(user: ISpecialist, date: Date): IRecord[] {
    return records.filter(({userId, start, end}) => userId === user.id && start <= date &&  date <= end);
  }

  private getSpecialistsForDate(date: Date): ISpecialist[] {
    return specialists.filter(user => user.schedule.days.includes(date.getDay()));
  }

  private getUserTimes(user: ISpecialist, date: Date): Date[] {
    const start: Date = setTime(date, user.schedule.start);
    const end: Date = setTime(date, user.schedule.end);
    const times: Date[] = [start];
    const diff: number = 60 / user.step;
    do {
      times.push(addMinutes(times[times.length - 1], diff));
    }  while (times[times.length - 1] <= end);
    return times;
  }

  private createRows(user: ISpecialist, date: Date): Row[] {
    const times: Date[] = this.getUserTimes(user, date);
    const affairs: IRecord[] = times
      .map((time: Date) => this.getUserRecords(user, time).filter(({type}: IRecord) => type !== 'danger' && type !== 'primary'))
      .flat()
      .filter((record, index, arr) => arr.findIndex((r: IRecord) => record.id === r.id) === index);
    return times
      .filter((time: Date) => !affairs.find(({start, end}: IRecord) => start < time && time < end))
      .reduce((acc: Row[], time: Date, index: number, arr: Date[]) => {
        const firstAffair: IRecord = index === 0 && affairs.find((affair) => affair.end <= time);
        if (firstAffair)
          return [{ reason: firstAffair.message }, { time }];
        const nextIndex: number = index + 1;
        const affair: IRecord = affairs.find((affair) => time <= affair.start && (nextIndex === arr.length || affair.end <= arr[nextIndex]));
        return affair ? [...acc, { time }, { reason: affair.message }] : [...acc, { time }];
      }, []);
  }

  private createColumns(users: ISpecialist[], date: Date): Column[] {
    return users.map((user: ISpecialist) => {
      const busy = this.getUserRecords(user, date).find(({type}: IRecord) => type === 'danger');
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
