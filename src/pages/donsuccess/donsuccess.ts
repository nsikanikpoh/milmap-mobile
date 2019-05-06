import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DonsuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donsuccess',
  templateUrl: 'donsuccess.html',
})
export class DonsuccessPage {
item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = JSON.parse(window.localStorage.getItem('donsuccess'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonsuccessPage');
  }

}
