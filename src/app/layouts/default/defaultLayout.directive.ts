export class DefaultLayoutDirective implements ng.IDirective {
  restrict = 'E';
  scope = {};
  template = require('./defaultLayout.html');

  static factory() {
    return (): ng.IDirective => new DefaultLayoutDirective();
  }
}
