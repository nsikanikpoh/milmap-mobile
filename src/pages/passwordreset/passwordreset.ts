import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../providers/user/user';
import { Welcome } from '../';


/**
 * Generated class for the PasswordresetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage implements OnInit{
  signinform: FormGroup;
  loading : any;
  responsData : any;
  account: { email:''}={
    "email": ""
  };
  private loginErrorString: string = "Check your network connection";
  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signinform = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });

  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });
  
    this.loading.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordresetPage');
  }
  passwordreset() {

    this.showLoader();
    this.user.resetpassword(this.account).subscribe((resp) => {
      if (resp){
        this.responsData = resp;
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Password Reset Successful',
          buttons: ['OK']
        });
        alert.present();
      
        console.log(resp);
      this.navCtrl.push("ResetdonePage");
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
        title: 'Password Reset Failed',
        subTitle: 'Please Check Your Email and try again',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  signup() {
    this.navCtrl.push('UserTypePage');
  }

  login(){
    this.navCtrl.push(Welcome);
  }

}
