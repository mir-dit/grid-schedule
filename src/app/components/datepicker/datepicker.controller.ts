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
}

export class DatepickerController {
  constructor(private $scope: IDatepickerScope) {
    $scope.show = false;
    $scope.config = config;

    $scope.$watch('value', () => {
      if ($scope.val !== $scope.value) {
        $scope.val = $scope.value;
      }
    });
    $scope.handleValueChange = this.handleValueChange;
  }

  private handleValueChange = (): void => {
    this.$scope.onChange(this.$scope.val instanceof Date ? this.$scope.val : null);
  }
}
