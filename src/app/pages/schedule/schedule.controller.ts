import {Column, Cell, ICellTime, ICellAffairs, ICellPatient} from '../../components/table/table.model';
import {ISpecialist, IPatient} from '../../../mocks/user';
import {IRecord} from '../../../mocks/record';
import {addDays, setTime, addMinutes} from '../../helpers/date';
import {IScheduleService} from './schedule.service';
import {ISheldureMenuSelected, ISheldureMenuSelectedPatient} from '../../components/scheduleMenu/scheduleMenu.controller';

interface ISheldureScope extends ng.IScope {
  selectedDate?: Date;
  selectedPatient?: IPatient;
  timeGap: number;
  columns: Column[];
  updateColumns: () => void;
  handleTableSelect: (event: MouseEvent, cell: ICellTime, column: Column, patient?: ICellPatient) => void;
  scheduleMenu: ISheldureMenuSelected | ISheldureMenuSelectedPatient | null;
  handlePopupClose: () => void;
}

export class ScheduleCtrl {
  static $inject = ['$scope', 'ScheduleService'];

  constructor(private $scope: ISheldureScope, private scheduleService: IScheduleService) {
    $scope.selectedDate = new Date(2019, 4, 1); // TODO
    $scope.selectedPatient = scheduleService.getPatientById(6); // TODO
    $scope.timeGap = 1;
    $scope.scheduleMenu = null;
    $scope.$watch('selectedDate', this.updateColumns);
    $scope.$on('records:updated', this.updateColumns);

    $scope.updateColumns = this.updateColumns;
    $scope.handleTableSelect = this.handleTableSelect;
    $scope.handlePopupClose = this.handlePopupClose;
    this.updateColumns();
  }

  private handleTableSelect = (event: MouseEvent, cell: ICellTime, column: Column, patient?: ICellPatient): void => {
    if (!patient && cell.patient2) return;
    const end = addMinutes(cell.time, 60 / this.scheduleService.getSpecialistById(column.specialistId).step);
    const scheduleMenu: ISheldureMenuSelected = {
      position: {x: event.clientX, y: event.clientY},
      specialistId: column.specialistId,
      time: {start: cell.time, end},
    };
    this.$scope.scheduleMenu = patient ? {
      ...scheduleMenu,
      canAdd: !cell.patient2,
      patient: patient.name,
      recordId: patient.recordId,
      patientId: patient.id,
    } : scheduleMenu;
  }

  private handlePopupClose = (): void => {
    this.$scope.scheduleMenu = null;
  }

  private generateDates(from: Date): Date[] {
    const dates: Date[] = [from];
    for (let i = 1; i < this.$scope.timeGap; i++) {
      dates.push(addDays(from, i));
    }
    return dates;
  }

  private getUserTimes(user: ISpecialist, date: Date): Date[] {
    const start: Date = setTime(date, user.schedule.start);
    const end: Date = setTime(date, user.schedule.end);
    const times: Date[] = [start];
    const diff: number = 60 / user.step;
    do {
      times.push(addMinutes(times[times.length - 1], diff));
    } while (times[times.length - 1] <= end);
    return times;
  }

  private createUsedCell(time: Date, used: IRecord[], cross?: boolean): ICellTime {
    const cell: ICellTime = {time, patient: {name: used[0].message, recordId: used[0].id, id: used[0].patientId}};
    if (used[1]) {
      cell.patient2 = {name: used[1].message, recordId: used[1].id, id: used[1].patientId};
    }
    if (cross) {
      cell.cross = true;
    }
    return cell;
  }

  private createCells(user: ISpecialist, date: Date): Cell[] {
    const nextDate: Date = addDays(date, 1);
    const times: Date[] = this.getUserTimes(user, date);
    const cells: Cell[] = [];
    const addedAffairs: IRecord[] = [];
    const affairs: IRecord[] = this.scheduleService.getUserRecordsBetweenDates(user, date, nextDate).filter(({type}: IRecord) => type !== 'danger' && type !== 'primary');
    for (const time of times) {
      const used: IRecord[] = this.scheduleService.getUserRecordsIncludesDate(user, time).filter(({type}: IRecord) => type === 'primary');
      const affair = affairs.find(({start, end}: IRecord) => start <= time && time <= end);
      if (affair) {
        if (!addedAffairs.includes(affair)) {
          addedAffairs.push(affair);
          cells.push({reason: affair.message});
        }
        if (used.length) {
          cells.push(this.createUsedCell(time, used, true));
        }
      } else {
        if (cells.length && (cells[cells.length - 1] as ICellTime).cross) {
          let i: number = cells.length - 2;
          for (;!(cells[i] as ICellAffairs).reason && i > 0; i--);
          cells.push({reason: (cells[i] as ICellAffairs).reason});
        }
        cells.push(used.length ? this.createUsedCell(time, used) : {time});
      }
    }
    return cells;
  }

  private createColumns(users: ISpecialist[], date: Date): Column[] {
    return users.map((user: ISpecialist) => {
      const busy = this.scheduleService.getUserRecordsIncludesDate(user, date).find(({type}: IRecord) => type === 'danger');
      return {
        specialistId: user.id,
        date,
        doctor: user.name,
        specialty: user.specialty,
        address: user.hospital,
        ...(busy ? {busy: busy.message} : {
          interval: user.schedule.title,
          cells: this.createCells(user, date),
        }),
      };
    });
  }

  private updateColumns = (): void => {
    this.$scope.columns = this.generateDates(this.$scope.selectedDate).map((date) => this.createColumns(this.scheduleService.getSpecialistsByDate(date), date)).flat();
  }
}
