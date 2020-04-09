import {IController} from 'angular';
import {defaultConfig, IDatepickerScope} from '@components/datepicker/datepicker.model';

export class DatepickerController implements IController {
  constructor(private $scope: IDatepickerScope) {
    $scope.show = false;
    $scope.config = {...defaultConfig};
    $scope.toggleShow = this.toggleShow;
    // Initialization
    this.init();
  }

    private toggleShow = (): void => this.$scope.show = !this.$scope.show;

    private init = (): void => {
      this.$scope.$watch('show', (newVal) => {
        if (!newVal) {
          this.$scope.callback(this.$scope);
        }
      });
    }
}
