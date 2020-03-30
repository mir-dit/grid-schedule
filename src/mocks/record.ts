interface IRecord {
    id: number,
    message: string,
    userId: number,
    start: Date,
    end: Date
}

const records: IRecord[] = [
    {
        id: 1,
        message: 'Врач не принимает',
        userId: 3,
        start: new Date(2019,4,10, 10, 30),
        end: new Date(2019,4,10, 11, 0)
    },
    {
        id: 2,
        message: 'Работа с документами',
        userId: 1,
        start: new Date(2019,4,12, 10, 0),
        end: new Date(2019,4,12, 12, 30)
    },
    {
        id: 3,
        message: 'Врач не принимает',
        userId: 4,
        start: new Date(2019,4,12, 14, 0),
        end: new Date(2019,4,12, 15, 0)
    },
    {
        id: 4,
        message: 'Обучение',
        userId: 2,
        start: new Date(2019,4,11, 16, 0),
        end: new Date(2019,4,11, 17, 0)
    }
]

export default records
