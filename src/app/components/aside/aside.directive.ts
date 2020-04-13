
export class AsideDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./aside.html');
  scope = {};

  static factory() {
    return (): ng.IDirective => new AsideDirective();
  }
}
