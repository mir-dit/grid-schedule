import {setTime, addDays} from '@app/helpers/date';
import {IRootScope} from '@app/rootScope';

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

  constructor($scope: ng.IScope, $templateCache: ng.ITemplateCacheService, $rootScope: IRootScope) {
    $templateCache.put('datepickerPopup', require('./popup.html'));

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
    return 'datepicker__date ' + (mode === 'day' ? this.getDayClass(date) : '');
  }

  private getDayClass(date: Date): string {
    if (date < config.minDate || date > config.maxDate) return 'datepicker__day datepicker__disabled';
    return 'datepicker__day datepicker__active';
  }

  public generateTooltip(): string {
    return this.active ? '' : 'Выберите доступный ресурс';
  }
}
