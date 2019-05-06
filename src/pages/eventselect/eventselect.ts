import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the EventselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-eventselect',
  templateUrl: 'eventselect.html',
})
export class EventselectPage {
images:any;
loading: any;
selected = [];
pics:any = [];
arr=[];
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public platform : Platform,  private inAppBrowser: InAppBrowser, private diagnostic: Diagnostic, public navCtrl: NavController, public navParams: NavParams) {
    this.images = JSON.parse(window.localStorage.getItem('eDetails'));
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventselectPage');
  
    
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'saving photos...'
    });
  
    this.loading.present();
  }

  goCollage(){
    console.log(this.selected);
    console.log(this.images);
    this.images.forEach((oldelement, oldindex)=>{
         this.selected.forEach((newelement, newindex)=>{
              if(oldindex === newindex && newelement === true){
                  this.pics.push(oldelement);
              }
      });
    });
    console.log(this.pics);
   localStorage.setItem('pics', JSON.stringify(this.pics));

   this.pics.forEach((element) => {
    let imageSource = "https://milmap.actionaid-ngr.org:3443/" + element.picture.url;
           this.arr.push(imageSource);
        }) ; 
      this.save();
  }

  public save(): void {

    this.platform.ready().then(() => { 

        this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.WRITE_EXTERNAL_STORAGE).then((status) => {
            console.log(`AuthorizationStatus`);
            console.log(status);
            if (status != this.diagnostic.permissionStatus.GRANTED) {
              this.diagnostic.requestRuntimePermission(this.diagnostic.permission.WRITE_EXTERNAL_STORAGE).then((data) => {
                console.log(`getCameraAuthorizationStatus`);
                console.log(data);
                this.oneSave()
              })
            } else {
              console.log("We have the permission");
              this.oneSave()
            }
          }, (statusError) => {
            console.log(`statusError`);
            console.log(statusError);
          });

    });

    }


oneSave(){
  this.showLoader();

  this.arr.forEach((dataUrl)=>{
     // file or remote URL. url can also be dataURL, but giving it a file path is much faster
  var album = 'Milmap';
  cordova.plugins.photoLibrary.saveImage(dataUrl, album, function (libraryItem) {}, function (err) {
  alert('Something went wrong on saving your collage pictures.'+err);
});

  });

  this.loading.dismiss();
     this.openpage(); 
}

openpage(){
  let alerta = this.alertCtrl.create({
    title: 'Done Processing Collage? check your Gallery',
    buttons: ['OK']
  });  
  const options: InAppBrowserOptions = {
    zoom: 'yes',
    location:'no',
    closebuttoncaption: 'Cerrar',
    toolbar: 'yes',
    enableViewportScale: 'yes'
  }
  const browser = this.inAppBrowser.create('https://milmap.actionaid-ngr.org/collage/', '_system', options);
  browser.insertCSS({code:"body{background-color:#ff0000;}"});

  alerta.present();

}



}
