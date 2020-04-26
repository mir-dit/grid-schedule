import {IPatient, ISpecialist} from '@mocks/user';
import {IRecord, records} from '@mocks/record';

export interface IRecordService {
  records: IRecord[];
  getUserRecordsIncludesDate(user: ISpecialist, date: Date): IRecord[];
  getUserRecordsBetweenDates(user: ISpecialist, date: Date, nextDate: Date): IRecord[];
  addPrimaryRecord(patient: IPatient, specialistId: number, start: Date, end: Date): void;
  removeRecord(id: number): void;
}

function loadRecords(): IRecord[] {
  const loadedRecords = localStorage.getItem('records');
  return loadedRecords ? JSON.parse(loadedRecords).map((record) => ({
    ...record,
    start: new Date(record.start),
    end: new Date(record.end),
  })) : records.slice();
}

export class RecordService implements IRecordService {
  public records: IRecord[] = loadRecords();

  constructor(private $rootScope: ng.IRootScopeService) {}

  public getUserRecordsIncludesDate(user: ISpecialist, date: Date): IRecord[] {
    return this.records.filter(({userId, start, end}: IRecord) => userId === user.id && start <= date && date < end);
  }

  public getUserRecordsBetweenDates(user: ISpecialist, date: Date, nextDate: Date): IRecord[] {
    return this.records.filter(({userId, start, end}: IRecord) => userId === user.id && date < start && end < nextDate);
  }

  public addPrimaryRecord(patient: IPatient, specialistId: number, start: Date, end: Date): void {
    const nextId = Math.max(...this.records.map(({id}) => id)) + 1;
    this.records.push({
      type: 'primary',
      id: nextId,
      message: patient.name,
      userId: specialistId,
      start,
      end,
      patientId: patient.id,
    });
    this.recordsUpdated();
  }

  public removeRecord(id: number): void {
    const index = this.records.findIndex((record: IRecord) => record.id === id);
    if (index === -1) throw new Error('Record not found');
    this.records.splice(index, 1);
    this.recordsUpdated();
  }

  private recordsUpdated(): void {
    localStorage.setItem('records', JSON.stringify(this.records));
    this.$rootScope.$broadcast('records:updated');
  }
}
