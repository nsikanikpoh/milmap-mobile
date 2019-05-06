import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage, Reminder } from '../';


/**
 * Generated class for the DonationnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donationn',
  templateUrl: 'donationn.html',
})
export class DonationnPage {
  loading : any;
  responsData : any;
  userDetails : any;
  prospectData : any;
  account: { amount: number, camount: number, line: string, donator_id: number, reference: string} = {
    "amount": 0,
    "camount": 0,
    "line":"" ,
    "donator_id":0 ,
    "reference":""
  };
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController){
    this.userDetails = JSON.parse(window.localStorage.getItem('userData'));
    }
    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'please wait...'
      });
    
      this.loading.present();
    }

  ionViewDidLoad() {
   this.pdata();
  }

  pdata(){
    if(JSON.parse(window.localStorage.getItem('userData')).type == 'FundRaiser') {
      this.showLoader();
      this.user.myProspects().subscribe((resp: any) => {
        if (resp){
          this.prospectData = resp;
          this.loading.dismiss();     
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
          title: 'Failed to load prospects',
          buttons: ['OK']
        });

        alert.present();
      });
    }
    console.log('ionViewDidLoad DonationPage');
  }
  createRem() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(Reminder);
   
  }

  presentConfirm() {
    let arr = this.account
    if(this.account.camount > 0){
      arr.amount = this.account.camount;
    }
    else if(this.account.camount == 0){
      arr.amount = this.account.amount;
    }
    let alert = this.alertCtrl.create({
      title: 'Confirm Donation',
      message: 'Do you want to donate this amount? N'+arr.amount,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
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
  doRefresh(refresher) {
    this.pdata();
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  donate(){
    // Attempt to signup in through our User service
    if(this.account.camount > 0){
      let arr = this.account
      arr.amount = this.account.camount; 
      localStorage.setItem('paystack_new', JSON.stringify(arr));
      this.navCtrl.push("PaystackPage");
    }
    else if(this.account.camount == 0){
      localStorage.setItem('paystack_new', JSON.stringify(this.account));
      this.navCtrl.push("PaystackPage");
    }
    else{
      this.navCtrl.push("DonationnPage");
      let alert = this.alertCtrl.create({
        title: 'Error on form',
        subTitle: 'please select an amount or type any amount.',
        buttons: ['OK']
      }
  );
      alert.present();
    }
  }
 
}
