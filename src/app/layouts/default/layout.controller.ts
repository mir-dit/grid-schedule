export class LayoutController {
  static $inject = ['$route', '$timeout'];

  public asideName: string | undefined;

  constructor($route: ng.route.IRouteService, $timeout: ng.ITimeoutService) {
    $timeout(() => {
      this.asideName = ($route?.current as any)?.scope?.aside;
    });
  }
}
