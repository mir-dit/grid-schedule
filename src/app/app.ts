import * as angular from 'angular';
import * as router from 'angular-route';
import bootstrap from 'angular-ui-bootstrap';
import {routes} from './app.routes';
import {IController, IScope} from "angular";
import {tableDirective} from "@components/table/table.directive";
import {ScheduleCtrl} from "./pages/schedule/schedule.controller";
import {tableDateFilter} from './filters/tableDate.filter';
import {defaultLayoutDirective} from "./layouts/default/defaultLayout.directive";
import asideDirective from "@components/aside/aside.directive";
import initPluginDirective from "./directives/initPlugin.directive";
import {tableOrderColumnFilter} from './filters/tableOrderColumn.filter';
import datepickerDirective from "@components/datepicker/datepicker.directive";
import inputDirective from "@components/input/input.directive";
import dropdownDirective from "@components/dropdown/dropdown.directive";

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
app.filter('tableDate', tableDateFilter);
app.filter('tableOrderColumn', tableOrderColumnFilter);
app.directive('appDefaultLayout', defaultLayoutDirective.factory());
app.directive('appAside', asideDirective.factory());
app.directive('appDatepicker', datepickerDirective.factory());
app.directive('appInput', inputDirective.factory());
app.directive('appDropdown', dropdownDirective.factory());
app.directive('initPlugin', initPluginDirective.factory());
app.config(['$routeProvider', routes]);

export default app;
