import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'; 
import { Storage } from '@ionic/storage';

import { NavController, LoadingController } from '@ionic/angular';

import { User, FirebaseService } from '../services/firebase/firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  user:any;

  constructor(
    private router:Router, 
    private storage: Storage,
    private firebaseService:FirebaseService,
    private loadingController: LoadingController

  ) { }

  ngOnInit() {
    console.log("In OnInit")
   /* this.storage.get('userId').then((val)=>{
      this.user=val;
      console.log(val);
    });
    console.log( this.user);
    console.log(this.user+"logout");
    this.firebaseService.setLoggedOut(this.user).then(() => {
      console.log("User Logged out");
    });
    this.storage.set('isLoggedIn',"No");
    this.storage.set('userId',"");
    this.storage.set('userId',"");
    this.router.navigateByUrl('/home')*/
  }

  ionViewWillEnter(){
    console.log("In ViewEnterInit")
    this.userlogout();
    
  }

  async userlogout(){
    /*const loading = await this.loadingController.create({
      message: 'User Logging out..'
    });
    await loading.present();*/
 
    this.storage.get('userId').then((val)=>{
      this.user=val;
      console.log(val+"Value");
      if(val){
        this.loggingout();
        //loading.dismiss();
      }
    });
  }

  loggingout(){
    console.log( this.user);
    console.log(this.user+"logout");
    this.firebaseService.setLoggedOut(this.user).then(() => {
      console.log("User Logged out");
    });
    this.storage.set('isLoggedIn',"No");
    this.storage.set('userId',"");
    this.storage.set('userId',"");
    console.log("Redirecting")
    this.router.navigateByUrl('/home')
  }

}
