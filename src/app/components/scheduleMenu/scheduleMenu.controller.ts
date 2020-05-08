import {IRecordService} from '@app/services/record.service';
import {ISpecialistService} from '@app/services/specialist.service';
import {IPatientService} from '@app/services/patient.service';
import {IScheduleMenuScope, ISheldureMenuSelectedPatient} from '@components/scheduleMenu/scheduleMenu.model';
import {IPatient} from '@mocks/user';
import {addMinutes, setTime} from '@app/helpers/date';

export class ScheduleMenuCtrl {
  static $inject = ['$scope', '$timeout', 'RecordService', 'SpecialistService', 'PatientService'];

  private createdTimeout: ng.IPromise<void> = null;

  constructor(private $scope: IScheduleMenuScope, private $timeout: ng.ITimeoutService, private recordService: IRecordService,
              private specialistService: ISpecialistService, private patientService: IPatientService) {
    $scope.created = false;
    $scope.cancel = false;
    $scope.info = null;
    $scope.$watch('selected', this.handleSelectedChange);


    $scope.handleCreate = this.handleCreate;
    $scope.handleCancel = this.handleCancel;
    $scope.handleReturn = this.handleReturn;
    $scope.handleCancelButton = this.handleCancelButton;
    $scope.handleInfo = this.handleInfo;
    $scope.handleInfoClose = this.handleInfoClose;
  }

  private checkPaitentRules(patient: IPatient, selected: ISheldureMenuSelectedPatient): boolean {
    if (!patient || !selected || (selected.patient && !selected.canAdd)) return false;
    const specialist = this.specialistService.getSpecialistById(selected.specialistId);
    const alreadyUsed = this.recordService.records
        .filter(({type, patientId}) => type === 'primary' && patientId === patient.id)
        .find((record) => record.start.getTime() === selected.time.start.getTime());
    if (alreadyUsed) return false;
    if (selected.time.end <= addMinutes(new Date(), 60 / specialist.step)) return false;
    return true;
  }

  private checkCancelRules(selected: ISheldureMenuSelectedPatient): boolean {
    if (!selected || !selected.patient) return false;
    const specialist = this.specialistService.getSpecialistById(selected.specialistId);
    if (selected.time.end <= addMinutes(new Date(), 60 / specialist.step)) return false;
    return true;
  }

  private handleSelectedChange = (): void => {
    if (this.$scope.cancel || this.$scope.info) {
      return;
    }
    if (this.createdTimeout) {
      this.$timeout.cancel(this.createdTimeout);
      this.createdTimeout = null;
    }
    this.$scope.created = false;
    this.$scope.info = null;
    this.$scope.paitentRulesPassed = this.checkPaitentRules(this.$scope.selectedPatient, this.$scope.selected as ISheldureMenuSelectedPatient);
    this.$scope.cancelRulesPassed = this.checkCancelRules(this.$scope.selected as ISheldureMenuSelectedPatient);
  }

  private handleCreate = (): void => {
    this.$timeout(() => {
      this.$scope.created = true;
    });
    this.createdTimeout = this.$timeout(() => {
      this.$scope.created = false;
      this.createdTimeout = null;
      this.$scope.onClose();
    }, 3000);
    this.recordService.addPrimaryRecord(this.$scope.selectedPatient, this.$scope.selected.specialistId, this.$scope.selected.time.start, this.$scope.selected.time.end);
  }

  private handleCancel = (): void => {
    this.$scope.cancel = true;
  }

  private handleReturn = (): void => {
    this.$scope.cancel = false;
    this.$scope.onClose();
  }

  private handleCancelButton = (): void => {
    this.recordService.removeRecord((this.$scope.selected as ISheldureMenuSelectedPatient).recordId);
    this.handleReturn();
  }

  private handleInfo = (): void => {
    const selected = this.$scope.selected as ISheldureMenuSelectedPatient;
    const specialist = this.specialistService.getSpecialistById(selected.specialistId);
    const user = this.patientService.getPatientById(selected.patientId);
    this.$scope.info = {
      patient: selected.patient,
      date: selected.time.start,
      doctor: specialist.name,
      address: specialist.cabinet,
      oms: user.oms,
    };
  }

  private handleInfoClose = (): void => {
    this.$scope.info = null;
    this.$scope.onClose();
  }
}
