import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, MenuController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import {Reminder, FirstRunPage, MainPage, Welcome, Eventp, EP} from '../pages';
import { Settings, User, Post } from '../providers';
import {  } from '../pages';
import {SuperTabs} from 'ionic2-super-tabs';
@Component({
  template: `<ion-menu [content]="content">
    <ion-header>
    <ion-toolbar>
        <ion-title>
        <button menuToggle left (click)="menuClicked()">
        <ion-icon name='menu'></ion-icon>
      </button>

      </ion-title>
     </ion-toolbar>
    </ion-header> 

    <ion-content class="bay" style="background-image: url('assets/imgs/ins.jpg')">
      <ion-refresher (ionRefresh)="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

        <ion-list margin-bottom padding-bottom>
      <section text-center class="profile-picture">
        <img src="https://milmap.actionaid-ngr.org:3443/{{this.userDetails?.image.url}}" class="profile-picture__image" alt="Profile Picture">
      </section>
      </ion-list>
  
      

      <ion-card class="bay6">
     
    
      
      <div *ngIf="userDetails?.type == 'Patriot'" >
      <ion-row>

      <ion-col style="float:right;">
       <div *ngIf="userDetails.interst_line_id === null; then thenTemplateName else elseTemplateName">
           Here is never showing
       </div>
       
       <ng-template #thenTemplateName>
           <button menuClose ion-item (click)=" interests()">Choose Interest Line</button>
     
       </ng-template>
       
       <ng-template #elseTemplateName>
       <ion-avatar text-rightt>
            <h2 style="color:#1b7ede; float:left;"> Interest Line</h2>
         <h2 style="color:#ea4335; float:left;">{{interest_line?.name}}</h2>
         </ion-avatar>
         </ng-template>

         </ion-col>
<ion-col style="color:orange; float:left;">
         <ion-avatar text-left>
         <h2 style="color:#34a853;">{{userDetails?.name}}</h2>
         <h2 style="color:#fabc05;">{{userDetails?.type}}</h2>
         </ion-avatar>
       </ion-col>
       </ion-row>
         </div>



         <div *ngIf="userDetails?.type == 'Champion' || userDetails?.type == 'Member' || userDetails?.type == 'FundRaiser' || userDetails?.type == 'Ambassador'" >
       
         <ion-avatar text-center>
         <div class="ion-text-center">
         <h2 style="color:#34a853;">{{userDetails?.name}}</h2>
         <h2 style="color:#fabc05;">{{userDetails?.type}}</h2>
       </div>
         </ion-avatar>
      
         </div>
   
       </ion-card>
           
    <div class="bay">
<ion-list  no-lines style="background: transparent !important; background-image: url('assets/imgs/app.jpg');">
    <button ion-item clear  style="background: transparent !important;" (click)="editP()">  <ion-icon style="color:#ea4335;" name="camera"></ion-icon> Upload Photo</button>


  
 <button ion-item clear  style="background: transparent !important;" (click)="dashboard()">  <ion-icon style="color:#fabc05;" name="home"></ion-icon> Dashboard</button>


 <button ion-item  style="background: transparent !important;" clear (click)="donation()">    <ion-icon style="color:#34a853;" name="card"></ion-icon> Make Donation </button>
       
  <button ion-item clear  style="background: transparent !important;" (click)="history()">  <ion-icon style="color:#4285f4;" name="timer"></ion-icon> Donation History </button>
       
  <button ion-item  style="background: transparent !important;" clear (click)="forum()">  <ion-icon style="color:#ea4335;" name="chatbubbles"></ion-icon> Forum </button>
       
  <button ion-item  style="background: transparent !important;" clear (click)="events()">  <ion-icon style="color:#fabc05;" name="image"></ion-icon> Pic Collage </button>

 
        <button ion-item  style="background: transparent !important;" clear (click)="notify()">    <ion-icon style="color:#34a853;" name="notifications"></ion-icon> Notifications </button>
       
  <button ion-item clear  style="background: transparent !important;" (click)="about()">  <ion-icon style="color:#4285f4;" name="information-circle"></ion-icon> About Us </button>
       
  <button ion-item  style="background: transparent !important;" clear (click)="faq()">  <ion-icon style="color:#ea4335;" name="help"></ion-icon> FAQs </button>
       
  <button ion-item  style="background: transparent !important;" clear (click)="profile()">  <ion-icon style="color:#fabc05;" name="person"></ion-icon> My Profile </button>

        <button ion-item  style="background: transparent !important;" clear (click)="createRem()">
          <ion-icon style="color:#34a853;" name="alarm"> </ion-icon> Schedule Reminder
        </button>

      

      <button ion-item  style="background: transparent !important;" clear (click)="logoutClicked()"> <ion-icon style="color:#4285f4;" name="power"></ion-icon> Logout</button>
      
    </ion-list>
    </div>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  userDetails: any;
  loading:any;
  interest_line:any;
 
  private loginErrorString: string = "Check your network connection";
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  @ViewChild(Nav) nav: Nav;
 

  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen, public menuCtrl: MenuController, 
    public user: User,

    public platforma: Platform,
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.checkPreviousAuthorization(); 
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
    });
    
    this.initTranslate();
    this.userDetails = JSON.parse(window.localStorage.getItem('userData'));
    
    this.interest_call();
  }

  interest_call(){
    if ((window.localStorage.getItem('email') === "undefined" || window.localStorage.getItem('email')  === null)){
    }else{
       if( JSON.parse(window.localStorage.getItem('userData')).type == 'Patriot' ){
       
      this.user.myInterest().subscribe((resp: any) => {
        if (resp){
            this.interest_line = resp;
    
        }
      }, (err) => {
    
        // this.navCtrl.push(MainPage);
     
         // Unable to sign up
         this.loading.dismiss();
         let toast = this.toastCtrl.create({
           message: this.loginErrorString,
           duration: 3000,
           position: 'top'
         });
         toast.present();
        
       });
  }
}
  }


  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
    
  }

 

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'Authenticating...'
    });
  
    this.loading.present();
  }


  logoutClicked() {
    console.log("Logout");
    this.showLoader();
    this.menuCtrl.close();
    window.localStorage.clear();
//  this.navCtrl.push(MainPage);
this.nav.setRoot(Welcome);
this.loading.dismiss();    
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.userDetails = JSON.parse(window.localStorage.getItem('userData'));
    this.interest_call();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  menuClicked() {
    this.menuCtrl.close();
  }

  interests(){
    this.nav.push("InterestlinesPage");
    
  }

  createRem() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push(Reminder);
   
  }



  editP() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push(EP);
   
  }

   dashboard() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.setRoot(MainPage);
   
  }



  notify() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('NotificationsPage');
   
  }

   about() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('ContactPage');
  }

  donation() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('DonationnPage');
  }

  history() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('PaymenthistorynPage');
  }
  forum() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('ForumnPage');
  }

  events() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('EventsnPage');
  }


   faq() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('FaqPage');
   
  }


   profile() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.menuCtrl.close();
    this.nav.push('ProfilePage');
   
  }


  checkPreviousAuthorization(): void{
    if ((window.localStorage.getItem('email') === "undefined" || window.localStorage.getItem('email')  === null) && 
  (window.localStorage.getItem('token') === "undefined" || window.localStorage.getItem('token') === null )){
    
    this.rootPage = FirstRunPage;
  } else {
    
  this.rootPage = MainPage;
}
  }
}
