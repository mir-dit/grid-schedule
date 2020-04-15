import {IScheduleService} from '@app/pages/schedule/schedule.service';
import {IPatient} from '@mocks/user';
import asideDictionary from '@src/dictionary/aside';
import {IDropdownItem} from '../dropdown/dropdown.directive';
import {IInputService, IInputState} from '@app/services/input.service';

export interface IPatientScope extends ng.IScope {
  inputState: IInputState;
  noResults: boolean;
  value: IPatient | string;
  patients: IPatient[];
  handleBlur: () => void;
  dropdownItems: IDropdownItem[];
}

export class PatientController {
  static $inject: readonly string[] = ['$scope', 'ScheduleService', '$templateCache', 'InputService'];

  constructor(private $scope: IPatientScope, scheduleService: IScheduleService, $templateCache: ng.ITemplateCacheService, private inputService: IInputService) {
    $templateCache.put('patientTypeahead', require('./typeahead.html'));
    $scope.value = '';
    $scope.inputState = inputService.state;
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
    this.inputService.state.patient = typeof this.$scope.value === 'object' ? this.$scope.value : null;
  }
}
