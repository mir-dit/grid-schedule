export interface IInputScope extends ng.IScope {
    id: string;
    value: string;
    type: InputType;
    placeholder: string;
    before: IBeforeInput;
    after: IAfterInput;
    scope: IInputScope;
    changeValue: (scope: IInputScope) => void;
}

export type InputType = 'text' | 'password' | 'number' | 'tel' | 'email'

export interface IBeforeInput {
    icon?: string;
    text?: string;
    button: boolean;
    callback?: (scope: IInputScope) => void;
}

export type IAfterInput = IBeforeInput
