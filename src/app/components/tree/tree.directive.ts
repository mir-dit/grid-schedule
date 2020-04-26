import {ITreeItem, ITreeScope} from '@components/tree/tree.model';

export class TreeDirective implements ng.IDirective {
  restrict = 'E';
  template = require('./tree.html');
  scope = {
    items: '=',
    onCheckboxChange: '&',
  };

  link = (scope: ITreeScope): void => {
    scope.handleCheckboxChange = (item: ITreeItem): void => {
      scope.onCheckboxChange({item});
    };
  }

  static factory() {
    return (): ng.IDirective => new TreeDirective();
  }
}
