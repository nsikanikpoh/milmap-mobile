
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { Prospect } from '../';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-create-prospect',
  templateUrl: 'create-prospect.html',
})
export class CreateProspectPage implements OnInit{
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  signinform: FormGroup;
  loading : any;
  pHold : any;
  account: { name: string, email: string, location:string,
  phone:string, gender:string, address:string, state:string } = {
    "name": "",
    "email": "",
    "phone":"",
    "gender":"",
    "location":"",
    "address":"",
    "state":""
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }


  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let TELPATTERN = /^[0-9\/]*$/i;
    this.signinform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(TELPATTERN), Validators.minLength(11), Validators.maxLength(13)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*.+[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });

  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait...'
    });
  
    this.loading.present();
  }


  doSignup() {
    // Attempt to signup in through our User service
    this.showLoader();
    this.user.newProspect(this.account).subscribe((resp: any) => {
      if (resp){
        this.pHold = resp;
        localStorage.setItem('pDetail', JSON.stringify(this.pHold));
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Registration Successful',
          subTitle: 'Prospect registration is successful, view your prospects',
          buttons: ['OK']
        }
    );
        alert.present();
        console.log(resp);
      this.navCtrl.push(Prospect);
      }


    }, (err) => {

     // this.navCtrl.push(MainPage);

      // Unable to sign up
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      let alert = this.alertCtrl.create({
        title: 'Registration Failed',
        subTitle: 'Prospect registration failed',
        buttons: ['OK']
      });
      alert.present();
    });
  }
 


}

