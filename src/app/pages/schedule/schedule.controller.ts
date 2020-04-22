import {Column, Cell, ICellTime, ICellAffairs, ICellPatient} from '@components/table/table.model';
import {ISpecialist} from '@mocks/user';
import {IRecord} from '@mocks/record';
import {addDays, setTime, addMinutes} from '@app/helpers/date';
import {ISheldureMenuSelected, ISheldureMenuSelectedPatient} from '@components/scheduleMenu/scheduleMenu.model';
import {IPatientService} from '@app/services/patient.service';
import {IRecordService} from '@app/services/record.service';
import {ISpecialistService} from '@app/services/specialist.service';

export class ScheduleCtrl {
  static $inject = ['$scope', 'SpecialistService', 'PatientService', 'RecordService'];

  public timeGap: number;
  public scheduleMenu: ISheldureMenuSelected | ISheldureMenuSelectedPatient | null = null;
  public columns: Column[];

  constructor(private $scope: ng.IScope, private specialistService: ISpecialistService, private patientService: IPatientService, private recordService: IRecordService) {
    $scope.$watch('schedCtrl.specialistService.filterDate', () => this.updateColumns());
    $scope.$watchCollection('schedCtrl.specialistService.specialists', () => this.updateColumns());
    $scope.$on('records:updated', () => this.updateColumns());

    this.timeGap = 1;
    this.updateColumns();
  }

  public handleTableSelect(event: MouseEvent, cell: ICellTime, column: Column, patient?: ICellPatient): void {
    if (!patient && cell.patient2) return;
    const end = addMinutes(cell.time, 60 / this.specialistService.getSpecialistById(column.specialistId).step);
    const scheduleMenu: ISheldureMenuSelected = {
      position: {x: event.clientX, y: event.clientY},
      specialistId: column.specialistId,
      time: {start: cell.time, end},
    };
    this.scheduleMenu = patient ? {
      ...scheduleMenu,
      canAdd: !cell.patient2,
      patient: patient.name,
      recordId: patient.recordId,
      patientId: patient.id,
    } : scheduleMenu;
  }

  public handlePopupClose = (): void => {
    this.scheduleMenu = null;
  }

  private generateDates(from: Date): Date[] {
    const dates: Date[] = [from];
    for (let i = 1; i < this.timeGap; i++) {
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
    } while (times[times.length - 1] < end);
    times.pop();
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
    const affairs: IRecord[] = this.recordService.getUserRecordsBetweenDates(user, date, nextDate).filter(({type}: IRecord) => type !== 'danger' && type !== 'primary');
    for (const time of times) {
      const used: IRecord[] = this.recordService.getUserRecordsIncludesDate(user, time).filter(({type}: IRecord) => type === 'primary');
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

  private createColumns(date: Date): Column[] {
    return this.getSpecialistsByDate(date).map((user: ISpecialist) => {
      const busy = this.recordService.getUserRecordsIncludesDate(user, date).find(({type}: IRecord) => type === 'danger');
      return {
        specialistId: user.id,
        date,
        doctor: user.name,
        specialty: user.specialty,
        address: `${user.hospital}, (к.${user.cabinet})`,
        ...(busy ? {busy: busy.message} : {
          interval: user.schedule.title,
          cells: this.createCells(user, date),
        }),
      };
    });
  }

  private getSpecialistsByDate(date: Date): ISpecialist[] {
    return this.specialistService.specialists.filter((user) => user.schedule.days.includes(date.getDay()));
  }

  public updateColumns(): void {
    const {filterDate, specialists} = this.specialistService;
    this.columns = (filterDate && specialists.length) ? this.generateDates(filterDate).map(d => this.createColumns(d)).flat() : [];
  }
}
