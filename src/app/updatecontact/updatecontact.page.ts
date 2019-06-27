import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { ContactService,Contact } from "../services/addcontact/contact.service";

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-updatecontact',
  templateUrl: './updatecontact.page.html',
  styleUrls: ['./updatecontact.page.scss'],
})
export class UpdatecontactPage implements OnInit {

  contactname:string;
  contactnumber:string;
  user:string;
  userId:string;
  number:number;
  msg:string;
  flag:number;

  contact: Contact = {
    userid:'XXXXXXXX',
    contactname: 'Anju',
    contactnumber:9207578743
    
  };
  

  

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
    }


  ngOnInit() {
    this.userId =this.route.snapshot.paramMap.get('id');
    console.log(this.userId+" contact id")
    this.loadContacts(this.userId);
        
  }
  async loadContacts(id){
    const loading = await this.loadingController.create({
      message: 'Getting Contact details..'
    });
    await loading.present();
    this.contactservice.getContact(id).subscribe(res => {
      this.contact = res;
      this.contactname=res.contactname;
      this.contactnumber=res.contactnumber.toString();
      loading.dismiss();
      //console.log(res);
      });
      this.storage.get('userId').then((val)=>{
        this.user=val;
      }); 
    console.log(this.user)
  }


  updatecontact(){
    this.msg="";
    this.flag=0;

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
            this.msg=this.msg+"\n Please enter a  valid 10 digit phone number";
          }
        }
  
        if(/^[a-zA-Z ]*$/.test(this.contactname) == false) {
          this.flag++;
          this.msg=this.msg+"\n Contact name contains illegal characters";
        }
      }
    
    if(this.flag==0){
      this.updateContactDetails();
    }else{
      alert(this.msg);
    }
  }

  async updateContactDetails(){
    const loading = await this.loadingController.create({
      message: 'Updating contact..'
    });
    await loading.present();
    //this.contact.userid=this.userId;
    this.contact.contactname=this.contactname;
    this.contact.contactnumber=parseInt(this.contactnumber);
    console.log(this.contact);
    this.contactservice.updateContact(this.contact,this.userId).then(() => {
      loading.dismiss();
      alert('Contact updated sucessfully');
      this.router.navigateByUrl('/contacts');
    });
  }


}
