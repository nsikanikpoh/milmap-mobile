import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
   msg:string = "Join the MilMap movement to impact the World";
   subj:string = "MilMap App";
   url:any;
   userDetails:any;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, public navParams: NavParams) {
    this.userDetails = JSON.parse(window.localStorage.getItem('userData'));
    this.url = this.userDetails.url;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }
  regularShare(){
    this.socialSharing.share(this.msg, this.subj, null, this.url);
  }
  whatsappShare(){
     this.socialSharing.shareViaWhatsApp(this.msg, this.subj, this.url);
   }
   twitterShare(){
     
    this.socialSharing.shareViaTwitter(this.msg, this.subj, this.url);
  }
  facebookShare(){
     this.socialSharing.shareViaFacebook(this.msg, this.subj, this.url);
   }
   

}
