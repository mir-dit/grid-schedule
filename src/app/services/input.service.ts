import {IPatient} from '@mocks/user';

export interface IInputState {
  patient: IPatient | null;
}

export interface IInputService {
  state: IInputState;
}

export class InputService implements IInputService {
  state = {
    patient: null,
  };
}
