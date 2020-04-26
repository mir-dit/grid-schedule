import {users, IPatient, ISpecialist} from '@mocks/user';

export interface IInputState {
  patient: IPatient | null;
  date: Date | null;
  specialists: ISpecialist[];
}

export interface IPatientState {
  patients: Readonly<IPatient[]>;
  current: Readonly<IPatient|null>;
}

export interface IPatientService {
  // getState(): IPatientState;
  // getCurrent(): IPatient;
  setCurrent(id: number): void;
  getAll(): IPatient[];
  getPatientById(id: number): IPatient|null;
}

export class PatientService implements IPatientService {
  public patients: IPatient[] = users.filter((user: ISpecialist) => !user.schedule) as IPatient[];
  public current: IPatient|null = null;

  private state: IPatientState = {
    patients: users.filter((user: ISpecialist) => !user.schedule) as IPatient[],
    current: null,
  };

  public setCurrent(id: number): void {
    this.current = this.getPatientById(id);
  }

  public getAll(): IPatient[] {
    return [...this.state.patients];
  }

  public getPatientById(id: number): IPatient|null {
    return this.state.patients.find((p) => p.id === id) || null;
  }
}
