import {User} from './user.model';

export class Patient {
  id: number;
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  roomNumber: number;
  emergencyNumber: string;
  department: string;
  doctor: User;
  nurse?: User;
  gender: string;
}
