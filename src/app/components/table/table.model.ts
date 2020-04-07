export interface ICellAffairs {
  reason: string;
}

export interface ICellPatient {
  recordId: number;
  name: string;
}

export interface ICellTime {
  time: Date;
  patient?: ICellPatient;
  patient2?: ICellPatient;
  cross?: boolean,
}

export interface IColumn {
  specialistId: number;
  date: Date;
  doctor: string;
  specialty: string;
  address: string;
}

export interface IColumnBusy extends IColumn {
  busy: string;
}

export interface IColumnFree extends IColumn {
  interval: string;
  cells: Cell[];
}

export type Column = IColumnBusy | IColumnFree;
export type Cell = ICellAffairs | ICellTime;
