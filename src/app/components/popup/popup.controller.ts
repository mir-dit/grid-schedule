export interface IPopupPosition {
  x: number;
  y: number;
}

export interface IPopupScope extends ng.IScope {
  element: ng.IAugmentedJQuery;
  onClose: () => void;
  position?: IPopupPosition;
}

export class PopupCtrl {
    
  constructor(private $scope: IPopupScope, private $window: ng.IWindowService) {
    $window.addEventListener('click', this.handleClick);
    $window.addEventListener('resize', this.handlePageChange);
    $window.addEventListener('scroll', this.handlePageChange);
    $scope.$on('$destroy', () => {
      $window.removeEventListener('click', this.handleClick);
      $window.removeEventListener('resize', this.handlePageChange);
      $window.removeEventListener('scroll', this.handlePageChange);
    });
  }

  private handlePageChange = (event: MouseEvent) => {
    if (this.$scope.position) {
      this.$scope.onClose();
      this.$scope.$root.$apply();
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (!this.isInsidePopup(event.target as HTMLElement)) {
      this.$scope.onClose();
      this.$scope.$root.$apply();
    }
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
