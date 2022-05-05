import { Model } from '../data/model';

export class RoomParticipant extends Model {
  id?: string;
  name?: string | null;
  vote?: any;
  isAdmin?: boolean;
}
