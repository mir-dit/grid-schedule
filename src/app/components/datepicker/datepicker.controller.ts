import {setTime} from '@app/helpers/date';
import {IRootScope} from '@app/rootScope';

interface IDatepicker {
  format: string;
  minDate: Date;
  maxDate: Date;
  options: {
    formatYear: string;
    startingDay: number;
  };
}

const config: IDatepicker = {
  format: 'dd.MM.yyyy',
  minDate: new Date(),
  maxDate: new Date(2025, 1, 1),
  options: {
    formatYear: 'yy',
    startingDay: 1,
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
    return 'datepicker__date' + (mode === 'day' ? ' ' + this.getDateState(date) : '');
  }

  private getDateState(date: Date): string {
    if (this.val instanceof Date && +date === +setTime(this.val, date)) return 'datepicker__selected datepicker__active';
    if (date < config.minDate) return 'datepicker__previous';
    return 'datepicker__active';
  }

  public generateTooltip(): string {
    return this.active ? '' : 'Выберите доступный ресурс';
  }
}
