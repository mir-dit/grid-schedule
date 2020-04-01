import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes, IRootScopeService} from "angular";
import PerfectScrollbar from 'perfect-scrollbar';
import {IEntry} from "../models/entry.model";

interface ICurrentScope extends IScope{
  params: IEntry|undefined;
}

export class initPluginDirective implements IDirective {
  restrict = 'A';
  scope = {
    'params': '='
  };

  constructor() {}

  link = (scope: ICurrentScope, element: IAugmentedJQuery, attrs: IAttributes) => {
    const pluginName: string = attrs.initPlugin;
    switch (pluginName) {
      case 'scrollbar':
        initPluginDirective.initScrollbar(element, scope.params);
        element.bind('ps-scroll-y', (event) => scope.$emit('ps-scroll-y', event.target));
        break;
      default:
        console.error(`Плагин с названием ${pluginName} не найден!`);
    }
  };

  static factory(): IDirectiveFactory {
    return () => new initPluginDirective();
  }

  static initScrollbar(elem: IAugmentedJQuery, params: IEntry): void {
    const defaultOptions = {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    };
    PerfectScrollbar.initialize(elem[0], {...defaultOptions, ...params});
  }
}

export default initPluginDirective;
