export interface IPopupScope extends ng.IScope {
  element: ng.IAugmentedJQuery;
  onClose: () => void;
}

export class PopupCtrl {
    
  constructor(private $scope: IPopupScope, private $window: ng.IWindowService) {
    $window.addEventListener('click', this.handleClick);
    $scope.$on('$destroy', () => {
      $window.removeEventListener('click', this.handleClick);
    });
  }

  private handleClick = (event: MouseEvent) => {
    if (!this.isInsidePopup(event.target as HTMLElement))
      this.$scope.onClose();
  }

  private isInsidePopup(target: HTMLElement) {
    let parent = target;
    while (parent) {
      if (parent == this.$scope.element[0])
        return true;
      parent = parent.parentElement;
    }
    return false;
  }

}
