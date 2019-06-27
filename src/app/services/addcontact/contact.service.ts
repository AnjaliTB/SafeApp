import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Contact {
  id?: string;
  userid:string;
  contactname: string;
  contactnumber: number;
}


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsCollection: AngularFirestoreCollection<Contact>;
 
  private contacts: Observable<Contact[]>;
 
  constructor(db: AngularFirestore) {
    this.contactsCollection = db.collection<Contact>('contacts');
 
    this.contacts = this.contactsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getContacts() {
    return this.contacts;
  }
 
  getContact(id) {
    return this.contactsCollection.doc<Contact>(id).valueChanges();
  }

  addContact(contact: Contact) {
    return this.contactsCollection.add(contact);
  }

  updateContact(contact: Contact, id: string) {
    return this.contactsCollection.doc(id).update(contact);
  }

  removeContact(id) {
    return this.contactsCollection.doc(id).delete();
  }
 
}
