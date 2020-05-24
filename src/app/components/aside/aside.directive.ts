import {AsideController} from './aside.contoller';

export class AsideDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./aside.html');
  controller = AsideController;
  controllerAs = 'asCtrl'
  bindToController = true;
  scope = {
    name: '@',
  };


  static factory() {
    return (): ng.IDirective => new AsideDirective();
  }
}
