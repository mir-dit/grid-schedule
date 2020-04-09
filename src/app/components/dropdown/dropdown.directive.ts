import {IDirective, IDirectiveFactory} from 'angular';
import {DropdownController} from '@components/dropdown/dropdown.controller';

export class DropdownDirective implements IDirective {
  restrict = 'E';
  template = require('./dropdown.html');
  controller = DropdownController;
  scope = {
    icon: '=',
    items: '=',
    type: '@',
    handler: '=',
  };

  static factory(): IDirectiveFactory {
    return (): IDirective => new DropdownDirective();
  }
}
