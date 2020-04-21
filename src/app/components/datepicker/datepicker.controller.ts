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
  constructor(private $scope: IDatepickerScope, $templateCache: ng.ITemplateCacheService) {
    $templateCache.put('datepickerPopup', require('./popup.html'));
    $scope.show = false;
    $scope.config = config;

    $scope.$watch('value', () => {
      if ($scope.val !== $scope.value) {
        $scope.val = $scope.value;
      }
    });
    $scope.handleValueChange = this.handleValueChange;
    $scope.getClass = this.getClass;
  }

  private handleValueChange = (): void => {
    this.$scope.onChange(this.$scope.val instanceof Date ? this.$scope.val : null);
  }

  private getClass(date: Date): string {
    if (date < config.minDate) {
      return 'date disabled';
    }
    return 'date active';
  }
}
