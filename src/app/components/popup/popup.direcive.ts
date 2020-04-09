import {PopupCtrl, IPopupScope} from './popup.controller';

export class PopupDirective implements ng.IDirective {
  public restrict = 'E';
  public template = require('./popup.html');
  public transclude = true;
  public controller = PopupCtrl;
  public scope = {
    onClose: '=',
    position: '=',
  };

  link = ($scope: IPopupScope, element: ng.IAugmentedJQuery): void => {
    $scope.element = element;
  }

  static factory() {
    return (): ng.IDirective => new PopupDirective();
  }
}
