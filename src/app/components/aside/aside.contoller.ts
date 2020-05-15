import {ISpecialistService} from '@app/services/specialist.service';

export class AsideController {
  static $inject: readonly string[] = ['$templateCache', 'SpecialistService'];

  public name: string;
  public templateUrl = `aside.${this.name}.tpl`;

  constructor($templateCache: ng.ITemplateCacheService, private specialistService: ISpecialistService) {
    $templateCache.put(this.templateUrl, require(`./templates/${this.name}.html`));
  }

  public handleDateChange(value: Date | null): void {
    this.specialistService.filterDate = value;
  }
}
