import {PatientController} from './patient.controller';

export class PatientDirective implements ng.IDirective {
  restrict = 'E';
  controller = PatientController;
  controllerAs = 'patCtrl';
  template = require('./patient.html');

  static factory() {
    return (): ng.IDirective => new PatientDirective();
  }
}
