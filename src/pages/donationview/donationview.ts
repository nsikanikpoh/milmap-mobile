import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DonationviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donationview',
  templateUrl: 'donationview.html',
})
export class DonationviewPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = JSON.parse(window.localStorage.getItem('Donation'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DonationviewPage');
  }

}
