import PerfectScrollbar from 'perfect-scrollbar';
import {IEntry} from '../models/entry.model';

interface ICurrentScope extends ng.IScope {
  params: IEntry|undefined;
}

export class InitPluginDirective implements ng.IDirective {
  restrict = 'A';
  scope = {
    'params': '=',
  };

  link = (scope: ICurrentScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void => {
    const pluginName: string = attrs.initPlugin;
    switch (pluginName) {
      case 'scrollbar':
        InitPluginDirective.initScrollbar(element, scope);
        break;
      default:
        console.error(`Плагин с названием ${pluginName} не найден!`);
    }
  };

  static factory() {
    return (): ng.IDirective => new InitPluginDirective();
  }

  static initScrollbar(elem: ng.IAugmentedJQuery, scope: ICurrentScope): void {
    const defaultOptions = {
      theme: 'custom-scroll',
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20,
    };
    PerfectScrollbar.initialize(elem[0], {...defaultOptions, ...scope.params});
    elem.bind('ps-scroll-y', (event) => scope.$emit('ps-scroll-y', event.target));
    scope.$on('scroll:update', () => {
      setTimeout(() => PerfectScrollbar.update(elem[0]), 0);
    });
  }
}
