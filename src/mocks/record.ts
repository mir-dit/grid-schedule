export interface IRecord {
    id: number,
    message: string,
    userId: number,
    start: Date,
    end: Date,
    type: IRecordType,
}

export type IRecordType = 'secondary' | 'success' | 'danger' | 'primary'

export const records: IRecord[] = [
    {
        id: 1,
        message: 'Врач не принимает',
        userId: 3,
        start: new Date(2019,4,1, 10, 30),
        end: new Date(2019,4,1, 11, 0),
        type: "secondary",
    },
    {
        id: 2,
        message: 'Работа с документами',
        userId: 1,
        start: new Date(2019,4,2, 10, 0),
        end: new Date(2019,4,2, 12, 30),
        type: "secondary"
    },
    {
        id: 3,
        message: 'Врач не принимает',
        userId: 4,
        start: new Date(2019,4,3, 14, 0),
        end: new Date(2019,4,3, 15, 0),
        type: "danger"
    },
    {
        id: 4,
        message: 'Обучение',
        userId: 2,
        start: new Date(2019,4,3, 16, 0),
        end: new Date(2019,4,3, 17, 0),
        type: "secondary"
    },
    {
        id: 5,
        message: 'Врач не работает',
        userId: 4,
        start: new Date(2019,4,4, 13, 0),
        end: new Date(2019,4,4, 15, 30),
        type: "secondary"
    },
    {
        id: 6,
        message: 'Сергеев С.С.',
        userId: 2,
        start: new Date(2019,4,1, 10, 0),
        end: new Date(2019,4,1, 10, 30),
        type: "primary"
    }
]

export default records
