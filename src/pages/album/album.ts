import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Reminder } from '../';
/**
 * Generated class for the AlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-album',
  templateUrl: 'album.html',
})
export class AlbumPage {
  items: any;
  loading:any;
  galleryType = 'regular';
  constructor(public navCtrl: NavController, public navParams: NavParams, private photoViewer: PhotoViewer) {
    this.items = JSON.parse(window.localStorage.getItem('eDetails'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlbumPage');
  }

  preview(item){
    this.photoViewer.show('https://milmap.actionaid-ngr.org:3443/'+item.picture.url);
  }

  createCollage(){
    this.navCtrl.push("EventselectPage");
  }
  createRem() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(Reminder);
   
  }


}
