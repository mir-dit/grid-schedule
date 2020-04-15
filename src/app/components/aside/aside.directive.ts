import {AsideController} from './aside.contoller';

export class AsideDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./aside.html');
  controller = AsideController;
  scope = {};

  static factory() {
    return (): ng.IDirective => new AsideDirective();
  }
}
