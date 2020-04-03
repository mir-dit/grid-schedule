import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes} from "angular";
import {datepickerMeta} from "App/dictionary/datepicker";
import {users} from "Mocks/user";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.template.html');

  constructor() {}

  link = (scope: IScope | any, element: IAugmentedJQuery, attrs: IAttributes) => {
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
      open: function($event) {
        scope.datepicker.status.opened = true;
      },
      ...datepickerMeta
    }
    scope.users = users
    // Methods
    this.init(scope);
  };

  static factory(): IDirectiveFactory {
    return () => new asideDirective();
  }

  init(scope) {
    console.debug('users', scope.users);
    scope.fields.forEach((el, index) => {
      scope.$watch(`fields[${index}].value`, (newVal, oldVal) => {
        console.debug(el.key, newVal);
      })
    })
  }

}

export default asideDirective;
