import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ContactService,Contact } from "../services/addcontact/contact.service";

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  name:string;
  number:number;
  user:string;

  contact: Contact = {
    userid:'XXXXXXXX',
    contactname: 'Anju',
    contactnumber:9207578743
    
  };
  contacts:any;

  flag:number;
  message:string;

  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    private contactservice: ContactService,
    private storage: Storage,
    private loadingController: LoadingController,
    private router: Router,
    private route: ActivatedRoute ) { 
      this.storage.get('userId').then((val)=>{
        this.user=val;
      });  
      this.contactservice.getContacts().subscribe(res => {
        this.contacts = res;
      });
    }

  ngOnInit() {
    this.userInfo();
    this.loadContacts();
  }

  async userInfo(){
    const loading = await this.loadingController.create({
      message: 'Getting User Info..'
    });
    await loading.present();
    this.storage.get('userId').then((val)=>{
      this.user=val;
      loading.dismiss();
    }); 
    console.log(this.user)
  }

  /*async loadContacts(){
    const loading = await this.loadingController.create({
      message: 'Getting Contacts..'
    });
    await loading.present();
    this.contactservice.getContacts().subscribe(res => {
      this.contacts = res;
      console.log(res);
      loading.dismiss();
      //console.log(res);
    });
      
  }*/


  loadContacts(){
    this.contactservice.getContacts().subscribe(res => {
      this.contacts = res;
      console.log(res);
      //console.log(res);
    });
      
  }
  
  ngAfterViewInit(): void {
    //console.log("In AfterInit")
  }

  ionViewWillEnter(){
    //console.log("In WillEnter")
  }

  
  
  addContact(){
    this.router.navigateByUrl('/addcontact/'+this.user);
  }

  
  
  update(id){
    this.router.navigateByUrl('/updatecontact/'+id);
  }

  delete(id){
    this.contactservice.removeContact(id).then(()=>{
      alert("Contact deleted");
    })
    //window.location.reload();
  }

  
  addcontact(){
    this.presentPrompt();

    setTimeout(() => {
      this.entercontact();
     
     }, 10000);

  }
  entercontact(){
    this.storage.get('userId').then((val)=>{
      this.user=val;
    });
    console.log("Userid"+this.user);
    this.contact.userid=this.user;
    //console.log("Contact userid"+this.contact.userid);
    this.contact.contactname=this.name;
    this.contact.contactnumber=this.number;
    this.contactservice.addContact(this.contact).then(() => {
      alert('Contact saved sucessfully');
    });
  }

  async presentPrompt() {
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'contactname',
          placeholder: 'Contact name'
        },
        {
          name: 'contactnumber',
          placeholder: 'Contact Number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
           
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked');
            this.number=data.contactnumber;
            this.name=data.contactname
          }
        }
      ]
    });
    await alert.present();
  }

  
}
