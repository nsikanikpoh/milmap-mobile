
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { Reminder } from '../';
/**
 * Generated class for the DonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymenthistory',
  templateUrl: 'paymenthistory.html',
})
export class  PaymenthistoryPage {
  loading : any;
  responsData : any;
 detail:any;

  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
     public loadingCtrl: LoadingController,
    public alertCtrl: AlertController){
      this.signupErrorString = "Unable to connect check your network connection";

    }
    
    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'please wait...'
      });
    
      this.loading.present();
    }
    createRem() {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.navCtrl.push(Reminder);
     
    }

    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
      this.ionViewDidLoad();
  
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }

    
  ionViewDidLoad() {
    this.showLoader();
    this.user.myDonations().subscribe((resp: any) => {
      if (resp){
        this.responsData = resp;
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Donation  Loaded Successful',
          subTitle: 'Go through your donations to The OneMilmap Project',
          buttons: ['OK']
        }
    );
       
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
        title: 'Failed to load donations',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  openItem(item){
    this.showLoader();
    this.user.querydonation(item.id).subscribe((resp: any) => {
      if (resp){
        this.detail = resp;
        localStorage.setItem('Donation', JSON.stringify(this.detail));
        this.navCtrl.push("DonationviewPage");
        this.loading.dismiss();
       
        console.log(resp);
      
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
        title: 'Failed to Load',
        subTitle: 'Please check your network conection and try again',
        buttons: ['OK']
      });
      alert.present();
    });

  }
 
}
