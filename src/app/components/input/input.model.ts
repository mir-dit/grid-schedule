import {IScope} from "angular";

export interface IInputScope extends IScope {
    id: string,
    value: any,
    defaultValue: any,
    type: InputType,
    placeholder: string,
    before: IBeforeInput,
    after: IAfterInput
    scope: IInputScope,
    changeValue: (event, ngModel) => void,
    ngModel: any
}

export type InputType = 'text' | 'textarea' | 'number'

export interface IBeforeInput {
    icon?: string,
    text?: string,
    button: boolean,
    callback?: (scope: IInputScope) => void
}

export interface IAfterInput extends IBeforeInput {}
