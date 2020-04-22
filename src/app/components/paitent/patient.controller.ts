import {IPatient} from '@mocks/user';
import asideDictionary from '@src/dictionary/aside';
import {IDropdownItem} from '../dropdown/dropdown.directive';
import {PatientService} from '@app/services/patient.service';

export class PatientController {
  static $inject: readonly string[] = ['$templateCache', 'PatientService'];

  public value: IPatient | string = '';
  public noResults: boolean;
  public patients: IPatient[] = this.patientService.getAll();

  constructor($templateCache: ng.ITemplateCacheService, private patientService: PatientService) {
    $templateCache.put('patientTypeahead.html', require('./typeahead.html'));
  }

  public dropdownItems: IDropdownItem[] = [{
    label: asideDictionary.patient.exit,
    icon: 'glyphicon glyphicon-off',
    onClick: (): void => {
      this.value = '';
      this.patientService.setCurrent(null);
    },
  }];

  public handleBlur(): void {
    if (this.noResults) {
      this.noResults = false;
      this.value = '';
    }
  }

  public handleSelect($item: IPatient): void {
    this.patientService.setCurrent($item?.id || null);
  }
}
