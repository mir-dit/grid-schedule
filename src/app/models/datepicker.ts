export interface IDatepicker {
    format: string,
    minDate: Date,
    maxDate: Date,
    dateOptions: {
        formatYear: string,
        startingDay: number
    }
}

export const example = {
    format: 'dd-MM-yyyy',
    minDate: new Date(),
    maxDate: new Date(2025, 1, 1),
    dateOptions: {
        formatYear: 'yy',
        startingDay: 1
    }
}
