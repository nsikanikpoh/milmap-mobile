import { Component, ViewChild } from '@angular/core';
//import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController,  Platform, AlertController, LoadingController} from 'ionic-angular';
import { Reminder, Welcome} from '../';
import { Tab1Root, Tab2Root, Tab3Root, Tab4Root, Tab5Root } from '../';
import { SuperTabs } from 'ionic2-super-tabs';
import { User} from '../../providers';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  loading :any;
  Tab1Root:any = Tab1Root;
 Tab2Root:any = Tab2Root;
  Tab3Root:any = Tab3Root;
Tab4Root:any = Tab4Root;
Tab5Root:any = Tab5Root;
loginErrorString:string = "Please Check your Network Connection";
selectedTab = 0;
pages = [
  { pageName: Tab1Root, title: 'Home', icon: 'home', id: 'tab1Title'},
  { pageName: Tab2Root, title: 'Donate', icon: 'card', id: 'tab2Title'},
  { pageName: Tab3Root, title: 'History', icon: 'timer', id: 'tab3Title'},
  { pageName: Tab4Root, title: 'Forum', icon: 'chatbubbles', id: 'tab4Title'},
  { pageName: Tab5Root, title: 'Albums', icon: 'camera', id: 'tab5Title'}];
@ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(public navCtrl: NavController,  public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController,
    public user: User,
    public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {
      this.platform.ready().then((readySource) => {
        if(this.localNotifications.on('click')){
          (notification, state) => {
            let json = JSON.parse(notification.data);
   
            let alert = alertCtrl.create({
            title: notification.title,
             subTitle: json.mydata
           });
        alert.present();
    
        }
      
      }
    
    });
  //  translateService.get(['TAB1_TITLE', 'TAB2_TITLE', 'TAB3_TITLE', 'TAB4_TITLE', 'TAB5_TITLE']).subscribe(values => {
     
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
  
    this.loading.present();
  }

  
  onTabSelect(ev: any) {
    
      this.selectedTab = ev.index;
      this.superTabs.slideTo(ev);
      this.superTabs.clearBadge(this.pages[ev.index].id);
    
  }
  share(){
    this.navCtrl.push("SharePage");
  }

  createRem() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(Reminder);
   
  }

  logoutClicked() {
    console.log("Logout");
    this.showLoader();
    window.localStorage.clear();
//  this.navCtrl.push(MainPage);
this.navCtrl.setRoot(Welcome);
this.loading.dismiss();    
  }

  
}
