import { Component, ViewChild, OnInit, Renderer  } from '@angular/core';
import { IonicPage, NavController, Platform, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { User } from '../../providers';
import { CallNumber } from '@ionic-native/call-number';
import { Diagnostic } from '@ionic-native/diagnostic';
/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage implements OnInit{
  @ViewChild('fcontent') fcontent: any;
  @ViewChild('secontent') secontent: any;

  @ViewChild('tcontent') tcontent: any;

  @ViewChild('focontent') focontent: any;

  @ViewChild('ficontent') ficontent: any;

  @ViewChild('sicontent') sicontent: any;

  @ViewChild('scontent') scontent: any;
  @ViewChild('econtent') econtent: any;

  responsData: any;
  loading: any;
  detail :any;

  private signupErrorString: string;
  

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

  constructor(private diagnostic: Diagnostic, public platform:Platform, public render: Renderer, private callNumber: CallNumber, public alertCtrl: AlertController, public toastCtrl: ToastController, public user: User, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.responsData = JSON.parse(window.localStorage.getItem('uDetail'));
    this.signupErrorString = "Unable to connect check your network connection";
   
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
 

  callJoint(telephoneNumber) {
    this.platform.ready().then(() => { 

            this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.CALL_PHONE).then((status) => {
              console.log('Authorization Status');
              console.log(status);
              if (status != this.diagnostic.permissionStatus.GRANTED) {
                this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CALL_PHONE).then((data) => {
                  console.log('Authorization');
                  console.log(data);
                  this.callNumber.callNumber(telephoneNumber, true);
                })
              } else {
                console.log("We have the permission");
                this.callNumber.callNumber(telephoneNumber, true);
        
              }
            }, (statusError) => {
              console.log(`statusError`);
              console.log(statusError);
            });

    });
    
  } 


  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'please wait...'
    });
  
    this.loading.present();
  }


openItem(item){
  this.showLoader();
  this.user.profilequery(item.id).subscribe((resp: any) => {
    if (resp){
      this.responsData = resp;
      localStorage.setItem('uDetail', JSON.stringify(this.responsData));
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



}
