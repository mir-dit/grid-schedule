export interface IDropdownScope extends ng.IScope {
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
