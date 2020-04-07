import {IScope} from "angular";
import {Users} from "@mocks/user";

interface IAsideScope extends IScope {
    fields: Fields,
    datepicker: any,
    users: Users
}
interface IField {
    label: string,
    type: FieldType,
    key: string,
    placeholder: string,
    value: any,
    actions?: any
}

type Fields = Array<IField>
type FieldType = 'date' | 'search' | 'input' | 'textarea'


export default class AsideController {
    constructor($scope: IAsideScope) {
    }
}
