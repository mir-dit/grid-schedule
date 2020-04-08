export class defaultLayoutDirective implements ng.IDirective {
  restrict = 'E';
  scope = {};
  template = require('./defaultLayout.html');

  constructor() {}

  link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {};

  static factory() {
    return () => new defaultLayoutDirective();
  }
}

export default defaultLayoutDirective;
