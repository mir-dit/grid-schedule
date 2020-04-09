import * as angular from 'angular';
import * as router from 'angular-route';
import bootstrap from 'angular-ui-bootstrap';
import {routes} from './app.routes';
import {TableDirective} from '@components/table/table.directive';
import {ScheduleCtrl} from './pages/schedule/schedule.controller';
import {tableDateFilter} from './filters/tableDate.filter';
import {DefaultLayoutDirective} from './layouts/default/defaultLayout.directive';
import {AsideDirective} from '@components/aside/aside.directive';
import {InitPluginDirective} from './directives/initPlugin.directive';
import {tableOrderColumnFilter} from './filters/tableOrderColumn.filter';
import {DatepickerDirective} from '@components/datepicker/datepicker.directive';
import {InputDirective} from '@components/input/input.directive';
import {DropdownDirective} from '@components/dropdown/dropdown.directive';
import {PopupDirective} from './components/popup/popup.direcive';
import {ScheduleService} from './pages/schedule/schedule.service';
import {ScheduleMenuDirective} from './components/scheduleMenu/scheduleMenu.directive';
import {dictionaryFilter} from './filters/dictionary.filter';

const Application = (): ng.IControllerProvider => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app-schedule',
  };
};

class AppCtrl {
  static $inject = ['$scope'];
}

const moduleName = 'appSchedule';

const app: ng.IModule = angular.module(moduleName, [
  router,
  bootstrap,
]);
app.directive(moduleName, Application);
app.controller('AppCtrl', AppCtrl);
app.controller('ScheduleCtrl', ScheduleCtrl);
app.directive('appTable', TableDirective.factory());
app.filter('tableDate', tableDateFilter);
app.filter('tableOrderColumn', tableOrderColumnFilter);
app.filter('dictionary', dictionaryFilter);
app.directive('appDefaultLayout', DefaultLayoutDirective.factory());
app.directive('appAside', AsideDirective.factory());
app.directive('appDatepicker', DatepickerDirective.factory());
app.directive('appInput', InputDirective.factory());
app.directive('appDropdown', DropdownDirective.factory());
app.directive('initPlugin', InitPluginDirective.factory());
app.directive('appPopup', PopupDirective.factory());
app.directive('appScheduleMenu', ScheduleMenuDirective.factory());
app.service('ScheduleService', ScheduleService);
app.config(['$routeProvider', routes]);
