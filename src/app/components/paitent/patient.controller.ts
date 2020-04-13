import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {IPatient} from '@mocks/user';
import asideDictionary from '@src/dictionary/aside';
import {IDropdownItem} from '../dropdown/dropdown.directive';

export interface IPatientScope extends ng.IScope {
  selected: IPatient | null;
  noResults: boolean;
  value: IPatient | string;
  patients: IPatient[];
  handleBlur: () => void;
  dropdownItems: IDropdownItem[];
}

export class PatientController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService', '$templateCache'];

  constructor(private $scope: IPatientScope, scheduleService: IScheduleService, $templateCache: ng.ITemplateCacheService) {
    $templateCache.put('patientTypeahead', require('./typeahead.html'));
    $scope.value = '';
    $scope.selected = null;
    $scope.patients = scheduleService.getPatients();
    $scope.dropdownItems = [{
      label: asideDictionary.patient.exit,
      icon: 'glyphicon glyphicon-off',
      onClick(): void {
        $scope.value = '';
      },
    }];

    $scope.$watch('value', this.handleValueChange);
    $scope.handleBlur = this.handleBlur;
  }

  private handleBlur = (): void => {
    if (this.$scope.noResults) {
      this.$scope.noResults = false;
      this.$scope.value = '';
    }
  }

  private handleValueChange = (): void => {
    this.$scope.selected = typeof this.$scope.value === 'object' ? this.$scope.value : null;
  }
}
