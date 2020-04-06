import {Column, Row, IRowCross, IRowAffairs, IRowUsed, IRowFree} from '../../components/table/table.model';
import {users, ISpecialist} from '../../../mocks/user';
import {records, IRecord, IRecordType} from '../../../mocks/record';
import {addDays, setTime, addMinutes} from '../../helpers/date';
import {IPopupPosition} from '../../components/popup/popup.controller';

const specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];

interface ISheldureSelectedTime {
  start: Date;
  end: Date;
}

interface ISheldureSelected {
  position: IPopupPosition;
  time?: ISheldureSelectedTime;
  patient?: string;
}

interface ISheldureScope extends ng.IScope {
  timeGap: number;
  columns: Column[];
  updateColumns: () => void;
  handleTableSelect: (event: MouseEvent, row: IRowFree | IRowUsed | IRowCross, column: Column, patientIndex?: number) => void;
  selected: ISheldureSelected | null,
  handlePopupClose: () => void;
}

export class ScheduleCtrl {

  constructor(private $scope: ISheldureScope) {
    $scope.timeGap = 1;
    $scope.selected = null;

    $scope.updateColumns = this.updateColumns;
    $scope.handleTableSelect = this.handleTableSelect;
    $scope.handlePopupClose = this.handlePopupClose;
    this.updateColumns();
  }

  private handleTableSelect = (event: MouseEvent, row: IRowFree | IRowUsed | IRowCross, column: Column, patientIndex?: number): void => {
    this.$scope.selected = {
      position: {
        x: event.clientX,
        y: event.clientY,
      },
      ...(patientIndex ? {
        patient: patientIndex === 1 ? (row as IRowUsed).patient : (row as IRowUsed).patient2,
      } : {
        time: {
          start: row.time,
          end: addMinutes(row.time, 60 / specialists.find(({id}: ISpecialist) => id === column.userId).step),
        }
      }),
    };
  }

  private handlePopupClose = (): void => {
    this.$scope.selected = null;
  }

  private generateDates(from: Date): Date[] {
    const dates: Date[] = [from];
    for (let i = 1; i < this.$scope.timeGap; i++)
      dates.push(addDays(from, i));
    return dates;
  }

  private getUserRecords(user: ISpecialist, date: Date, filter: IRecordType) {
    return records.filter(({userId, start, end, type}: IRecord) => type === filter && userId === user.id && start <= date && date <= end);
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
    const nextDate: Date = addDays(date, 1);
    const times: Date[] = this.getUserTimes(user, date);
    const rows: Row[] = [];
    const addedAffairs: IRecord[] = []; 
    const affairs: IRecord[] = records.filter(({type, userId, start, end}: IRecord) => userId === user.id && type !== 'danger' && type !== 'primary' && date < start && end < nextDate);
    for (const time of times) {
      const used: IRecord[] = this.getUserRecords(user, time, 'primary');
      const affair = affairs.find(({start, end}: IRecord) => start <= time && time <= end);
      if (affair) {
        if (!addedAffairs.includes(affair)) {
          addedAffairs.push(affair);
          rows.push({ reason: affair.message });
        }
        if (used.length) {
          rows.push({ time, patient: used[0].message, cross: true });
        }
      } else {
        if (rows.length && (rows[rows.length - 1] as IRowCross).cross) {
          let i: number = rows.length - 2;
          for (;!(rows[i] as IRowAffairs).reason && i > 0; i--);
          rows.push({ reason: (rows[i] as IRowAffairs).reason });
        }
        if (used.length) {
          rows.push({ time, patient: used[0].message, patient2: used[1] ? used[1].message : undefined });
        } else {
          rows.push({ time });
        }
      }
    }
    return rows;
  }

  private createColumns(users: ISpecialist[], date: Date): Column[] {
    return users.map((user: ISpecialist) => {
      const busy = this.getUserRecords(user, date, 'danger');
      return {
        userId: user.id,
        date,
        doctor: user.name,
        specialty: user.specialty,
        address: user.hospital,
        ...(busy.length ? {busy: busy[0].message} : {
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
