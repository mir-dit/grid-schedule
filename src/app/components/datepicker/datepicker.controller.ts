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
  value: Date | string;
}

export class DatepickerController {
  constructor($scope: IDatepickerScope) {
    $scope.show = false;
    $scope.config = config;
    $scope.value = '';
  }
}
