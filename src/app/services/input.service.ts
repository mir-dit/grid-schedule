import {IPatient, ISpecialist} from '@mocks/user';

export interface IInputState {
  patient: IPatient | null;
  date: Date | null;
  specialists: ISpecialist[];
}

export interface IInputService {
  state: IInputState;
}

export class InputService implements IInputService {
  state = {
    patient: null,
    date: null,
    specialists: [],
  };
}
