import {DropdownController} from '@components/dropdown/dropdown.controller';

export class DropdownDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./dropdown.html');
  controller = DropdownController;
  scope = {
    icon: '=',
    items: '=',
    type: '@',
    handler: '=',
  };

  static factory() {
    return (): ng.IDirective => new DropdownDirective();
  }
}
