import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { IonicPage, App, MenuController, Platform, NavController, ToastController, AlertController, LoadingController  } from 'ionic-angular';

import { CreateProspect, UserDetail, Reminder} from '../';
import { User } from '../../providers';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('content') content: any;
  @ViewChild('fcontent') fcontent: any;
  @ViewChild('secontent') secontent: any;

  @ViewChild('tcontent') tcontent: any;

  @ViewChild('focontent') focontent: any;

  @ViewChild('ficontent') ficontent: any;

  @ViewChild('sicontent') sicontent: any;

  @ViewChild('scontent') scontent: any;
  @ViewChild('econtent') econtent: any;

interest_line:any;
active = true;
  active1 = true;
 email: any;
 token : any;
 //name: any;
  userDetails : any[];
  detail: any;
  loading : any;
  responsData : any;
  paymentData: any;
  paymentAmount = [];
  paymentDate = [];
  dueDay = 0;
  lastPaymentDate: any;
  totalDonation = 0;
  private signupErrorString: string;
  lineChart: any;
  pNumber:any;
  pConverted:any;
  fTotal:any;
  fundAmount = 0;
  accordionExapanded = false;
  faccordionExapanded = false;
  icon: string = "arrow-down";
  fimage: string = "assets/imgs/1st_generation.png";


  seaccordionExapanded = false;
  seimage: string = "assets/imgs/2nd_generation.png";

  taccordionExapanded = false;
  timage: string = "assets/imgs/3rd_generation.png";


  foaccordionExapanded = false;
  foimage: string = "assets/imgs/4th_generation.png";


  fiaccordionExapanded = false;
  fiimage: string = "assets/imgs/5th_generation.png";


  siaccordionExapanded = false;
  siimage: string = "assets/imgs/6th_generation.png";


  saccordionExapanded = false;
  simage: string = "assets/imgs/7th_generation.png";


  eaccordionExapanded = false;
  eimage: string = "assets/imgs/8th_generation.png";

  constructor(public render: Renderer, public navCtrl: NavController, public app: App, 
    public menuCtrl: MenuController, public user: User,  public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {
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
    this.signupErrorString = "Unable to connect check your network connection";
    this.email = JSON.parse(window.localStorage.getItem('email'));
    this.token = JSON.parse(window.localStorage.getItem('token'));
    this.userDetails = JSON.parse(window.localStorage.getItem('userData'));
    if(JSON.parse(window.localStorage.getItem('userData')).type == 'FundRaiser'){
      this.fundFunctions();
    }
    this.doad();
    
  }
 ngOnInit(){
  
 }

 fdoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

sedoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}


tdoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

fodoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

fidoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
   
    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

sidoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

sdoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
  

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}

