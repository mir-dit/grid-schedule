import * as angular from 'angular';
import * as router from 'angular-route';
import bootstrap from 'angular-ui-bootstrap';
import {routes} from './app.routes';
import {tableDirective} from "./components/table/table.directive";
import {ScheduleCtrl} from "./pages/schedule/schedule.controller";
import {tableDateFilter} from './filters/tableDate.filter';
import {defaultLayoutDirective} from "./layouts/default/defaultLayout.directive";
import initPluginDirective from "./directives/initPlugin.directive";
import {tableOrderColumnFilter} from './filters/tableOrderColumn.filter';
import {ScheduleService} from './pages/schedule/schedule.service';

const Application = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app-schedule'
  }
};

class AppCtrl {
  static $inject = ['$scope'];
  constructor($scope: ng.IScope) {}

  $onInit(): void {
    console.log('test');
  }
}

const moduleName = 'appSchedule';

const app: ng.IModule = angular.module(moduleName, [
  router,
  bootstrap,
]);
app.directive(moduleName, Application);
app.controller('AppCtrl', AppCtrl);
app.controller('ScheduleCtrl', ScheduleCtrl);
app.directive('appTable', tableDirective.factory());
app.filter('tableDate', tableDateFilter);
app.filter('tableOrderColumn', tableOrderColumnFilter);
app.directive('appDefaultLayout', defaultLayoutDirective.factory());
app.directive('initPlugin', initPluginDirective.factory());
app.service('ScheduleService', ScheduleService);
app.config(['$routeProvider', routes]);

export default app;
