import {Users} from '@mocks/user';
import {IDatepicker} from '@app/models/datepicker';
import {IAfterInput, IBeforeInput, IInputScope} from '@components/input/input.model';
import {IDropdownScope} from '@components/dropdown/dropdown.model';

export interface IAsideScope extends ng.IScope {
    fields: Fields;
    datepicker: IDatepicker;
    users: Users;
    scope: IAsideScope;
}

export interface IField {
    label: string;
    type: FieldType;
    key: string;
    placeholder: string;
    value: string;
    callback?: (scope: IInputScope, value: string) => void;
    actions?: IActionItem[];
    after?: IAfterInput;
    before?: IBeforeInput;
}

export type Fields = IField[]
export type FieldType = 'date' | 'search' | 'input' | 'textarea'

export interface IActionItemLink {
    text: string;
    href: string;
}

export interface IActionItem {
    icon: string;
    handler: (scope: IDropdownScope) => void;
    list: IActionItemLink[];
}

export const asideFields: Fields = [
  {
    label: 'Пациент',
    type: 'search',
    key: 'patient',
    placeholder: 'Введите текст для поиска',
    value: '',
    after: {
      icon: 'glyphicon glyphicon-zoom-in',
      button: true,
      callback: (scope): void => {
        scope.$emit('patientSearch', scope.value);
      },
    },
    actions: [
      {
        icon: 'glyphicon glyphicon-user',
        handler: (): void => console.debug('A1'),
        list: [
          {text: 'Action 1', href: '#'},
          {text: 'Action 2', href: '#'},
          {text: 'Action 3', href: '#'},
        ],
      },
    ],
  },
  {
    label: 'Дата записи',
    type: 'date',
    key: 'date',
    placeholder: 'ДД.ММ.ГГГГ',
    value: '',
    callback: (scope): void => {
      scope.$emit('datepickerSearch', scope);
    },
  },
  {
    label: 'Специалисты',
    type: 'search',
    key: 'specialist',
    placeholder: 'Введите текст для поиска',
    value: '',
    after: {
      icon: 'glyphicon glyphicon-zoom-in',
      button: true,
      callback: (scope): void => {
        scope.$emit('searchSearch', scope.value);
      },
    },
    actions: [
      {
        icon: 'glyphicon glyphicon-glass',
        handler: (): void => console.debug('A2'),
        list: [
          {text: 'Action 1', href: '#'},
          {text: 'Action 2', href: '#'},
          {text: 'Action 3', href: '#'},
        ],
      },
    ],
  },
];

