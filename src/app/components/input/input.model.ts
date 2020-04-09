export interface IInputScope extends ng.IScope {
    id: string;
    value: null | string;
    defaultValue: null | string;
    type: InputType;
    placeholder: string;
    before: IBeforeInput;
    after: IAfterInput;
    scope: IInputScope;
    changeValue: (scope: IInputScope) => void;
    ngModel: ng.INgModelController;
}

export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email'

export interface IBeforeInput {
    icon?: string;
    text?: string;
    button: boolean;
    callback?: (scope: IInputScope) => void;
}

export type IAfterInput = IBeforeInput
