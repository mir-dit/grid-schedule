export class TreeDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./tree.html');
  scope = {
    items: '=',
    onCheckboxChange: '=',
  };

  static factory() {
    return (): ng.IDirective => new TreeDirective();
  }
}
