import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController,Platform, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { User } from '../../providers';
import {UserDetail} from '../'
import { CallNumber } from '@ionic-native/call-number';
import { Diagnostic } from '@ionic-native/diagnostic';

/**
 * Generated class for the DprospectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dprospects',
  templateUrl: 'dprospects.html',
})
export class DprospectsPage {
  loading : any;
  responsData : any;
  detail: any;
  private signupErrorString: string;
  constructor(private diagnostic: Diagnostic, public platform:Platform,  private callNumber: CallNumber, public navCtrl: NavController,
    public user: User,
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
    callJoint(telephoneNumber) {
      this.platform.ready().then(() => { 
  
              this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.CALL_PHONE).then((status) => {
                console.log('Authorization Status');
                console.log(status);
                if (status != this.diagnostic.permissionStatus.GRANTED) {
                  this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CALL_PHONE).then((data) => {
                    console.log('Authorization');
                    console.log(data);
                  })
                } else {
                  console.log("We have the permission");
                  this.callNumber.callNumber(telephoneNumber, true);
          
                }
              }, (statusError) => {
                console.log(`statusError`);
                console.log(statusError);
              });
  
      });
      
    } 
  ionViewDidLoad() {
    this.showLoader();
    this.user.donatedP().subscribe((resp: any) => {
      if (resp){
        this.responsData = resp;
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Prospects  Loaded Successful',
          subTitle: 'Go through your prospects.',
          buttons: ['OK']
        }
    );
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
        title: 'Failed to load prospects',
        buttons: ['OK']
      });
      alert.present();
    });
  }
  openProspect(item){
    this.showLoader();
    this.user.profilequery(item.id).subscribe((resp: any) => {
      if (resp){
        this.detail = resp;
        localStorage.setItem('uDetail', JSON.stringify(this.detail));
        this.navCtrl.push(UserDetail);
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Supporter Loaded Successfully',
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
  editProspect(item: any){
    
  }

}