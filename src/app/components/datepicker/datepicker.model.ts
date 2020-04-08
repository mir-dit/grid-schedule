import {IScope} from "angular";

export interface IDatepicker {
    format: string,
    minDate: Date,
    maxDate: Date,
    options: {
        formatYear: string,
        startingDay: number
    }
}

export const defaultConfig = {
    format: 'dd-MM-yyyy',
    minDate: new Date(),
    maxDate: new Date(2025, 1, 1),
    options: {
        formatYear: 'yy',
        startingDay: 1
    }
}

export interface IDatepickerScope extends IScope {
    show: boolean,
    config: IDatepicker,
    toggleShow: () => void,
    callback: (scope: IDatepickerScope) => void
}

