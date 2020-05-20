import {getDate} from '@app/helpers/date';

export interface IRecord {
  id: number;
  message: string;
  userId: number;
  start?: Date;
  end?: Date;
  type: IRecordType;
  patientId?: number;
  regularly?: number[];
  timeStart?: {
    hour: number;
    minute: number;
  };
  timeEnd?: {
    hour: number;
    minute: number;
  };
}

export type IRecordType = 'secondary' | 'success' | 'danger' | 'primary' | 'main'

export const records: IRecord[] = [
  {
    id: 1,
    message: 'Обучение',
    userId: 3,
    regularly: [1],
    timeStart: {
      hour: 10,
      minute: 0,
    },
    timeEnd: {
      hour: 15,
      minute: 0,
    },
    type: 'secondary',
  },
  {
    id: 2,
    message: 'Врач не работает',
    userId: 5,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 14,
      minute: 0,
    },
    timeEnd: {
      hour: 15,
      minute: 0,
    },
    type: 'secondary',
  },
  {
    id: 3,
    message: 'Работа с документами',
    userId: 1,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 14,
      minute: 30,
    },
    timeEnd: {
      hour: 14,
      minute: 55,
    },
    type: 'secondary',
  },
  {
    id: 4,
    message: 'Работа с документами',
    userId: 1,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 16,
      minute: 20,
    },
    timeEnd: {
      hour: 16,
      minute: 40,
    },
    type: 'secondary',
  },
  {
    id: 5,
    message: 'Иванов И. И.',
    userId: 5,
    start: getDate({hour: 10, minute: 0}),
    end: getDate({hour: 10, minute: 30}),
    type: 'primary',
    patientId: 6,
  },
  {
    id: 6,
    message: 'Алексеев А. А.',
    userId: 5,
    start: getDate({hour: 10, minute: 0}),
    end: getDate({hour: 10, minute: 30}),
    type: 'primary',
    patientId: 7,
  },
  {
    id: 7,
    message: 'Петров П. П.',
    userId: 5,
    start: getDate({hour: 10, minute: 30}),
    end: getDate({hour: 11, minute: 0}),
    type: 'primary',
    patientId: 8,
  },
  {
    id: 8,
    message: 'Сергеев C.C.',
    userId: 3,
    start: getDate({hour: 10, minute: 30, day: 1}),
    end: getDate({hour: 11, minute: 0, day: 1}),
    type: 'primary',
    patientId: 9,
  },
  {
    id: 9,
    message: 'Врач не принемает',
    userId: 3,
    regularly: [2, 3, 4, 5],
    timeStart: {
      hour: 8,
      minute: 0,
    },
    timeEnd: {
      hour: 10,
      minute: 0,
    },
    type: 'secondary',
  },
  {
    id: 10,
    message: 'Врач не принимает',
    userId: 2,
    regularly: [2],
    timeStart: {
      hour: 9,
      minute: 0,
    },
    timeEnd: {
      hour: 21,
      minute: 0,
    },
    type: 'secondary',
  },
  {
    id: 11,
    message: 'Запись на прием',
    userId: 5,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 10,
      minute: 0,
    },
    timeEnd: {
      hour: 20,
      minute: 0,
    },
    type: 'main',
  },
  {
    id: 12,
    message: 'Запись на прием',
    userId: 3,
    regularly: [1, 2, 3, 4],
    timeStart: {
      hour: 10,
      minute: 0,
    },
    timeEnd: {
      hour: 15,
      minute: 0,
    },
    type: 'main',
  },
  {
    id: 13,
    message: 'Запись на прием',
    userId: 4,
    regularly: [5, 6],
    timeStart: {
      hour: 14,
      minute: 0,
    },
    timeEnd: {
      hour: 18,
      minute: 0,
    },
    type: 'main',
  },
  {
    id: 14,
    message: 'Запись на прием',
    userId: 1,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 10,
      minute: 0,
    },
    timeEnd: {
      hour: 17,
      minute: 45,
    },
    type: 'main',
  },
  {
    id: 14,
    message: 'Запись на прием',
    userId: 2,
    regularly: [3, 4, 5, 6],
    timeStart: {
      hour: 9,
      minute: 0,
    },
    timeEnd: {
      hour: 21,
      minute: 0,
    },
    type: 'main',
  },
];
