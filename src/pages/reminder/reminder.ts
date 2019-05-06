import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications';
//declare let LocalNotification: any;
/**
 * Generated class for the ReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
    data = { title:'', description:'', date:'', time:'' };
    scheduled =[];
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReminderPage');
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

  
 
  submit() {

    let sound;
    if (this.platform.is('android')) {
      sound = 'file://assets/sounds/handel_air.mp3'
    }else if(this.platform.is('ios')){
      sound =  'file://assets/sounds/handel_air.caf'
    } else {
      sound =  'file://assets/sounds/handel_air.mp3'
    }
 
    
            console.log(this.data);
            var date = new Date(new Date(Date.parse(this.data.date+" "+this.data.time)).getTime() + 5 * 1000);
            
            console.log(date);
            this.platform.ready().then(() => { 

           
                
               // this.trya();
                
                this.localNotifications.schedule({
                  id: 20,
                  title: 'Milmap Reminder',
                  text: 'Your Private Notification is now',
                  data: { mydata: 'Scheduled Personal Reminider' },
                  trigger: { at: date },
                  led: 'FF0000',
                  sound: sound
              });
            
              this.trya();
              this.recurringNotification();
              let alert = this.alertCtrl.create({
                title: 'Successful!',
                subTitle: 'Reminder setup set at '+date,
                buttons: ['OK']
              });
              alert.present();
              this.data = { title:'', description:'', date:'', time:'' }; 
               });
          
          }
        


   trya() {

             let sound;
              if (this.platform.is('android')) {
                sound = 'file://assets/sounds/handel_air.mp3'
              }else if(this.platform.is('ios')){
                sound =  'file://assets/sounds/handel_air.caf'
              } else {
                sound =  'file://assets/sounds/handel_air.mp3'
              }


                          this.localNotifications.schedule({
                         id: 23,
                            title: 'Milmap Reminder',
                            text: 'Milmap Regular Reminder',
                            trigger: { every: {hour:11, minute:50  } },
                            led: 'FF0000',
                            sound: sound
                        });
                          
              
          }

          recurringNotification() {
            let sound;
            if (this.platform.is('android')) {
              sound = 'file://assets/sounds/handel_air.mp3'
            }else if(this.platform.is('ios')){
              sound =  'file://assets/sounds/handel_air.caf'
            } else {
              sound =  'file://assets/sounds/handel_air.mp3'
            }
            this.localNotifications.schedule({
              id: 24,
              title: 'Recurring REMINDER',
              text: 'Your Recurring Notification',
              trigger: { every: ELocalNotificationTriggerUnit.MONTH },
              led: 'FF0000',
              sound: sound
            });
          }
         


          getAll(){
            this.platform.ready().then(() => { 
                
                this.localNotifications.getAll().then(res=>{
                  this.scheduled = res;
                });   
             
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
