import {LayoutController} from '@app/layouts/default/layout.controller';

export class LayoutDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./layout.html');
  controller = LayoutController;
  controllerAs = 'layoutCtrl';

  static factory() {
    return (): ng.IDirective => new LayoutDirective();
  }
}
