import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Welcome } from '../';

/**
 * Generated class for the ResetdonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetdone',
  templateUrl: 'resetdone.html',
})
export class ResetdonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetdonePage');
  }
  login(){
    this.navCtrl.setRoot(Welcome);
  }

}
