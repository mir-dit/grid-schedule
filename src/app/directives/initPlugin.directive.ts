import PerfectScrollbar from 'perfect-scrollbar';
import {IEntry} from "../models/entry.model";

interface ICurrentScope extends ng.IScope {
  params: IEntry|undefined;
}

export class initPluginDirective implements ng.IDirective {
  restrict = 'A';
  scope = {
    'params': '='
  };

  constructor() {}

  link = (scope: ICurrentScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {
    const pluginName: string = attrs.initPlugin;
    switch (pluginName) {
      case 'scrollbar':
        initPluginDirective.initScrollbar(element, scope);
        break;
      default:
        console.error(`Плагин с названием ${pluginName} не найден!`);
    }
  };

  static factory() {
    return () => new initPluginDirective();
  }

  static initScrollbar(elem: ng.IAugmentedJQuery, scope: ICurrentScope): void {
    const defaultOptions = {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    };
    PerfectScrollbar.initialize(elem[0], {...defaultOptions, ...scope.params});
    elem.bind('ps-scroll-y', (event) => scope.$emit('ps-scroll-y', event.target));
  }
}

export default initPluginDirective;
