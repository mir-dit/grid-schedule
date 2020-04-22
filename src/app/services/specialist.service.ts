import {ISpecialist, users} from '@mocks/user';

export interface ISpecialistService {
  specialists: ISpecialist[];
  filterDate: Date | null;
  getSpecialists(): ISpecialist[];
  getSpecialistById(id: number): ISpecialist | undefined;
}

export class SpecialistService implements ISpecialistService {
  public specialists: ISpecialist[] = users.filter((user: ISpecialist) => user.schedule) as ISpecialist[];
  public filterDate: Date | null = null;

  public getSpecialists(): ISpecialist[] {
    return this.specialists;
  }

  public getSpecialistById(id: number): ISpecialist | undefined {
    return this.specialists.find((user: ISpecialist) => id === user.id);
  }
}
