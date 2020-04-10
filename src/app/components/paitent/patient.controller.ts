import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {IPatient} from '@mocks/user';

interface IPatientTypeahead {
  name: string;
  oms: string;
}

export interface IPatientScope extends ng.IScope {
  id: number;
  selected: IPatient | null;
  noResults: boolean;
  value: IPatientTypeahead | '';
  typeahead: IPatientTypeahead[];
  handleBlur: () => void;
}

export class PatientController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService', '$templateCache'];
  private patients: IPatient[];

  constructor(private $scope: IPatientScope, scheduleService: IScheduleService, $templateCache: ng.ITemplateCacheService) {
    $templateCache.put('patientTypeahead', require('./typeahead.html'));
    $scope.value = '';
    $scope.selected = null;
    this.patients = scheduleService.getPatients();
    $scope.typeahead = this.patients.map(({name, oms}) => ({name, oms}));

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
    if (typeof this.$scope.value === 'object') {
      this.$scope.selected = this.patients.find(({oms}) => oms === (this.$scope.value as IPatientTypeahead).oms);
    } else if (this.$scope.selected !== null) {
      this.$scope.selected = null;
    }
  }
}
