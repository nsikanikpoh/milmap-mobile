import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
/**
 * Generated class for the SponsorshipcreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsorshipcreate',
  templateUrl: 'sponsorshipcreate.html',
})
export class SponsorshipcreatePage {

  loading : any;
  responsData : any;
  prospectData : any;
  account: { amount: number, interest_line_id: number, reference:string} = {
    "amount": 0,
    "interest_line_id":0,
    "reference":"" 
  };

  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController){
    }
    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'please wait...'
      });
    
      this.loading.present();
    }

  ionViewDidLoad() {
      this.showLoader();
      this.user.interest_lines().subscribe((resp: any) => {
        
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
          title: 'Failed to load sponsorship areas',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Sponsorship',
      message: 'Do you want to sponsor with this amount? N'+this.account.amount,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.push(MainPage);
          }
        },
        {
          text: 'Sponsor',
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
