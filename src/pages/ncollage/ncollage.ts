import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NcollagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ncollage',
  templateUrl: 'ncollage.html',
})
export class NcollagePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private inAppBrowser: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NcollagePage');
  }
  openpage(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.inAppBrowser.create('https://milmap.actionaid-ngr.org/collage/', '_self', options);
     
  }


}
