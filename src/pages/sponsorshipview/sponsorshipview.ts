

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SponsorshipviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsorshipview',
  templateUrl: 'sponsorshipview.html',
})
export class SponsorshipviewPage {
  item:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = JSON.parse(window.localStorage.getItem('sponsorship'));
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SponsorshipviewPage');
  }

}

