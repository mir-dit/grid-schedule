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

interface IDatepickerScope extends ng.IScope {
  show: boolean;
  config: IDatepicker;
  val: Date | string;
  value: Date | null;
  handleValueChange: () => void;
  onChange: (value: Date | null) => void;
  getClass: (date: Date) => string;
}

export class DatepickerController {
  public show = false;
  public config: IDatepicker = config;
  public value: Date | null;
  public val: Date | string;
  public onChange: (params: {value: Date | null}) => void;

  constructor(private $scope: IDatepickerScope, $templateCache: ng.ITemplateCacheService) {
    $templateCache.put('datepickerPopup', require('./popup.html'));
    $scope.show = false;
    $scope.config = config;

    $scope.$watch('dateCtrl.value', () => {
      if (this.val !== this.value) {
        this.val = this.value;
      }
    });
  }

  public handleValueChange(): void {
    this.onChange({value: this.val instanceof Date ? this.val : null});
  }

  public toggleDatePicker(): void {
    this.show = !this.show;
  }

  private getClass(date: Date): string {
    if (date < config.minDate) {
      return 'date disabled';
    }
    return 'date active';
  }
}
