import { Component,OnInit } from '@angular/core';
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NavController, LoadingController } from '@ionic/angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
//import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/observable/interval';
import { AlertController } from '@ionic/angular';


import { User, FirebaseService } from '../services/firebase/firebase.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { TrackService,TrackUser } from "../services/trackuser/track.service";
import { Contact, ContactService } from "../services/addcontact/contact.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.page.html',
  styleUrls: ['./userhome.page.scss'],
})
export class UserhomePage implements OnInit {

  
  

 victim: TrackUser = {
   
  phnumber: 1234567890,
  userid:'XXXXXXXXXX',
  latitude:10.66,
  longitude:76.66,
  locationurl:'http://maps.google.com/?ie=UTF8&hq=&ll=10.8505159,76.2710833&z=15',
  //date:new Date().getDate(),
  date: new Date().getDate(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
  
  
};

lat:number;
lang:number;
msg:string;
loc:string;
number:number;
track:boolean;

users:User[];
user:User;
userId:string;
//victim:TrackUser;
sub:any;
date:any;

contacts:any;
phnumber:number;


constructor(private loadingController: LoadingController,
  private alertCtrl: AlertController,
  private firebaseService: FirebaseService,
  private smsVar: SMS,
  private callNumber: CallNumber, 
  private geolocation:Geolocation, 
  public navCtrl: NavController, 
  private launchNavigator: LaunchNavigator,
  private afs: AngularFirestore,
  private trackService:TrackService,
  private storage: Storage,
  private contactservice:ContactService ){
    this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
    });
    this.storage.get('userId').then((val)=>{
      this.user=val;
    });  
    this.contactservice.getContacts().subscribe(res => {
      this.contacts = res;
    });
   
 
}
ngOnInit(){
  this.track=true;
  this.geolocation.getCurrentPosition().then((resp) => {
    this.lat=resp.coords.latitude;
    this.lang=resp.coords.longitude;
    console.log(this.lat);
    console.log(this.lang);
  });

  this.contactservice.getContacts().subscribe(res => {
    this.contacts = res;
    console.log(res);
  });
 
}
ngAfterViewInit(){
  this.contactservice.getContacts().subscribe(res => {
    this.contacts = res;
  });
}
ngOnDestroy(){
  this.track=false;
}

sendSMS(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.lang=resp.coords.longitude;
      this.msg="DANGER!!!Location:  http://maps.google.com/?ie=UTF8&hq=&ll="+this.lat+","+this.lang+"&z=15";
      console.log(this.msg);
      }).catch((error) => {
       //console.log('Error getting location', error);
       alert('Error getting location');
     });
    this.msg="DANGER!!!Location:  http://maps.google.com/?ie=UTF8&hq=&ll="+this.lat+","+this.lang+"&z=15";
      this.smsVar.send('9207578743',this.msg)
      .then(()=>{
        alert("Panic Alert Send!!!");
        
     
      },()=>{
        alert("Failed to send panic alert");
    });
    //this.smsPolice();
    //this.getContacts();
    this.contactservice.getContacts().subscribe(res => {
      this.contacts = res;
    });

    for(let i of this.contacts){
      if(this.user==i.userid){
        this.smsEmergency(i.contactnumber,i.contactname,this.msg);
      }
    }

    /*setTimeout(() => {
      this.callnumber();
      }, 60000);*/


     /* var options={
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
             intent: 'INTENT'  // Opens Default sms app
            //intent: '' // Sends sms without opening default sms app
          }
    }*/
  
    
}

async getContacts(){
  const loading = await this.loadingController.create({
    message: 'Getting Contacts..'
  });
  await loading.present();
  this.contactservice.getContacts().subscribe(res => {
    this.contacts = res;
    loading.dismiss();
  });
}

async smsPolice(){
  const loading = await this.loadingController.create({
    message: 'Sending Message..'
  });
  await loading.present();
  this.smsVar.send('9207578743',this.msg)
      .then(()=>{
        loading.dismiss();
        alert("Panic Alert Send!!!");
        
     
      },()=>{
        alert("Failed to send panic alert ");
    });
}

async smsEmergency(contactnumber, contactname,message){
  const loading = await this.loadingController.create({
    message: 'Sending Message..'
  });
  await loading.present();
  this.smsVar.send(contactnumber,message).then(()=>{
    alert("Panic alert send to " + contactname);
    loading.dismiss();

    },()=>{
      alert("Failed to send panic alert to " + contactname);
  });
}

callnumber(){
  console.log('Calling');
  this.callNumber.callNumber("9207578743", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
}
navigatemap(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.lat=resp.coords.latitude;
    this.lang=resp.coords.longitude;
    this.loc=this.lat+","+this.lang;
  }).catch((error) => {
    //console.log('Error getting location', error);
    alert('Error getting location');
  });
  this.launchNavigator.navigate("Nearest Police Station", {
    start: this.loc
  });
}

trackUser(){
  this.track=true;
  //this.presentPrompt();
    this.userInfo();
    setTimeout(() => {
      if(this.track){
        console.log(this.track);
        this.redirect();
      }
     
     }, 10000);
    
  }
  redirect(){
    this.track=true;
    this.userId="";
    //this.number=1234567891;
    this.firebaseService.getUsers().subscribe(res => {
      this.users = res;
    });
    console.log("redirecting"+this.number)
    for(let user of this.users){
      if(user.phnumber==this.number){
        this.userId=user.id;
        
      }
    }
    if(this.userId!==""){
      console.log(this.userId);
      this.addVictimLocation(this.number,this.userId);
    }else{
      alert('Unregistered User');
      this.userId='Unknown';
      this.addVictimLocation(this.number,this.userId);
    }
  }
    addVictimLocation(phnumber,userid){
      this.victim.phnumber=phnumber;
      this.victim.userid=userid;
      this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.lang=resp.coords.longitude;
      this.victim.latitude=this.lat;
      this.victim.longitude=this.lang;
      this.victim.locationurl="http://maps.google.com/?ie=UTF8&hq=&ll="+this.lat+","+this.lang+"&z=15";
      this.trackService.addUser(this.victim).then(() => {
        alert('Location added');
      });
      }).catch((error) => {
        //console.log('Error getting location', error);
        alert('Error getting location');
  
      });
      setTimeout(() => {
        if(this.track){
          console.log(this.track);
          this.addVictimLocation(this.number,this.userId);
        }
       
       }, 10000);
    }
    stop(){
      this.track=false;
    }

    async userInfo(){
      const loading = await this.loadingController.create({
        message: 'Getting User Info..'
      });
      await loading.present();
      this.firebaseService.getUser(this.user).subscribe((res)=>{
        loading.dismiss();
        this.user=res;
        this.number=res.phnumber;
        this.userId=res.id;
      })
     
    }

}
