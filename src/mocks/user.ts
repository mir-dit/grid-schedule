export interface IUser {
    id: number;
    name: string;
}

export interface IPatient extends IUser {
    oms: string;
    birthday: Date;
}

export interface ISpecialist extends IUser {
    specialty: string;
    hospital: string;
    cabinet: string;
    schedule: ISchedule;
    step: number; // per hour
}

export interface ISchedule {
    start: Date; // ~
    end: Date; // ~
    days: number[]; // days of week, 0 = Sunday
}

export type Users = (IPatient | ISpecialist)[]

export const users: Users = [
  {
    id: 1,
    name: 'Елисеева Е.Е.',
    specialty: 'офтальмолог',
    schedule: {
      start: new Date(new Date().setHours(8, 0)),
      end: new Date(new Date().setHours(18, 0)),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'ГП №128',
    cabinet: '140',
    step: 2,

  },
  {
    id: 2,
    name: 'Константинова-Щедрина А.А.',
    specialty: 'офтальмолог',
    schedule: {
      start: new Date(new Date().setHours(8, 0)),
      end: new Date(new Date().setHours(21, 0)),
      days: [2, 3, 4, 5, 6],
    },
    hospital: 'ГП №128',
    cabinet: '150',
    step: 2,
  },
  {
    id: 3,
    name: 'Сидорова С.С.',
    specialty: 'терапевт',
    schedule: {
      start: new Date(new Date().setHours(8, 0)),
      end: new Date(new Date().setHours(15, 0)),
      days: [1, 2, 3, 4],
    },
    hospital: 'ГП №128',
    cabinet: '120',
    step: 2,
  },
  {
    id: 4,
    name: 'Сидорова С.С.',
    specialty: 'терапевт',
    schedule: {
      start: new Date(new Date().setHours(14, 0)),
      end: new Date(new Date().setHours(18, 0)),
      days: [5, 6],
    },
    hospital: 'ГП №128',
    cabinet: '130',
    step: 6,
  },
  {
    id: 5,
    name: 'Григовьева Г.Г.',
    specialty: 'терапевт',
    schedule: {
      start: new Date(new Date().setHours(10, 0)),
      end: new Date(new Date().setHours(20, 0)),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'ГП №128',
    cabinet: '110',
    step: 2,
  },
  {
    id: 6,
    name: 'Иванов И. И.',
    oms: '1111111111111111',
    birthday: new Date(2011, 10, 11),
  },
  {
    id: 7,
    name: 'Алексеев А. А.',
    oms: '2222222222222222',
    birthday: new Date(1922, 11, 22),
  },
  {
    id: 8,
    name: 'Петров П. П.',
    oms: '3333333333333333',
    birthday: new Date(1990, 0, 1),
  },
  {
    id: 9,
    name: 'Сергеев C.C.',
    oms: '4444444444444444',
    birthday: new Date(2002, 1, 2),
  },
  {
    id: 10,
    name: 'Васильев В.В.',
    oms: '5555555555555555',
    birthday: new Date(1949, 8, 9),
  },
];
