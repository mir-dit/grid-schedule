import {IPopupPosition} from '../popup/popup.controller';
import {IScheduleService} from '../../pages/schedule/schedule.service';
import {IPatient} from '../../../mocks/user';

export interface ISheldureMenuSelectedTime {
  start: Date;
  end: Date;
}

export interface ISheldureMenuSelected {
  position: IPopupPosition;
  time: ISheldureMenuSelectedTime;
  specialistId: number;
}

export interface ISheldureMenuSelectedPatient extends ISheldureMenuSelected {
  patientId: number;
  recordId: number;
  patient: string;
  canAdd: boolean;
}

interface ISheldureMenuInfo {
  patient: string;
  date: Date;
  doctor: string;
  address: string;
  oms: string;
}

export interface IScheduleMenuScope extends ng.IScope {
  selectedPatient: IPatient;
  selected: ISheldureMenuSelected | ISheldureMenuSelectedPatient;
  onClose: () => void;
  created: boolean;
  cancel: boolean;
  info: ISheldureMenuInfo | null;
  handleCreate: () => void;
  handleCancel: () => void;
  handleReturn: () => void;
  handleCancelButton: () => void;
  handleInfo: () => void;
  handleInfoClose: () => void;
}

export class ScheduleMenuCtrl {
  static $inject = ['$scope', '$timeout', 'ScheduleService'];

  private createdTimeout: ng.IPromise<void> = null;

  constructor(private $scope: IScheduleMenuScope, private $timeout: ng.ITimeoutService, private scheduleService: IScheduleService) {
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
    this.scheduleService.addPrimaryRecord(this.$scope.selectedPatient, this.$scope.selected.specialistId, this.$scope.selected.time.start, this.$scope.selected.time.end);
  }

  private handleCancel = (): void => {
    this.$scope.cancel = true;
  }

  private handleReturn = (): void => {
    this.$scope.cancel = false;
    this.$scope.onClose();
  }

  private handleCancelButton = (): void => {
    this.scheduleService.removeRecord((this.$scope.selected as ISheldureMenuSelectedPatient).recordId);
    this.handleReturn();
  }

  private handleInfo = (): void => {
    const selected = this.$scope.selected as ISheldureMenuSelectedPatient;
    const specialist = this.scheduleService.getSpecialistById(selected.specialistId);
    const user = this.scheduleService.getPatientById(selected.patientId);
    this.$scope.info = {
      patient: selected.patient,
      date: selected.time.start,
      doctor: specialist.name,
      address: specialist.hospital,
      oms: user.oms,
    };
  }

  private handleInfoClose = (): void => {
    this.$scope.info = null;
    this.$scope.onClose();
  }
}
