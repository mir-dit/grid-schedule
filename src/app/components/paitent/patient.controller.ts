import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {IPatient} from '@mocks/user';

export interface IPatientScope extends ng.IScope {
  selected: IPatient | null;
  noResults: boolean;
  value: IPatient | string;
  patients: IPatient[];
  handleBlur: () => void;
}

export class PatientController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService', '$templateCache'];

  constructor(private $scope: IPatientScope, scheduleService: IScheduleService, $templateCache: ng.ITemplateCacheService) {
    $templateCache.put('patientTypeahead', require('./typeahead.html'));
    $scope.value = '';
    $scope.selected = null;
    $scope.patients = scheduleService.getPatients();

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
