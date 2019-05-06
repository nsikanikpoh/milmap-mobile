import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';
/**
 * Generated class for the InterestlinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-interestlines',
  templateUrl: 'interestlines.html',
})
export class InterestlinesPage {
  data: any;
  detail:any;
  loading:any;
  signupErrorString: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public user: User,  public toastCtrl: ToastController,
     public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.signupErrorString = "Unable to connect check your network connection";
      
  }
  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait..'
    });
  
    this.loading.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestlinesPage');
    this.showLoader();
    this.user.interests().subscribe((resp: any) => {
      if (resp){
        this.data = resp;
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
        title: 'Failed to load Interest Lines',
        subTitle: 'Please check your network connection',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  addinterest(item){
    this.showLoader();
    this.user.addinterest(item.id).subscribe((resp: any) => {
      if (resp){
        this.detail = resp;
        localStorage.setItem('userData', JSON.stringify(this.detail));
        this.navCtrl.setRoot(MainPage);
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'You have successfully Choosed an Interest Lines',
          subTitle: 'You can choose any other interest at any time',
          buttons: ['OK']
        });
        alert.present();
       
      
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
        title: 'Failed to load Interest Lines',
        subTitle: 'Please check your network connection',
        buttons: ['OK']
      });
      alert.present();
    });

  }

}
