import {setTime} from '@app/helpers/date';
import {ISpecialistService} from "@app/services/specialist.service";

export class AsideController {
  static $inject: readonly string[] = ['$scope', 'SpecialistService'];

  constructor(private $scope: ng.IScope, private specialistService: ISpecialistService) {
    $scope.$watchCollection('asCtrl.specialistService.selected', () => this.handleSpecialistsChange());
  }

  public handleDateChange(value: Date | null): void {
    this.specialistService.filterDate = value;
  }

  public handleSpecialistsChange(): void {
    if (!this.specialistService.filterDate && this.specialistService.specialists?.length) {
      this.specialistService.filterDate = setTime(new Date(), new Date(2020, 1, 1, 0, 0, 0));
    }
  }
}
