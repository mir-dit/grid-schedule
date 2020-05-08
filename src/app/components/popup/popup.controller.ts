export interface IPopupPosition {
  x: number;
  y: number;
}

export interface IPopupScope extends ng.IScope {
  element: ng.IAugmentedJQuery;
  onClose?: () => void;
  position?: IPopupPosition;
  correction: IPopupPosition;
}

export class PopupCtrl {
  constructor(private $scope: IPopupScope, $window: ng.IWindowService) {
    this.resetCorrection();
    $window.addEventListener('click', this.handleClick);
    $window.addEventListener('resize', this.handlePageChange);
    $window.addEventListener('scroll', this.handlePageChange);
    $scope.$watch('position', this.handlePositionChange);
    $scope.$on('$destroy', () => {
      $window.removeEventListener('click', this.handleClick);
      $window.removeEventListener('resize', this.handlePageChange);
      $window.removeEventListener('scroll', this.handlePageChange);
    });
  }

  private resetCorrection(): void {
    this.$scope.correction = {x: 0, y: 0};
  }

  private handlePositionChange = (): void => {
    if (!this.$scope.position) return this.resetCorrection();
    const {clientWidth, clientHeight} = document.documentElement;
    const {offsetWidth, offsetHeight} = this.$scope.element[0].getElementsByClassName('popup')[0] as HTMLElement;
    this.$scope.correction = {
      x: (clientWidth - offsetWidth < this.$scope.position.x) ? -offsetWidth : 0,
      y: (clientHeight - offsetHeight < this.$scope.position.y) ? -offsetHeight : 0,
    };
  }

  private handlePageChange = (): void => {
    if (this.$scope.position && this.$scope.onClose) {
      this.$scope.onClose();
      this.$scope.$root.$apply();
    }
  }

  private handleClick = (): void => {
    if (this.$scope.onClose && !this.isInsidePopup(event.target as HTMLElement)) {
      this.$scope.onClose();
      this.$scope.$root.$apply();
    }
  }

  private isInsidePopup(target: HTMLElement): boolean {
    let parent = target;
    while (parent) {
      if (parent == this.$scope.element[0]) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }
}
