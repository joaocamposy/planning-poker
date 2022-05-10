import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Room } from './room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private firestore: AngularFirestore) { }

  load(id: string): Promise<Room | null> {
    const doc = this.firestore.doc<any>(`rooms/${id}`);

    return new Promise((resolve, reject) => {
      doc.get().toPromise()
        .then(snapshot => {
          if (!snapshot.exists) {
            return resolve(null);
          }

          resolve(new Room(snapshot.data(), doc));
        })
        .catch(error => reject(error));
    });
  }

  create(name: string): Room {
    const id = this.firestore.createId();
    const doc = this.firestore.doc<any>(`rooms/${id}`);
    const room = new Room({},  doc);
    room.update({ id, name });
    return room;
  }
}
