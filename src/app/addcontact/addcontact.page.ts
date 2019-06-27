import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ContactService,Contact } from "../services/addcontact/contact.service";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.page.html',
  styleUrls: ['./addcontact.page.scss'],
})
export class AddcontactPage implements OnInit {

  contact: Contact = {
    userid:'XXXXXXXX',
    contactname: 'Anju',
    contactnumber:9207578743
    
  };
  //contact: Contact;

  userId:any;
  contactname:string;
  contactnumber:string;
  number: number;
  flag:number;
  msg:string;

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private contactservice: ContactService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    
  ) { }

  ngOnInit() {
    console.log("In INit")
    this.userId =this.route.snapshot.paramMap.get('id');
    this.contactname="";
    this.contactnumber="";
  }
  addcontact(){
    this.msg="";
    this.flag=0;

    if(this.contactnumber.length==0 && this.contactnumber.length==0){
      this.flag++;
      this.msg=this.msg+"\nPlease enter a contact name and a contact number";
      this.contactname="";
      this.contactnumber="";
    }else if(this.contactnumber.length==0){
      this.flag++;
      this.msg=this.msg+"\nPlease enter the contact number";
    }else if(this.contactname.length==0){
      this.flag++;
      this.msg=this.msg+"\nPlease enter the contact name";
    }else{
      if(this.contactnumber.length>0 && this.contactname.length>0){
        this.number=parseInt(this.contactnumber);
        console.log(this.number);
        if(/^[0-9 ]*$/.test(this.contactnumber) == false) {
          this.flag++;
          this.contactnumber="";
          this.msg=this.msg+"\n Contact number contains illegal characters";
        }else{
          if(this.number>9999999999||this.number<1000000000){
            this.flag++;
            this.contactnumber="";
            this.msg=this.msg+"\n Please enter a  valid 10 digit phone number";
          }
        }

        /*if(!isNaN(this.number)){
          if(this.number>9999999999||this.number<1000000000){
            this.flag++;
            this.msg=this.msg+"\n Please enter a  valid 10 digit phone number";
          }
        }else{
          this.flag++;
          this.msg=this.msg+"\n Please enter a valid 10 digit phone number";
        }*/
  
        if(/^[a-zA-Z ]*$/.test(this.contactname) == false) {
          this.flag++;
          this.contactname="";
          this.msg=this.msg+"\n Contact name contains illegal characters";
        }
      }

    }
    
    
    if(this.flag==0){
      this.addContactDetails();
    }else{
      alert(this.msg);
    }
  }

  async addContactDetails(){
    const loading = await this.loadingController.create({
      message: 'Saving contact..'
    });
    await loading.present();
    this.contact.userid=this.userId;
    this.contact.contactname=this.contactname;
    this.contact.contactnumber=parseInt(this.contactnumber.valueOf());
    this.contactservice.addContact(this.contact).then(() => {
      loading.dismiss();
      alert('Contact saved sucessfully');
      this.router.navigateByUrl('/contacts');
    });
  }

}
