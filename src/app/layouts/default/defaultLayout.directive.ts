export class DefaultLayoutDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./defaultLayout.html');

  static factory() {
    return (): ng.IDirective => new DefaultLayoutDirective();
  }
}
