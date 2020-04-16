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
    schedule: ISchedule;
    step: number; // per hour
}

export interface ISchedule {
    title: string;
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
      title: '08:00 - 18:00 Работа с документами (14:30 - 14:55) Работа с документами (16:20 - 16:40)',
      start: new Date(2019, 4, 1, 8, 0),
      end: new Date(2019, 4, 1, 18, 0),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'ГП №128, (к.140)',
    step: 6,
  },
  {
    id: 2,
    name: 'Константинова-Щедрина А.А.',
    specialty: 'офтальмолог',
    schedule: {
      title: '09:00 - 21:00',
      start: new Date(2019, 4, 1, 9, 0),
      end: new Date(2019, 4, 1, 21, 0),
      days: [2, 3, 4, 5, 6],
    },
    hospital: 'ГП №128, (к.150)',
    step: 2,
  },
  {
    id: 3,
    name: 'Сидорова С.С.',
    specialty: 'терапевт',
    schedule: {
      title: '14:00 - 21:00',
      start: new Date(2019, 4, 2, 14, 0),
      end: new Date(2019, 4, 2, 21, 0),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'ГП №128, (к.150)',
    step: 2,
  },
  {
    id: 5,
    name: 'Григовьева Г.Г.',
    specialty: 'терапевт',
    schedule: {
      title: '10:00 - 20:00 Врач не работает (14:00 - 15:00)',
      start: new Date(2019, 4, 4, 10, 0),
      end: new Date(2019, 4, 4, 20, 0),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'Травма пункт ГБ № 71. (к.211)',
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
