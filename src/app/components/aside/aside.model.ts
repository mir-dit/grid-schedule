import {IScope} from "angular";
import {Users} from "@mocks/user";
import {IDatepicker} from "@app/models/datepicker";
import {IAfterInput, IBeforeInput} from "@components/input/input.model";

export interface IAsideScope extends IScope {
    fields: Fields,
    datepicker: IDatepicker,
    users: Users,
    scope: IAsideScope
}

export  interface IField {
    label: string,
    type: FieldType,
    key: string,
    placeholder: string,
    value: any,
    callback?: (scope: any, value) => void
    actions?: IActionItem[],
    after?: IAfterInput,
    before?: IBeforeInput
}

export type Fields = Array<IField>
export type FieldType = 'date' | 'search' | 'input' | 'textarea'

export interface IActionItemLink {
    text: string,
    href: string
}

export interface IActionItem {
    icon: string,
    handler: (scope: IAsideScope) => void,
    list: IActionItemLink[]
}

export const asideFields: Fields = [
    {
        label: 'Пациент',
        type: 'search',
        key: 'patient',
        placeholder: 'Введите текст для поиска',
        value: null,
        after: {
            icon: 'glyphicon glyphicon-zoom-in',
            button: true,
            callback: (scope) => {
                scope.$emit('patientSearch', scope.value);
            }
        },
        actions: [
            {
                icon: 'glyphicon glyphicon-user',
                handler: (scope) => console.debug('Action 1'),
                list: [
                    {text: 'Action 1', href: '#'},
                    {text: 'Action 2', href: '#'},
                    {text: 'Action 3', href: '#'},
                ]
            }
        ]
    },
    {
        label: 'Дата записи',
        type: 'date',
        key: 'date',
        placeholder: 'ДД.ММ.ГГГГ',
        value: null,
        callback: (scope) => {
            scope.$emit('datepickerSearch', scope);
        }
    },
    {
        label: 'Специалисты',
        type: 'search',
        key: 'specialist',
        placeholder: 'Введите текст для поиска',
        value: null,
        after: {
            icon: 'glyphicon glyphicon-zoom-in',
            button: true,
            callback: (scope) => {
                scope.$emit('searchSearch', scope.value);
            }
        },
        actions: [
            {
                icon: 'glyphicon glyphicon-glass',
                handler: (scope) => console.debug('Action 2'),
                list: [
                    {text: 'Action 1', href: '#'},
                    {text: 'Action 2', href: '#'},
                    {text: 'Action 3', href: '#'},
                ]
            }
        ]
    }
]

