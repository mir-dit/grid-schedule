import * as angular from 'angular';
import * as router from 'angular-route';
import bootstrap from 'angular-ui-bootstrap';
import {routes} from './app.routes';
import {IController, IScope} from "angular";
import {tableDirective} from "./components/table/tabe.directive";
import {ScheduleCtrl} from "./pages/schedule/schedule.controller";
import {defaultLayoutDirective} from "./layouts/default/defaultLayout.directive";
import asideDirective from "./components/aside/aside.directive";
import initPluginDirective from "./directives/initPlugin.directive";
import {filterListDirective} from "./components/filter-list/filterList.directive";

const Application = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app-schedule'
  }
};

class AppCtrl implements IController {
  static $inject = ['$scope'];
  constructor($scope: IScope) {}

  $onInit(): void {
    console.log('test');
  }
}

const moduleName = 'appSchedule';

const app = angular.module(moduleName, [
  router,
  bootstrap,
]);
app.directive(moduleName, Application);
app.controller('AppCtrl', AppCtrl);
app.controller('ScheduleCtrl', ScheduleCtrl);
app.directive('appTable', tableDirective.factory());
app.directive('appDefaultLayout', defaultLayoutDirective.factory());
app.directive('appAside', asideDirective.factory());
app.directive('appFilterList', filterListDirective.factory());
app.directive('initPlugin', initPluginDirective.factory());
app.config(['$routeProvider', routes]);

export default app;
