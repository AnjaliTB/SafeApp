import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface contacts {
  id?: string;
  contactname:string;
  contactnumber: string;
}
export interface loggedUser {
  id?: string;
  userid:string;
  
}

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {

  /*private usersCollection: AngularFirestoreCollection<User>;
 
  private users: Observable<User[]>;
 
  constructor(db: AngularFirestore) {
    this.usersCollection = db.collection<User>('users');
 
    this.users = this.usersCollection.snapshotChanges().pipe(
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
    return this.users;
  }
 
  getUser(id) {
    return this.usersCollection.doc<User>(id).valueChanges();
  }
 
  updateUser(user: User, id: string) {
    return this.usersCollection.doc(id).update(user);
  }
 
  addUser(user: User) {
    return this.usersCollection.add(user);
  }
 
  removeUser(id) {
    return this.usersCollection.doc(id).delete();
  }

  getUserofUsername(username) {
    return this.usersCollection.doc<User>(username).valueChanges();
  }

  getUserofPassword(password) {
    return this.usersCollection.doc<User>(password).valueChanges();
  }

  setLoggedIn(id: string) {
    return this.usersCollection.doc(id).update({status: true});
  }
  setLoggedOut(id: string) {
    return this.usersCollection.doc(id).update({status: false});
  }*/
}
