import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Post } from '../../providers/post/post';
import { PostDetail, Reminder } from '../';

/**
 * Generated class for the ForumnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forumn',
  templateUrl: 'forumn.html',
})
export class ForumnPage {

  data: any;
  loading:any;
  detail: any;
  signupErrorString: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public forum: Post,  public toastCtrl: ToastController,
     public loadingCtrl: LoadingController,
     public alertCtrl: AlertController) {
      this.signupErrorString = "Unable to connect check your network connection";
      
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait..'
    });
  
    this.loading.present();
  }
  showload(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait..'
    });
  
    this.loading.present();
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  ionViewDidLoad(){
    console.log('ionViewDidLoad ForumPage');
    this.showLoader();
    this.forum.getPosts().subscribe((resp: any) => {
      if (resp){
        this.data = resp;
        this.loading.dismiss();
       
      
      }


    }, (err) => {

     // this.navCtrl.push(MainPage);

      // Unable to sign up
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      let alert = this.alertCtrl.create({
        title: 'Failed to connect to Forum',
        subTitle: 'Please check your network connection',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  openItem(item){
    this.showload();
    this.forum.query(item.id).subscribe((resp: any) => {
      if (resp){
        this.detail = resp;
        localStorage.setItem('postDetails', JSON.stringify(this.detail));
        this.navCtrl.setRoot(PostDetail);
        this.loading.dismiss();
       
        console.log(resp);
      
      }


    }, (err) => {

     // this.navCtrl.push(MainPage);

      // Unable to sign up
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      let alert = this.alertCtrl.create({
        title: 'Failed to Load',
        subTitle: 'Please check your network conection and try again',
        buttons: ['OK']
      });
      alert.present();
    });

  }
  createRem() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(Reminder);
   
  }
  addPost() {
    let addModal = this.modalCtrl.create('PostCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.forum.add(item);
      }
    })
    addModal.present();
  }
 

}
