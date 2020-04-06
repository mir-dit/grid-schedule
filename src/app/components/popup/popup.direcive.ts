import {PopupCtrl, IPopupScope} from "./popup.controller";

export class popupDirective implements ng.IDirective {
  public restrict = 'E';
  public template = require('./popup.html');
  public transclude = true;
  public controller = PopupCtrl;
  public scope = {
    'onClose': '=',
  };

  link = ($scope: IPopupScope, element: ng.IAugmentedJQuery) => {
    $scope.element = element;
  }

  static factory() {
    return () => new popupDirective();
  }
}
