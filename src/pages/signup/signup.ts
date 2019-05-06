import { Component, OnInit  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainPage } from '../';
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage implements OnInit{
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  signinform: FormGroup;
  loading : any;
  responsData : any;
  account: { name: string, email: string, password: string,password_confirmation: string, location:string,
  phone:string, gender:string, address:string, state:string  } = {
    "name": "",
    "email": "",
    "password": "",
    "password_confirmation": "",
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

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait...'
    });
  
    this.loading.present();
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    let TELPATTERN = /^[0-9\/]*$/i;
    this.signinform = new FormGroup({
     password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
     password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
     email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(TELPATTERN), Validators.minLength(11), Validators.maxLength(13)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*.+[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      gender: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    });

  }


  doSignup() {
    // Attempt to signup in through our User service
    this.showLoader();
    this.user.signup(this.account).subscribe((resp: any) => {
      if (resp){
        this.responsData = resp;
        localStorage.setItem('userData', JSON.stringify(this.responsData));
        localStorage.setItem('email', JSON.stringify(this.responsData.email));
        localStorage.setItem('token', JSON.stringify(this.responsData.token));
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Registration Successful',
          subTitle: 'Great! Your registration is success',
          buttons: ['OK']
        }
    );
        alert.present();
        console.log(resp);
      this.navCtrl.setRoot(MainPage);
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
        subTitle: 'Oh no! Your registration is failed',
        buttons: ['OK']
      });
      alert.present();
    });
  }
 


  login() {
    this.navCtrl.setRoot('WelcomePage');
  }

}
