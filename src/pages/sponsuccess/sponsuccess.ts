import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SponsuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsuccess',
  templateUrl: 'sponsuccess.html',
})
export class SponsuccessPage {
 item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = JSON.parse(window.localStorage.getItem('spon'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SponsuccessPage');
  }

}
