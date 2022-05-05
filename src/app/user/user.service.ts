import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id!: string;

  constructor(private firestore: AngularFirestore) {
    if (!localStorage.sessionId) {
      localStorage.sessionId = (Math.random() + 1).toString(36).substring(2);
    }

    this.id = localStorage.sessionId;
  }

  load(id: string): Promise<User> {
    const doc = this.firestore.doc<any>(`users/${id}`);

    return new Promise((resolve, reject) => {
      doc.get()
        .toPromise()
        .then(snapshot => resolve(new User(snapshot.data() || {
          preferences: {
            theme: {
              color: 'system',
              accentColor: '#6638e5',
            }
          }
        }, doc)))
        .catch(error => reject(error));
    });
  }
}
