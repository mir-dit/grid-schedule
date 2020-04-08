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
import {popupDirective} from './components/popup/popup.direcive';
import {ScheduleService} from './pages/schedule/schedule.service';
import {scheduleMenuDirective} from './components/scheduleMenu/scheduleMenu.directive';
import {dictionaryFilter} from './filters/dictionary.filter';

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
app.filter('dictionary', dictionaryFilter);
app.directive('appDefaultLayout', defaultLayoutDirective.factory());
app.directive('appAside', asideDirective.factory());
app.directive('appDatepicker', datepickerDirective.factory());
app.directive('appInput', inputDirective.factory());
app.directive('appDropdown', dropdownDirective.factory());
app.directive('initPlugin', initPluginDirective.factory());
app.directive('appPopup', popupDirective.factory());
app.directive('appScheduleMenu', scheduleMenuDirective.factory());
app.service('ScheduleService', ScheduleService);
app.config(['$routeProvider', routes]);

export default app;
