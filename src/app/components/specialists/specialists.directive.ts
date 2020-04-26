import {SpecialistsController} from './specialists.controller';

export class SpecialistsDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./specialists.html');
  controller = SpecialistsController;
  controllerAs = 'specCtrl';

  static factory() {
    return (): ng.IDirective => new SpecialistsDirective();
  }
}
