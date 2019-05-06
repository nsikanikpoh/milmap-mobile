import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications, ILocalNotification} from '@ionic-native/local-notifications';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare let LocalNotification: any;
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})

export class NotificationsPage {

  notes:any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {
    this.platform.ready().then(() => {
      this.localNotifications.on('click').subscribe(notification => {
       console.log('clicked: ', notification);
       let msg = notification.data ? notification.data.mydata:'';
       this.showAlert(notification.title, notification.text, msg);
   
     });
 
     this.localNotifications.on('triger').subscribe(notification => {
       console.log('trigger: ', notification);
       let msg = notification.data ? notification.data.mydata:'';
       this.showAlert(notification.title, notification.text, msg);
 
   });
 });
  }

  showAlert(header, sub, msg){
    let alert =  this.alertCtrl.create({
       title: header,
       subTitle: sub,
       message: msg,
       buttons: ['OK']
     })
     alert.present();
   }
 
  ionViewDidLoad() {
    this.platform.ready().then(() => { 
      this.localNotifications.getAll().then((res: ILocalNotification[]) => {
        this.notes = res;
      }) 
  
    });
  }


  cancelAll(){
    this.platform.ready().then(() => { 
        
        this.localNotifications.cancelAll();   
        let alert = this.alertCtrl.create({
          title: 'Reminders cancelled',
          buttons: ['Ok']
      });
          alert.present();
        }); 




  }


}
