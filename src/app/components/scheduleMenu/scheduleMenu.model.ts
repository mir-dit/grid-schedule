import {IPopupPosition} from "@components/popup/popup.controller";
import {IPatient} from "@mocks/user";

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
