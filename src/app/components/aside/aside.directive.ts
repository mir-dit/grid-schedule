import {IAugmentedJQuery, IDirective, IDirectiveFactory, IScope, IAttributes} from "angular";
import {datepickerMeta} from "@app/dictionary/datepicker";
import {users} from "@mocks/user";
import AsideController from "@components/aside/aside.controller";

export class asideDirective implements IDirective {
  restrict = 'E';
  template = require('./aside.template.html');
  controller = AsideController

  constructor() {}

  link = (scope: IScope | any, element: IAugmentedJQuery, attrs: IAttributes) => {
    // Property
    scope.fields = [
      { label: 'Пациент', type: 'search', key: 'patient', placeholder: 'Введите текст для поиска', value: null, actions: [{ icon: 'glyphicon glyphicon-user', flag: true, handler: function (e, scope) { console.debug('event 1', e); console.debug(scope) } }] },
      { label: 'Дата записи', type: 'date', key: 'date', placeholder: 'ДД.ММ.ГГГГ', value: null },
      { label: 'Специалисты', type: 'search', key: 'specialist', placeholder: 'Введите текст для поиска', value: null, actions: [{ icon: 'glyphicon glyphicon-glass', flag: false, handler: function (e, scope) { console.debug('event 2', e) } }] },
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
    scope.toggleAction = this.toggleAction()
    this.init(scope);
  };

  static factory(): IDirectiveFactory {
    return () => new asideDirective();
  }

  init(scope) {
    scope.fields.forEach((el, index) => {
      scope.$watch(`fields[${index}].value`, (newVal, oldVal) => {
        console.debug(el.key, newVal);
      })
    })
  }
  toggleAction() {
    // this.$scope
  }

}

export default asideDirective;
