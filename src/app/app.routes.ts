export const routes = ($routeProvider: ng.route.IRouteProvider): void => {
  $routeProvider.
      when('/', {
        template: require('./pages/schedule/schedule.html'),
        controller: 'ScheduleCtrl',
        controllerAs: 'schedule',
      }).
      otherwise({
        redirectTo: '/',
      });
};
