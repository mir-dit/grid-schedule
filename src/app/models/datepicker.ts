import {IAsideScope} from "@components/aside/aside.model";

export interface IDatepicker {
    format: string,
    minDate: Date,
    maxDate: Date,
    dateOptions: {
        formatYear: string,
        startingDay: number
    },
    status: {
        opened: boolean
    },
    open: (scope: IAsideScope) => void
}

export const preset = {
    format: 'dd-MM-yyyy',
    minDate: new Date(),
    maxDate: new Date(2025, 1, 1),
    dateOptions: {
        formatYear: 'yy',
        startingDay: 1
    },
    status: {
        opened: false
    },
    open: (scope) => scope.datepicker.status.opened = !scope.datepicker.status.opened
}
