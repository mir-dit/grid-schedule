import {setTime} from '@app/helpers/date';
import {ISpecialistService} from '@app/services/specialist.service';

export class AsideController {
  static $inject: readonly string[] = ['$scope', '$templateCache', 'SpecialistService'];

  public name: string;
  public templateUrl: string = `aside.${this.name}.tpl`;

  constructor(private $scope: ng.IScope, private $templateCache: ng.ITemplateCacheService, private specialistService: ISpecialistService) {
    $scope.$watchCollection('asCtrl.specialistService.selected', () => this.handleSpecialistsChange());
    $templateCache.put(this.templateUrl, require(`./templates/${this.name}.html`));
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
