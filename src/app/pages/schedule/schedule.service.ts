import {users, ISpecialist, IPatient} from '../../../mocks/user';
import {records, IRecord} from '../../../mocks/record';

export interface IScheduleService {
  getSpecialistsByDate(date: Date): ISpecialist[];
  getSpecialistById(id: number): ISpecialist | undefined;
  getUserRecordsIncludesDate(user: ISpecialist, date: Date): IRecord[];
  getUserRecordsBetweenDates(user: ISpecialist, date: Date, nextDate: Date): IRecord[];
  addPrimaryRecord(patient: IPatient, specialistId: number, start: Date, end: Date): void;
  removeRecord(id: number): void;
  getPatientById(id: number): IPatient | undefined;
  getPatients(): IPatient[];
  getSpecialists(): ISpecialist[];
}

function loadRecords(): IRecord[] {
  const loadedRecords = localStorage.getItem('records');
  return loadedRecords ? JSON.parse(loadedRecords).map((record) => ({
    ...record,
    start: new Date(record.start),
    end: new Date(record.end),
  })) : records.slice();
}

export class ScheduleService implements IScheduleService {
  private specialists: ISpecialist[];
  private paitents: IPatient[];
  private records: IRecord[];

  constructor(private $rootScope: ng.IRootScopeService) {
    this.specialists = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];
    this.paitents = users.filter((user: ISpecialist) => !user.schedule) as IPatient[];
    this.records = loadRecords();
  }

  private recordsUpdated(): void {
    localStorage.setItem('records', JSON.stringify(this.records));
    this.$rootScope.$broadcast('records:updated');
  }

  getPatients(): IPatient[] {
    return this.paitents;
  }

  getSpecialists(): ISpecialist[] {
    return this.specialists;
  }

  getSpecialistsByDate(date: Date): ISpecialist[] {
    return this.specialists.filter((user) => user.schedule.days.includes(date.getDay()));
  }

  getSpecialistById(id: number): ISpecialist | undefined {
    return this.specialists.find((user: ISpecialist) => id === user.id);
  }

  getUserRecordsIncludesDate(user: ISpecialist, date: Date): IRecord[] {
    return this.records.filter(({userId, start, end}: IRecord) => userId === user.id && start <= date && date < end);
  }

  getUserRecordsBetweenDates(user: ISpecialist, date: Date, nextDate: Date): IRecord[] {
    return this.records.filter(({userId, start, end}: IRecord) => userId === user.id && date < start && end < nextDate);
  }

  addPrimaryRecord(patient: IPatient, specialistId: number, start: Date, end: Date): void {
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

  removeRecord(id: number): void {
    const index = this.records.findIndex((record: IRecord) => record.id === id);
    if (index === -1) throw new Error('Record not found');
    this.records.splice(index, 1);
    this.recordsUpdated();
  }

  getPatientById(id: number): IPatient | undefined {
    return this.paitents.find((user: IPatient) => id === user.id);
  }
}
