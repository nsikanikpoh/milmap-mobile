import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController, AlertController, LoadingController  } from 'ionic-angular';

import { User } from '../../providers';
import { CallNumber } from '@ionic-native/call-number';
import { Diagnostic } from '@ionic-native/diagnostic';
@IonicPage()
@Component({
  selector: 'page-prospect',
  templateUrl: 'prospect.html',
})
export class ProspectPage {
  item: any;
  loading:any;
  comments: any = [];
  data:any;
  name:any;
  new_com:any = '';
  account: { comment: string  } = {
      "comment": ""
    };
  
  signupErrorString: "Unable to connect check your network connection";
  constructor(private diagnostic: Diagnostic,  private callNumber: CallNumber, public platform:Platform,public navCtrl: NavController, public user: User,  public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    this.item = JSON.parse(window.localStorage.getItem('pDetails'));
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
                  this.callNumber.callNumber(telephoneNumber, true);
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
    this.user.getComments(this.item.id ).subscribe((resp: any) => {
      if (resp){
        let temp = JSON.parse(window.localStorage.getItem('userData'));
        this.comments = resp;
        this.name = temp.name;
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
      
    });

    
  }

  comment(item){
    this.showLoader();
    this.user.addComment(this.account, item.id ).subscribe((resp: any) => {
      if (resp){
        this.new_com = resp.body;
        this.loading.dismiss();
        
        
        console.log(resp);
      
      }


    }, (err) => {

   

      // Unable to sign up
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      
    });

  }

  doOpptunity(id){
    this.showLoader();
    this.user.prospectopportunity(id).subscribe((resp: any) => {
    if (resp){
      this.item = resp;
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
    
  });

  }
  
}




