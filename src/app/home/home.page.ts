import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

//import { AuthenticationService } from "../authentication.service";
import { User, FirebaseService } from '../services/firebase/firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
//import 'rxjs/add/operator/mergeMap';
import { AngularFirestore } from 'angularfire2/firestore';
import { Contact,ContactService } from "../services/addcontact/contact.service";

import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  users: User[];
  user: User;
  contacts:Contact[];
  //user: any;
  length : number;
  status: boolean;
  person: number;
  username: string ="";
  password: string ="";
  userId: string = "";

  uname: string ="";
  pwd: string ="";


  //credentials = {username: '', password: '', remember: 'yes'}; // select remember by default

  constructor(private firebaseService: FirebaseService, 
    public navCtrl: NavController ,
    private router:Router,
    //private auth: AuthenticationService,
    private route: ActivatedRoute,  
    private loadingController: LoadingController,
    private afs: AngularFirestore,
    private storage: Storage,
    private contactservice: ContactService) {

  }
  ngOnInit(){
    
    this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
      
      });
    this.storage.get('isLoggedIn').then((val)=>{
     if(val=="Yes"){
      //this.router.navigateByUrl('/userhome/'+this.userId);
      console.log(val);
      
      this.router.navigateByUrl('/userhome');
     }
   });

  }
 login(){
  this.firebaseService.getUsers().subscribe(res => {
    this.users = res;
    
    });
      for (let user of this.users) {
        if(this.username==user.username && this.password==user.password){
          this.person=2;
          this.userId = user.id;
          console.log(this.userId)
          this.storage.set('isLoggedIn',"Yes");
          this.storage.set('userId',this.userId)
          this.firebaseService.setLoggedIn(this.userId).then(() => {
            console.log("User Logged in");
          });
          console.log('After status')
          this.router.navigateByUrl('/userhome');
          console.log('After url')
        }
        else{
          this.person=0;
        }
      }

      if(this.person==0 && this.userId==''){
        alert("Incorrect username or password !!!");
      }

      this.username="";
      this.password="";
}

}
