import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the QuickdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quickd',
  templateUrl: 'quickd.html',
})
export class QuickdPage {
 item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = JSON.parse(window.localStorage.getItem('quickd'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickdPage');
  }

  startApp() {
    this.navCtrl.setRoot('WelcomePage');
  }


}
