import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { Reminder, Welcome } from '../';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the QuickDonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quick-donation',
  templateUrl: 'quick-donation.html',
})
export class QuickDonationPage implements OnInit{
  signinform: FormGroup;
  loading:any;
  responsData : any;
  userDetails : any;
  prospectData : any;
  account: { amount: number, email: string, tel: string, name:string, reference:string } = {
    "amount": 0,
    "email":"" ,
    "tel":"",
    "name":"",
    "reference":"" 
  };

  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController){
     
    }

    ngOnInit() {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  
      let TELPATTERN = /^[0-9\/]*$/i;
      
      this.signinform = new FormGroup({
       password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        amount: new FormControl('', [Validators.required]),
        tel: new FormControl('', [Validators.required, Validators.pattern(TELPATTERN), Validators.minLength(11), Validators.maxLength(13)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*.+[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
     
      });
  
    }

    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'please wait...'
      });
    
      this.loading.present();
    }

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad DonationPage');
  }

  createRem() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(Reminder);
   
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Donation',
      message: 'Do you want to donate this amount? N'+this.account.amount,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.push(Welcome);
          }
        },
        {
          text: 'Donate',
          handler: () => {
            this.donate()
          }
        }
      ]
    });
    alert.present();
  }

  donate(){
    // Attempt to signup in through our User service
    localStorage.setItem('paystack_new', JSON.stringify(this.account));
    this.navCtrl.push("PaystackPage");
  }
 
}
