import { Component, OnInit } from '@angular/core';
import { User, FirebaseService } from '../services/firebase/firebase.service';
import { NavController, LoadingController } from '@ionic/angular';


import { AlertController } from '@ionic/angular';
import { Router ,RouterEvent, ActivatedRoute} from '@angular/router';
import { ContactService,Contact } from "../services/addcontact/contact.service";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  
  user: User = {
    name: 'Name',
    username: 'Username',
    password: 'xxxx',
    phnumber: 1234567890,
    status: false,
    
    
  };
 
  userId = null;
  name:string;
  username:string;
  password:string;
  phnumber:string;
 
  msg:string;
  flag:number;
  number:number;

  constructor(private route: ActivatedRoute, 
    private nav: NavController, 
    private firebaseService: FirebaseService,
    private storage: Storage, 
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private contactservice: ContactService,
    private router: Router
    ) { }
 
  ngOnInit() {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId)  {
      this.loadUser();
    }
  }
 
  async loadUser() {
    const loading = await this.loadingController.create({
      message: 'Loading User..'
    });
    await loading.present();
 
    this.firebaseService.getUser(this.userId).subscribe(res => {
      loading.dismiss();
      this.user = res;
    });
  }



  signup(){
    this.msg="";
    this.flag=0;
    if(this.name.length==0){
      this.flag++;
      this.msg=this.msg+"\n Please enter the name";
    }else if(this.name.length>0){
      if(/^[a-zA-Z ]*$/.test(this.name) == false) {
        this.flag++;
        this.name="";
        this.msg=this.msg+"\n Name contains illegal characters";
      }
    }
    if(this.username.length==0){
      this.flag++;
      this.msg=this.msg+"\n Please enter the username";
    }else if(this.username.length>0){
      if(/^[a-zA-Z0-9_ ]*$/.test(this.username) == false) {
        this.flag++;
        this.username="";
        this.msg=this.msg+"\n User name contains illegal characters";
      }
    }
    if(this.password.length==0){
      this.flag++;
      this.msg=this.msg+"\n Please enter the password";
    }else if(this.password.length>0){
      if(this.password.length<8){
        this.flag++;
        this.password="";
        this.msg=this.msg+"\n Password should have minimum 8 characters"
      }
      if(/^[a-zA-Z0-9!@#$ ]*$/.test(this.password) == false) {
        this.flag++;
        this.password="";
        this.msg=this.msg+"\n Password contains illegal characters";
      }else{
        if(this.password.indexOf('@')== -1 && this.password.indexOf('#')== -1 && this.password.indexOf('!')== -1 && this.password.indexOf('$')== -1) {
          this.flag++;
          this.password="";
          this.msg=this.msg+"\n Password should contain atleast one special character";
        }
      }
    }

    if(this.phnumber.length==0){
      this.flag++;
      this.msg=this.msg+"\n Please enter the phonenumber";
    }else if(this.phnumber.length>0){
      this.number=parseInt(this.phnumber);
        console.log(this.number);
        if(/^[0-9 ]*$/.test(this.phnumber) == false) {
          this.flag++;
          this.phnumber="";
          this.msg=this.msg+"\n Phone number contains illegal characters";
        }else{
          if(this.number>9999999999||this.number<1000000000){
            this.flag++;
            this.phnumber="";
            this.msg=this.msg+"\n Please enter a  valid 10 digit phone number";
          }
        }
      }
      if(this.flag==0){
        this.user.name=this.name;
        this.user.username=this.username;
        this.user.password=this.password;
        this.user.phnumber=parseInt(this.phnumber);
        this.user.status=false;
        this.saveUser();
      }else if(this.flag>0){
        alert(this.msg);
      }
      
  }

  async saveUser() {
 
    const loading = await this.loadingController.create({
      message: 'Saving User..'
    });
    await loading.present();
 
    if (this.userId) {
      this.firebaseService.updateUser(this.user, this.userId).then(() => {
        loading.dismiss();
        alert('User updated sucessfully');
        //this.nav.navigateBack('tabs/tab3')
      });
    } else {
      this.firebaseService.addUser(this.user).then(() => {
        loading.dismiss();
        //this.nav.navigateBack('tabs/tab3')
        alert('User created sucessfully');
      });
    }
    
  }
}
