import {User} from './user.model';
import {Patient} from './patient.model';

export class Record {
  id: number;
  date: Date;
  nurse: User;
  patient: Patient;
  type: string;
  details: number;
  category: string;
}
