export interface IDropdownItem {
  label: string;
  icon?: string;
  onClick?: () => void;
}

export class DropdownDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./dropdown.html');
  transclude = true;
  scope = {
    icon: '=',
    disabled: '=',
    items: '=',
  };

  static factory() {
    return (): ng.IDirective => new DropdownDirective();
  }
}
