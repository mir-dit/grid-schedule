import {getDate} from "@app/helpers/date";

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
    hour: number,
    minute: number
  };
  timeEnd?: {
    hour: number,
    minute: number
  };
}

export type IRecordType = 'secondary' | 'success' | 'danger' | 'primary'

export const records: IRecord[] = [
  {
    id: 3,
    message: 'Врач на больничном',
    userId: 1,
    start: getDate({hour: 1}),
    end: getDate({hour: 24}),
    type: 'danger',
  },
  {
    id: 4,
    message: 'Обучение',
    userId: 3,
    regularly: [1],
    timeStart: {
      hour: 10,
      minute: 0
    },
    timeEnd: {
      hour: 15,
      minute: 0
    },
    type: 'secondary',
  },
  {
    id: 5,
    message: 'Врач не работает',
    userId: 5,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 14,
      minute: 0
    },
    timeEnd: {
      hour: 15,
      minute: 0
    },
    type: 'secondary',
  },
  {
    id: 9,
    message: 'Работа с документами',
    userId: 1,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 14,
      minute: 30
    },
    timeEnd: {
      hour: 14,
      minute: 55
    },
    type: 'secondary',
  },
  {
    id: 10,
    message: 'Работа с документами',
    userId: 1,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 16,
      minute: 20
    },
    timeEnd: {
      hour: 16,
      minute: 40
    },
    type: 'secondary',
  },
  {
    id: 11,
    message: 'Врач не работает',
    userId: 1,
    regularly: [1, 2, 3, 4, 5],
    timeStart: {
      hour: 8,
      minute: 0
    },
    timeEnd: {
      hour: 10,
      minute: 0
    },
    type: 'secondary',
  },
  {
    id: 6,
    message: 'Иванов И. И.',
    userId: 5,
    start: getDate({hour: 9, minute: 59}),
    end: getDate({hour: 10, minute: 29}),
    type: 'primary',
    patientId: 6,
  },
  {
    id: 7,
    message: 'Алексеев А. А.',
    userId: 5,
    start: getDate({hour: 9, minute: 59}),
    end: getDate({hour: 10, minute: 29}),
    type: 'primary',
    patientId: 7,
  },
  {
    id: 8,
    message: 'Петров П. П.',
    userId: 5,
    start: getDate({hour: 10, minute: 29}),
    end: getDate({hour: 10, minute: 59}),
    type: 'primary',
    patientId: 8,
  },
];
