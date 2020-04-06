export interface IRowAffairs  {
  reason: string;
}

export interface IRowUsed {
  time: Date;
  patient: string;
  patient2?: string;
}

export interface IRowFree {
  time: Date;
}

export interface IRowCross {
  cross: true,
  time: Date;
  patient: string;
}

export interface IColumn {
  userId: number;
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
  rows: Row[];
}

export type Column = IColumnBusy | IColumnFree;
export type Row = IRowAffairs | IRowFree | IRowUsed | IRowCross;
