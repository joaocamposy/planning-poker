import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  id!: string;

  constructor(private firestore: AngularFirestore) {
    if (!localStorage.sessionId) {
      localStorage.sessionId = (Math.random() + 1).toString(36).substring(2);
    }

    this.id = localStorage.sessionId;
  }

  load(id: string): Promise<Session> {
    const doc = this.firestore.doc<any>(`sessions/${id}`);

    return new Promise((resolve, reject) => {
      doc.get()
        .toPromise()
        .then(snapshot => resolve(new Session(snapshot.data(), doc)))
        .catch(error => reject(error));
    });
  }
}
