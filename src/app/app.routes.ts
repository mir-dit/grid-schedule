import {ScheduleCtrl} from "@app/pages/schedule/schedule.controller";

export const routes = ($routeProvider: ng.route.IRouteProvider): void => {
  $routeProvider.
      when('/', {
        template: require('./pages/schedule/schedule.html'),
        controller: ScheduleCtrl,
        controllerAs: 'schedCtrl',
      }).
      otherwise({
        redirectTo: '/',
      });
};
