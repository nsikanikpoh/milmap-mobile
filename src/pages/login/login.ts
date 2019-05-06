import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/user/user';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  signinform: FormGroup;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  loading : any;
  responsData : any;
  account: { email:'', password:''}={
    "email": "",
    "password": ""
  };
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }
  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signinform = new FormGroup({
     password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
  
    this.loading.present();
  }

  // Attempt to login in through our User service
  doLogin() {

    this.showLoader();
    this.user.login(this.account).subscribe((resp) => {
      if (resp){
        this.responsData = resp;
        localStorage.setItem('userData', JSON.stringify(this.responsData));
        localStorage.setItem('email', JSON.stringify(this.responsData.email));
        localStorage.setItem('token', JSON.stringify(this.responsData.token));
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Authentication Successful',
          subTitle: 'Signed in successfully to OneMilMap Community',
          buttons: ['OK']
        });
        alert.present();
      
        console.log(resp);
      this.navCtrl.setRoot(MainPage);
      }


    }, (err) => {

     // this.navCtrl.push(MainPage);

      // Unable to login
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      let alert = this.alertCtrl.create({
        title: 'Authentication Failed',
        subTitle: 'Please Check Your Email or Password and try again',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  signup() {
    this.navCtrl.setRoot('UserTypePage');
  }
}
