import {IDirective} from 'angular';
import {AsideController} from '@components/aside/aside.controller';

export class AsideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.html');
  controller = AsideController;
  scope = {};

  static factory(): IDirective {
    return (): AsideDirective => new AsideDirective();
  }
}
