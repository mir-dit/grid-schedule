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
    actions?: any
}

export type Fields = Array<IField>
export type FieldType = 'date' | 'search' | 'input' | 'textarea'

export const asideFields: Fields = [
    {
        label: 'Пациент',
        type: 'search',
        key: 'patient',
        placeholder: 'Введите текст для поиска',
        value: null,
        actions: [{ icon: 'glyphicon glyphicon-user', flag: true, handler: function (e, scope) { console.debug('event 1', e); console.debug(scope) } }]
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
        actions: [{ icon: 'glyphicon glyphicon-glass', flag: false, handler: function (e, scope) { console.debug('event 2', e) } }]
    }
]

