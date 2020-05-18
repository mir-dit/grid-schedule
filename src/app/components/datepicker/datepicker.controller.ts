import {setTime, addDays} from '@app/helpers/date';
import {IRootScope} from '@app/models/rootScope.model';
import {ISpecialistService} from '@app/services/specialist.service';
import {IRecordService} from '@app/services/record.service';

interface IDatepicker {
  format: string;
  minDate: Date;
  maxDate?: Date;
  options: {
    startingDay: number;
    maxMode: string;
  };
}

const config: IDatepicker = {
  format: 'dd.MM.yyyy',
  minDate: setTime(new Date(), new Date(2020, 10, 20, 0, 0, 0)),
  maxDate: setTime(addDays(new Date(), 14), new Date(2020, 10, 20, 0, 0, 0)),
  options: {
    startingDay: 1,
    maxMode: 'month',
  },
};

export class DatepickerController {
  public show = false;
  public config: IDatepicker = config;
  public value: Date | null;
  public val: Date | string;
  public onChange: (params: {value: Date | null}) => void;
  public active: boolean;
  static $inject: readonly string[] = ['$scope', '$templateCache', '$rootScope', 'SpecialistService', 'RecordService'];

  constructor(
      $scope: ng.IScope,
      $templateCache: ng.ITemplateCacheService,
      $rootScope: IRootScope,
    private specialistService: ISpecialistService,
    private recordService: IRecordService,
  ) {
    $templateCache.put('datepickerPopup', require('./popup.html'));
    $templateCache.put('datepickerTemplate', require('./template.html'));

    $scope.$watch('dateCtrl.value', this.resetVal);
    $scope.$watch('dateCtrl.show', this.resetVal);

    $rootScope.handleCancel = this.handleCancel;
    $rootScope.handleOk = this.handleOk;
  }

  private resetVal = (): void => {
    if (this.val !== this.value) {
      this.val = this.value;
    }
  }

  public handleAccept(): void {
    this.onChange({value: this.val instanceof Date ? this.val : null});
  }

  public toggleDatePicker(): void {
    this.show = !this.show;
  }

  public handleCancel = (): void => {
    this.resetVal();
    this.handleAccept();
  }

  public handleOk = (): void => {
    this.handleAccept();
  }

  public getClass(date: Date, mode: string): string {
    return 'datepicker__date ' + (mode === 'day' ? 'datepicker__day ' + this.getDayClass(date) : '');
  }

  private checkIfDateHasFreeTime(date: Date): boolean {
    return this.specialistService.getSpecialists()
        .filter((specialist) => {
          if (!specialist.schedule.days.includes(date.getDay())) return false;
          if (this.recordService.getUserRecordsIncludesDate(specialist, date).find(({type}) => type === 'danger')) return false;
          const worktime = specialist.schedule.end.getTime() - specialist.schedule.start.getTime();
          const usedtime = this.recordService.getUserRecordsBetweenDates(specialist, date, addDays(date, 1))
              .filter(({type}) => type !== 'danger')
              .map(({end, start, type}) => (end.getTime() - start.getTime()) / (type === 'primary' ? 2 : 1))
              .reduce((acc, time) => acc + time, 0);
          return worktime > usedtime;
        }).length > 0;
  }

  private getDayClass(date: Date): string {
    if (date < config.minDate || date > config.maxDate) return 'datepicker__disabled';
    return this.checkIfDateHasFreeTime(date) ? 'datepicker__active' : '';
  }

  public generateTooltip(): string {
    return this.active ? '' : 'Выберите доступный ресурс';
  }
}
