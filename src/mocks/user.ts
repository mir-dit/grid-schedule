export interface IUser {
    id: number;
    name: string;
}

export interface IPatient extends IUser {
    oms: string;
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
    name: 'Констанинова А.А.',
    specialty: 'офтальмолог',
    schedule: {
      title: '09:00 - 21:00',
      start: new Date(2019, 4, 1, 9, 0),
      end: new Date(2019, 4, 1, 21, 0),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'ГП №128, (к.130)',
    step: 6,
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
    id: 4,
    name: 'Арончикова Л.И.',
    specialty: 'терапевт',
    schedule: {
      title: '10:00 - 20:00',
      start: new Date(2019, 4, 3, 10, 0),
      end: new Date(2019, 4, 3, 20, 0),
      days: [1, 2, 3, 4, 5],
    },
    hospital: 'ГП №128, (к.142)',
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
    name: 'Сергеев Г.Г.',
    oms: '1111111111111111',
  },
];
