import {IScope} from 'angular';

export interface IInputScope extends IScope {
    id: string;
    value: any;
    defaultValue: any;
    type: InputType;
    placeholder: string;
    before: IBeforeInput;
    after: IAfterInput;
    scope: IInputScope;
    changeValue: (scope: IInputScope) => void;
    ngModel: any;
}

export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email'

export interface IBeforeInput {
    icon?: string;
    text?: string;
    button: boolean;
    callback?: (scope: IInputScope) => void;
}

export type IAfterInput = IBeforeInput
