import {Column, Cell, ICellTime, ICellAffairs, ICellPatient} from '@components/table/table.model';
import {ISpecialist} from '@mocks/user';
import {IRecord} from '@mocks/record';
import {addDays, setTime, addMinutes, getDate} from '@app/helpers/date';
import {ISheldureMenuSelected, ISheldureMenuSelectedPatient} from '@components/scheduleMenu/scheduleMenu.model';
import {IRecordService} from '@app/services/record.service';
import {ISpecialistService} from '@app/services/specialist.service';
import {IAsideImpScope} from '@app/models/scopes.model';

export class ScheduleCtrl {
  static $inject = ['$scope', 'SpecialistService', 'RecordService', '$filter'];

  public timeGap: number;
  public scheduleMenu: ISheldureMenuSelected | ISheldureMenuSelectedPatient | null = null;
  public columns: Column[];

  constructor(private $scope: IAsideImpScope, private specialistService: ISpecialistService, private recordService: IRecordService, private $filter: ng.IFilterService) {
    $scope.$watch('schedCtrl.specialistService.filterDate', () => this.updateColumns());
    $scope.$watchCollection('schedCtrl.specialistService.selected', () => this.updateColumns());
    $scope.$on('records:updated', () => this.updateColumns());
    $scope.aside = 'schedule';

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
    const affairs: IRecord[] = this.recordService.records.filter(({type, userId}: IRecord) => userId === user.id && type === 'secondary');
    for (const time of times) {
      const used: IRecord[] = this.recordService.getUserRecordsIncludesDate(user, time).filter(({type}: IRecord) => type === 'primary');
      const affair = affairs.find(({timeStart, timeEnd, regularly}: IRecord) => {
        const day = time.getDay();
        if (!regularly?.includes(day)) {
          return false;
        }
        return getDate({date, hour: timeStart.hour, minute: timeStart.minute}) <= time &&
                time <= getDate({date, hour: timeEnd.hour, minute: timeEnd.minute});
      });
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
    // Добавление "Врач не принимает" для всех врачей работающие мнее чем до 20:00
    if (times[times.length - 1].getHours() < 19) {
      cells.push({reason: this.$filter('dictionary')('message.doctorDoesNotAccept')})
    }
    return cells;
  }

  private formatTime(from: Date, to: Date): string {
    return `${this.$filter('date')(from, 'HH:mm')} - ${this.$filter('date')(to, 'HH:mm')}`;
  }

  private getSpecialistInterval(user: ISpecialist, date: Date): string[] {
    const interval: string[] = this.recordService.records
        .filter(({type, userId, regularly}: IRecord) => {
          if (userId !== user.id || type !== 'secondary') return false;
          if (!regularly?.includes(date.getDay())) return false;
          return true;
        })
        .map(({message, timeStart, timeEnd}) => `${message} (${this.formatTime(getDate(timeStart), getDate(timeEnd))})`);
    return [this.formatTime(user.schedule.start, user.schedule.end), ...interval];
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
          interval: this.getSpecialistInterval(user, date),
          cells: this.createCells(user, date),
        }),
      };
    });
  }

  private getSpecialistsByDate(date: Date): ISpecialist[] {
    return this.specialistService.selected.filter((user) => user.schedule.days.includes(date.getDay()));
  }

  public updateColumns(): void {
    const {filterDate, selected} = this.specialistService;
    this.columns = (filterDate && selected.length) ? this.generateDates(filterDate).map((d) => this.createColumns(d)).flat() : [];
    this.$scope.$broadcast('scroll:update');
  }
}
