import {Column, Row, IRowCross, IRowAffairs, IRowFree, IRowUsed} from '../../components/table/table.model';
import {ISpecialist} from '../../../mocks/user';
import {IRecord} from '../../../mocks/record';
import {addDays, setTime, addMinutes} from '../../helpers/date';
import {IScheduleService} from './schedule.service';
import {IPopupPosition} from '../../components/popup/popup.controller';

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

  static $inject = ['$scope', 'ScheduleService'];

  constructor(private $scope: ISheldureScope, private scheduleService: IScheduleService) {
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
          end: addMinutes(row.time, 60 / this.scheduleService.specialists.find(({id}: ISpecialist) => id === column.userId).step),
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
    const affairs: IRecord[] = this.scheduleService.getUserRecordsBetweenDates(user, date, nextDate).filter(({type}: IRecord) => type !== 'danger' && type !== 'primary');
    for (const time of times) {
      const used: IRecord[] = this.scheduleService.getUserRecordsIncludesDate(user, time).filter(({ type }: IRecord) => type === 'primary');
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
      const busy = this.scheduleService.getUserRecordsIncludesDate(user, date).find(({ type }: IRecord) => type === 'danger');
      return {
        userId: user.id,
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
    this.$scope.columns = this.generateDates(new Date(2019, 4, 1)).map(date => this.createColumns(this.scheduleService.getSpecialists(date), date)).flat();
  }

}
