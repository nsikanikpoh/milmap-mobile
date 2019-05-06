import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Layout } from '../../providers';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  loading : any;
  responsData : any;
  detail: any;
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: Layout,
    public toastCtrl: ToastController,
    public translateService: TranslateService, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController){
      this.signupErrorString = "Unable to connect check your network connection";

    }
    showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'please wait...'
      });
    
      this.loading.present();
    }

  ionViewDidLoad() {
    this.showLoader();
    this.user.events().subscribe((resp: any) => {
      if (resp){
        this.responsData = resp;
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Events Loaded Successful',
          subTitle: 'Go select events to view album.',
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
        title: 'Failed to load events',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  openEvent(item){
    this.showLoader();
    this.user.queryevent(item.id).subscribe((resp: any) => {
      if (resp){
        this.detail = resp;
        localStorage.setItem('eDetails', JSON.stringify(this.detail));
        this.navCtrl.push("AlbumPage");
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Album Loaded Successfully',
          buttons: ['OK']
        }
    );
        alert.present();  
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
