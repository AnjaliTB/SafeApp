import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router'; 
import { Storage } from '@ionic/storage';

import { User, FirebaseService } from './services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  user:any;
  appPages = [
    {
      title: 'Home',
      url: '/userhome',
      icon: 'home'
    },
    {
      title: 'Map',
      url: '/map',
      icon: 'locate'
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: 'contacts'
    },
    {
      title: 'Emergency',
      url: '/emergency',
      icon: 'contacts'
    },
    {
      title: 'Safety Tips',
      url: '/tips',
      icon: 'bookmark'
    },
    {
      title: 'Logout',
      url: '/logout',
      icon: 'log-out'
    }
  ];

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private router:Router, 
    private statusBar: StatusBar,
    private storage: Storage,
    private firebaseService:FirebaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  logout(){

    this.storage.get('userId').then((val)=>{
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
    this.router.navigateByUrl('/home')
  }
  
}
