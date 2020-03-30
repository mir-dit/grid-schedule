export const routes = ($routeProvider) => {
  $routeProvider.
    when('/', {
      template: require('./pages/schedule/schedule.html'),
      controller: 'ScheduleCtrl',
      controllerAs: 'schedule'
    }).
    otherwise({
      redirectTo: '/'
    });
};
