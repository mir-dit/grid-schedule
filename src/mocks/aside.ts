import {IScope} from "angular";
import {Users} from "@mocks/user";
import {IDatepicker} from "@app/models/datepicker";

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
    actions?: IActionItem[]
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
        value: null
    },
    {
        label: 'Специалисты',
        type: 'search',
        key: 'specialist',
        placeholder: 'Введите текст для поиска',
        value: null,
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

