export interface IPopopPosition {
  x: number;
  y: number;
}

export interface IPopupScope extends ng.IScope {
  element: ng.IAugmentedJQuery;
  onClose: () => void;
  position?: IPopopPosition;
}

export class PopupCtrl {
    
  constructor(private $scope: IPopupScope, private $window: ng.IWindowService) {
    $window.addEventListener('click', this.handleClick);
    $window.addEventListener('resize', $scope.onClose);
    $window.addEventListener('scroll', $scope.onClose);
    $scope.$on('$destroy', () => {
      $window.removeEventListener('click', this.handleClick);
      $window.removeEventListener('resize', $scope.onClose);
      $window.removeEventListener('scroll', $scope.onClose);
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
