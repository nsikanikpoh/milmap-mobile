import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {LayoutPreviewComponent} from '../../components/layout-preview/layout-preview';

/**
 * Generated class for the CollagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collage',
  templateUrl: 'collage.html',
})
export class CollagePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollagePage');
  }

  onLayoutSelected(layoutUrl: string){
    this.navCtrl.push("EditcollagePage", {
      "layoutUrl": layoutUrl
    });
  }

}
