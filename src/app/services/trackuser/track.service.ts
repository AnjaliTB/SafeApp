import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface TrackUser {
  id?: string;
  phnumber: number;
  latitude:number;
  longitude:number;
  userid:string;
  locationurl:string;
  date:number;
  hours:number,
  minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private trackUsersCollection: AngularFirestoreCollection<TrackUser>;
 
  private trackUsers: Observable<TrackUser[]>;
 
  constructor(db: AngularFirestore) {
    this.trackUsersCollection = db.collection<TrackUser>('trackusers');
 
    this.trackUsers = this.trackUsersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUsers() {
    return this.trackUsers;
  }
 
  getUser(id) {
    return this.trackUsersCollection.doc<TrackUser>(id).valueChanges();
  }
 
  updateUser(trackUser: TrackUser, id: string) {
    return this.trackUsersCollection.doc(id).update(trackUser);
  }
 
  addUser(trackUser: TrackUser) {
    return this.trackUsersCollection.add(trackUser);
  }
 

}
