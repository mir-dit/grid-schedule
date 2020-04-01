import {
  IAugmentedJQuery,
  IDirective,
  IDirectiveFactory,
  ILocationService,
  IScope,
  IAttributes,
  IRootScopeService
} from "angular";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.template.html');

  constructor(private $location: ILocationService, private $rootScope: IRootScopeService) {}

  link = (scope: IScope | any, element: IAugmentedJQuery, attrs: IAttributes, ctrl: any) => {
    // Property
    scope.fields = [
      { label: 'Пациент', type: 'search', key: 'patient', placeholder: 'Введите текст для поиска', value: null },
      { label: 'Дата записи', type: 'date', key: 'date', placeholder: 'ДД.ММ.ГГГГ', value: null },
      { label: 'Специалисты', type: 'search', key: 'specialist', placeholder: 'Введите текст для поиска', value: null },
    ];
    scope.datepicker = {
      status: {
        opened: false
      },
      format: 'dd-MM-yyyy',
      minDate: new Date(),
      maxDate: new Date(2025, 1, 1),
      dateOptions: {
        formatYear: 'yy',
        startingDay: 1
      },
      open: function($event) {
        scope.datepicker.status.opened = true;
      }
    }
    // Methods
    this.init(scope);
  };

  static factory(): IDirectiveFactory {
    const directive = ($location: ILocationService, $rootScope: IRootScopeService) => new asideDirective($location, $rootScope);
    directive.$inject = ['$location', '$rootScope'];
    return directive;
  }

  init(scope) {
    scope.fields.forEach((el, index) => {
      scope.$watch(`fields[${index}].value`, (newVal, oldVal) => {
        console.debug(el.key, newVal);
      })
    })
  }

}

export default asideDirective;
