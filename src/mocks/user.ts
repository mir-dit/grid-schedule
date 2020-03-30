interface IUser {
    id: number,
    name: string,
    role: Role,
    specialty?: string,
    schedule?: string
}

type Role = 'patient' | 'specialist'

const users: IUser[] = [
    {
        id: 1,
        name: 'Елисеева Е.Е.',
        role: 'specialist',
        specialty: 'офтальмолог',
        schedule: '08:00 - 18:00 Работа с докементами (14:30 - 14:55) Работа с докементами (16:20 - 16:40)'
    },
    {
        id: 2,
        name: 'Констанинова А.А.',
        role: 'specialist',
        specialty: 'офтальмолог',
        schedule: '09:00 - 21:00'
    },
    {
        id: 3,
        name: 'Сидорова С.С.',
        role: 'specialist',
        specialty: 'терапевт',
        schedule: '14:00 - 21:00'
    },
    {
        id: 4,
        name: 'Арончикова Л.И.',
        role: 'specialist',
        specialty: 'терапевт',
        schedule: '10:00 - 20:00'
    },
    {
        id: 5,
        name: 'Григовьева Г.Г.',
        role: 'specialist',
        specialty: 'терапевт',
        schedule: '10:00 - 20:00 Врач не работает (14:00 - 15:00)'
    }
]

export default users
