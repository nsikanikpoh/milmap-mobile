import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Post } from '../../providers/post/post';
/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {
  loading:any;
  comments: any;
  data:any;
  item:any;
  name:any;
  new_com:any = '';
  lastPaymentDate:any;
  account: { comment: string  } = {
      "comment": ""
    };
  
  signupErrorString: "Unable to connect check your network connection";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public forum: Post, 
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
   public alertCtrl: AlertController) {
    this.data = JSON.parse(window.localStorage.getItem('postDetails'));
    this.item = JSON.parse(window.localStorage.getItem('postDetails'));
    this.lastPaymentDate = this.item.created_at
   
  }

  
  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait...'
    });
  
    this.loading.present();
  }

  ionViewDidLoad(){
    this.showLoader();
    this.forum.getComments(this.data.id ).subscribe((resp: any) => {
      if (resp){
        this.comments = resp;
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
      
    });

    
  }

  comment(item){
    this.showLoader();
    this.forum.addComment(this.account, item.id ).subscribe((resp: any) => {
      if (resp){
        this.new_com = resp.body;
        let temp = JSON.parse(window.localStorage.getItem('userData'));
        this.name = temp.name;
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
      
    });

  }


}
