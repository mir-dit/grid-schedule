import * as angular from 'angular';
import './locale.js';
import * as router from 'angular-route';
import bootstrap from 'angular-ui-bootstrap';
import {routes} from './app.routes';
import {TableDirective} from '@components/table/table.directive';
import {ScheduleCtrl} from './pages/schedule/schedule.controller';
import {tableDateFilter} from './filters/tableDate.filter';
import {LayoutDirective} from './layouts/default/layout.directive';
import {AsideDirective} from '@components/aside/aside.directive';
import {InitPluginDirective} from './directives/initPlugin.directive';
import {tableOrderColumnFilter} from './filters/tableOrderColumn.filter';
import {DatepickerDirective} from '@components/datepicker/datepicker.directive';
import {DropdownDirective} from '@components/dropdown/dropdown.directive';
import {PopupDirective} from '@components/popup/popup.directive';
import {ScheduleMenuDirective} from '@components/scheduleMenu/scheduleMenu.directive';
import {dictionaryFilter} from './filters/dictionary.filter';
import {PatientDirective} from '@components/paitent/patient.directive';
import {SpecialistsDirective} from '@components/specialists/specialists.directive';
import {TreeDirective} from '@components/tree/tree.directive';
import {PatientService} from './services/patient.service';
import {RecordService} from './services/record.service';
import {SpecialistService} from './services/specialist.service';

const Application = (): object => {
  return {
    template: require('./app.html'),
    controllerAs: 'app-schedule',
  };
};

const moduleName = 'appSchedule';

const app: ng.IModule = angular.module(moduleName, [
  router,
  bootstrap,
]);

app.directive(moduleName, Application);
app.controller('ScheduleCtrl', ScheduleCtrl);
app.directive('appTable', TableDirective.factory());
app.filter('tableDate', tableDateFilter);
app.filter('tableOrderColumn', tableOrderColumnFilter);
app.filter('dictionary', dictionaryFilter);
app.directive('appLayout', LayoutDirective.factory());
app.directive('appAside', AsideDirective.factory());
app.directive('appDatepicker', DatepickerDirective.factory());
app.directive('appDropdown', DropdownDirective.factory());
app.directive('initPlugin', InitPluginDirective.factory());
app.directive('appPopup', PopupDirective.factory());
app.directive('appScheduleMenu', ScheduleMenuDirective.factory());
app.directive('appPatient', PatientDirective.factory());
app.directive('appSpecialists', SpecialistsDirective.factory());
app.directive('appTree', TreeDirective.factory());
app.service('PatientService', PatientService);
app.service('RecordService', RecordService);
app.service('SpecialistService', SpecialistService);
app.config(['$routeProvider', routes]);