edoInfinite(infiniteScroll) {
  console.log('Begin async operation');

  setTimeout(() => {
    

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 500);
}


flattoggleSection() {
  if(this.accordionExapanded){
      this.render.setElementStyle(this.content.nativeElement, "max-height", "0px");
      this.render.setElementStyle(this.content.nativeElement, "padding", "0px 16px");
  }else{
    this.render.setElementStyle(this.content.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

    this.render.setElementStyle(this.content.nativeElement, "max-height", "1000px");
    this.render.setElementStyle(this.content.nativeElement, "padding", "13px 16px");  
  }
  this.accordionExapanded = !this.accordionExapanded;
  this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
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

   ftoggleSection() {
        if(this.faccordionExapanded){
            this.render.setElementStyle(this.fcontent.nativeElement, "max-height", "0px");
            this.render.setElementStyle(this.fcontent.nativeElement, "padding", "0px 16px");
        }else{
          this.render.setElementStyle(this.fcontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");
 
          this.render.setElementStyle(this.fcontent.nativeElement, "max-height", "1000px");
          this.render.setElementStyle(this.fcontent.nativeElement, "padding", "13px 16px");  
        }
        this.faccordionExapanded = !this.faccordionExapanded;
        this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
        this.fimage = this.fimage == "assets/imgs/1st_generation.png" ? "assets/imgs/1st_generation_hover.png" : "assets/imgs/1st_generation.png";
    }

    setoggleSection() {
      if(this.seaccordionExapanded){
          this.render.setElementStyle(this.secontent.nativeElement, "max-height", "0px");
          this.render.setElementStyle(this.secontent.nativeElement, "padding", "0px 16px");
      }else{
        this.render.setElementStyle(this.secontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

        this.render.setElementStyle(this.secontent.nativeElement, "max-height", "1000px");
        this.render.setElementStyle(this.secontent.nativeElement, "padding", "13px 16px");  
      }
      this.seaccordionExapanded = !this.seaccordionExapanded;
      this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
      this.seimage = this.seimage == "assets/imgs/2nd_generation.png" ? "assets/imgs/2nd_generation_hover.png" : "assets/imgs/2nd_generation.png";
  }

  ttoggleSection() {
    if(this.taccordionExapanded){
        this.render.setElementStyle(this.tcontent.nativeElement, "max-height", "0px");
        this.render.setElementStyle(this.tcontent.nativeElement, "padding", "0px 16px");
    }else{
      this.render.setElementStyle(this.tcontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

      this.render.setElementStyle(this.tcontent.nativeElement, "max-height", "1000px");
      this.render.setElementStyle(this.tcontent.nativeElement, "padding", "13px 16px");  
    }
    this.taccordionExapanded = !this.taccordionExapanded;
    this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
    this.timage = this.timage == "assets/imgs/3rd_generation.png" ? "assets/imgs/3rd_generation_hover.png" : "assets/imgs/3rd_generation.png";
}

fotoggleSection() {
  if(this.foaccordionExapanded){
      this.render.setElementStyle(this.focontent.nativeElement, "max-height", "0px");
      this.render.setElementStyle(this.focontent.nativeElement, "padding", "0px 16px");
  }else{
    this.render.setElementStyle(this.focontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

    this.render.setElementStyle(this.focontent.nativeElement, "max-height", "1000px");
    this.render.setElementStyle(this.focontent.nativeElement, "padding", "13px 16px");  
  }
  this.foaccordionExapanded = !this.foaccordionExapanded;
  this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
  this.foimage = this.foimage == "assets/imgs/4th_generation.png" ? "assets/imgs/4th_generation_hover.png" : "assets/imgs/4th_generation.png";
}
fitoggleSection() {
  if(this.fiaccordionExapanded){
      this.render.setElementStyle(this.ficontent.nativeElement, "max-height", "0px");
      this.render.setElementStyle(this.ficontent.nativeElement, "padding", "0px 16px");
  }else{
    this.render.setElementStyle(this.ficontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

    this.render.setElementStyle(this.ficontent.nativeElement, "max-height", "1000px");
    this.render.setElementStyle(this.ficontent.nativeElement, "padding", "13px 16px");  
  }
  this.fiaccordionExapanded = !this.fiaccordionExapanded;
  this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
  this.fiimage = this.fiimage == "assets/imgs/5th_generation.png" ? "assets/imgs/5th_generation_hover.png" : "assets/imgs/5th_generation.png";
}

sitoggleSection() {
  if(this.siaccordionExapanded){
      this.render.setElementStyle(this.sicontent.nativeElement, "max-height", "0px");
      this.render.setElementStyle(this.sicontent.nativeElement, "padding", "0px 16px");
  }else{
    this.render.setElementStyle(this.sicontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

    this.render.setElementStyle(this.sicontent.nativeElement, "max-height", "1000px");
    this.render.setElementStyle(this.sicontent.nativeElement, "padding", "13px 16px");  
  }
  this.siaccordionExapanded = !this.siaccordionExapanded;
  this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
  this.siimage = this.siimage == "assets/imgs/6th_generation.png" ? "assets/imgs/6th_generation_hover.png" : "assets/imgs/6th_generation.png";
}

stoggleSection() {
  if(this.saccordionExapanded){
      this.render.setElementStyle(this.scontent.nativeElement, "max-height", "0px");
      this.render.setElementStyle(this.scontent.nativeElement, "padding", "0px 16px");
  }else{
    this.render.setElementStyle(this.scontent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

    this.render.setElementStyle(this.scontent.nativeElement, "max-height", "1000px");
    this.render.setElementStyle(this.scontent.nativeElement, "padding", "13px 16px");  
  }
  this.saccordionExapanded = !this.saccordionExapanded;
  this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
  this.simage = this.simage == "assets/imgs/7th_generation.png" ? "assets/imgs/7th_generation_hover.png" : "assets/imgs/7th_generation.png";
}

etoggleSection() {
  if(this.eaccordionExapanded){
      this.render.setElementStyle(this.econtent.nativeElement, "max-height", "0px");
      this.render.setElementStyle(this.econtent.nativeElement, "padding", "0px 16px");
  }else{
    this.render.setElementStyle(this.econtent.nativeElement, "webkitTransition", "max-height 500ms, padding 50ms");

    this.render.setElementStyle(this.econtent.nativeElement, "max-height", "1000px");
    this.render.setElementStyle(this.econtent.nativeElement, "padding", "13px 16px");  
  }
  this.eaccordionExapanded = !this.eaccordionExapanded;
  this.icon = this.icon == "arrow-down" ? "arrow-up" : "arrow-down";
  this.eimage = this.eimage == "assets/imgs/8th_generation.png" ? "assets/imgs/8th_generation_hover.png" : "assets/imgs/8th_generation.png";
}

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait...'
    });
  
    this.loading.present();
  }

  dateFormatter(date){
    return new Date(date);
  }

  doad() {

    if(JSON.parse(window.localStorage.getItem('userData')).type == 'Member'  || JSON.parse(window.localStorage.getItem('userData')).type == 'Champion' || JSON.parse(window.localStorage.getItem('userData')).type == 'Patriot' || JSON.parse(window.localStorage.getItem('userData')).type == 'Ambassador'){
      this.user.myDonations().subscribe((resp: any) => {
        if (resp){
            this.paymentData = resp;
            this.paymentData.forEach(element => {
            this.paymentAmount.push( element.amount);
            this.paymentDate.push(element.created_at.substr(5).slice(0, -17)+"-"+element.created_at.slice(0, -20)); 
            });
            this.dueDate();
     }
  
    }
      );
  
  
    }
    
}

dueDate(){
  if (this.paymentData ){
  let today = new Date();
  let lastDonation  = this.paymentData.slice(-1)[0];
  this.paymentAmount.forEach(element => {this.totalDonation +=element
  });
  if(lastDonation){
    this.lastPaymentDate = lastDonation.created_at.slice(0, -14);
  let expireDate = lastDonation.expires_on
  var a = moment(today,'M/D/YYYY');
  var b = moment(expireDate);
  var diffDays = b.diff(a, 'days');
  this.dueDay = diffDays + 1;

  }else{
  
  }
}
}


ionViewDidLoad() {
  this.showLoader();
  
  this.user.myDashboard().subscribe((resp: any) => {
    if (resp){
      this.responsData = resp;
      this.loading.dismiss();
    }
    
    if(JSON.parse(window.localStorage.getItem('userData')).type == 'Member'  || JSON.parse(window.localStorage.getItem('userData')).type == 'Champion' || JSON.parse(window.localStorage.getItem('userData')).type == 'Patriot' || JSON.parse(window.localStorage.getItem('userData')).type == 'Ambassador'){
      
      

      this.canvass();
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

relo(){
  
  this.user.myDashboard().subscribe((resp: any) => {
    if (resp){
      this.responsData = resp;
      this.loading.dismiss();
    }
    
    if(JSON.parse(window.localStorage.getItem('userData')).type == 'Member'  || JSON.parse(window.localStorage.getItem('userData')).type == 'Champion' || JSON.parse(window.localStorage.getItem('userData')).type == 'Patriot' || JSON.parse(window.localStorage.getItem('userData')).type == 'Ambassador'){
      this.canvass();
    }
   

  }, (err) => {

   // this.navCtrl.push(MainPage);

    // Unable to sign up
  
    let toast = this.toastCtrl.create({
      message: this.signupErrorString,
      duration: 3000,
      position: 'top'
    });
    toast.present();
   
  });
}
 fundFunctions(){
   this.totalP();
   this.totalC();
   this.amountRaised();
 }

totalP(){
  this.user.myProspects().subscribe((resp: any) => {
    if (resp){
      this.pNumber = resp;
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
      title: 'Failed to load prospects',
      buttons: ['OK']
    });
    alert.present();
  });


}

totalC(){
  this.user.donatedP().subscribe((resp: any) => {
    if (resp){
      this.pConverted = resp;
    
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
      title: 'Failed to load prospects',
      buttons: ['OK']
    });
    alert.present();
  });
}

amountRaised(){
  this.user.fundTotal().subscribe((resp: any) => {
    if (resp){
      this.fTotal = resp;
      this.fTotal.forEach(element => {
      this.fundAmount += element.amount;
       });
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
      title: 'Failed to load prospects',
      buttons: ['OK']
    });
    alert.present();
  });
}

canvass(){
  this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
    type: 'line',
    data: {
        labels: this.paymentDate,
        datasets: [
            {
                label: "Donation Flow",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor:  "rgba(256,0,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(256,0,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor:  "rgba(256,0,0,1)",
                pointHoverBorderColor:  "rgba(256,0,0,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.paymentAmount,
                spanGaps: false,
            }
        ]
    }

});
}


openItem(item){
  this.showLoader();
  this.user.profilequery(item.id).subscribe((resp: any) => {
    if (resp){
      this.detail = resp;
      localStorage.setItem('uDetail', JSON.stringify(this.detail));
      this.navCtrl.push(UserDetail);
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
    
  });

}

  openPage() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push("MyProspectsPage");
   
  }

  donate() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push("DprospectsPage");
   
  }

  createSponsorship(){
    this.navCtrl.push("SponsorshipcreatePage");
  
  }

  opportunity() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push("OprospectsPage");
   
  }

  contact() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push("MyProspectsPage");
   
  }
  
prospect() {
  console.log("prospect");
  this.navCtrl.push(CreateProspect);
}


mySponsorships(){
  this.navCtrl.push("MysponsorshipsPage");

}

interests(){
  this.navCtrl.push("InterestlinesPage");
  
}

createRem() {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.navCtrl.push(Reminder);
 
}


doRefresh(refresher) {
  this.paymentAmount = [];
  if(JSON.parse(window.localStorage.getItem('userData')).type == 'FundRaiser'){
    this.fundFunctions();
  }
  this.relo();
  this.doad(); // calls the getQuotes method
  setTimeout(() => {
    refresher.complete(); // stops the refresher 2 seconds after retreiving the Data
  }, 2000);
}
}
