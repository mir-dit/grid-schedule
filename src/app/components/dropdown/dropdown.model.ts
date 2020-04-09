import {IScope} from 'angular';

export interface IDropdownScope extends IScope {
    show: boolean;
    icon: string;
    type: DropdownType;
    items: IDropdownItem;
    scope: IDropdownScope;
    handler?: (scope: IDropdownScope) => void;
    toggleShow: () => void;
}

export interface IDropdownItem {
    text: string;
    href?: string;
}

export type DropdownType = 'success' | 'secondary' | 'primary' | 'danger'
