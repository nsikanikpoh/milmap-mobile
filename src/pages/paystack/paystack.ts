
import { Component, ViewChild  } from '@angular/core';

import {IonicPage,  LoadingController,  NavController, AlertController,ToastController, ViewController,  Platform,  NavParams  } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { User } from '../../providers';

declare let PaystackPlugin: any;

@IonicPage()
@Component({

  selector: 'page-paystack',

  templateUrl: 'paystack.html'

})

export class PaystackPage {

  @ViewChild("card_number") card_number;

  @ViewChild("expiryMonth") expiryMonth;

  @ViewChild("expiryYear") expiryYear;

  @ViewChild("cvc") cvc;

customerEmail:any;
loader2:any;

price:any;

chargeAmount:any;

cardNumberValue: any;

expiryMonthValue: any;

expiryYearValue: any;
email: any;
cvcValue: any;
res:any;
responsData:any;
private signupErrorString: string;
  constructor(private iab: InAppBrowser,public user: User,  public toastCtrl: ToastController, public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,   public loading: LoadingController,  public platform: Platform, public viewCtrl: ViewController) {
    this.signupErrorString = "Unable to connect check your network connection";
  }

ngOnInit(){
  this.res = JSON.parse(window.localStorage.getItem('paystack_new'));
  if(JSON.parse(window.localStorage.getItem('email'))){
    this.email = JSON.parse(window.localStorage.getItem('email'));
  }else
  {
    this.email = this.res.email

  }
  this.price= this.res.amount
  this.chargeAmount = this.price*100;

}

  ChargeCard(){
    let card = this.card_number.value;

    let month = this.expiryMonth.value;

    let cvc = this.cvc.value;

    let year = this.expiryYear.value;

    let amount = this.chargeAmount;

    let email = this.email;

    console.log(card);

    console.log(month);

    console.log(cvc);

    console.log(year);

    console.log(amount);

    console.log(email);

    let loader = this.loading.create({

      content: 'Processing Payment…'

    });
    loader.present();

        this.platform.ready().then(() => {

          // Now safe to use device APIs
            console.log("paystack");
           PaystackPlugin.chargeCard(

                (resp) =>{
                console.log(resp);
                     loader.dismiss();
                     this.loader2 = this.loading.create({

                      content: 'completing payment…'
          
                       });
                      this.loader2.present();
            
                      if(JSON.parse(window.localStorage.getItem('email'))){
                            if(this.res.donator_id){
                                 this.fundrpay(resp);
                            }
                            else if(this.res.interest_line_id){
                                          this.sponsor(resp);
                                }
                                
                              else{
                                  this.don(resp);
                             
                              }
                        }
                        else
                           {
                               
                                this. qdon(resp);
                          

                            }

                              //this.pop.showPayMentAlert(“Payment Was Successful”, “We will Now Refund Your Balance”);

                                    console.log('charge successful: ', resp);

                             },

                        (resp) =>{

                               loader.dismiss();

                              alert('We Encountered An Error While Charging Your Card' )

                           },

                     {
                 cardNumber: card,

              expiryMonth: month,

              expiryYear: year,

              cvc: cvc,

              email: email,

              amountInKobo: amount,
          })

      })
  }

  fundrpay(resp){
 
    let arr = this.res
    arr.reference = resp.reference; 
    this.user.fundpay(arr).subscribe((rp: any) => {
    if (rp){
            this.responsData = rp;
            localStorage.setItem('donsuccess', JSON.stringify(this.responsData));
          
            let alert = this.alertCtrl.create({
            title: 'Payment was Successful',
            subTitle: 'Thanks for your donation to The Milmap Project',
             buttons: ['OK']
            }
            );
            this.loader2.dismiss();
            this.navCtrl.push("DonsuccessPage");
            alert.present();
              console.log(resp);

            }


     }, (err) => {


            this.loader2.dismiss();
            let toast = this.toastCtrl.create({
             message: this.signupErrorString,
             duration: 3000,
             position: 'top'
             });
             toast.present();
            let alert = this.alertCtrl.create({
             title: 'Payment was Successful',
              subTitle: 'Here is transaction ref: '+resp.reference,
             buttons: ['OK']
               });
              alert.present();
               });
  }

  sponsor(resp){
  
    let arr = this.res
      arr.reference = resp.reference
      this.user.sponsor(arr).subscribe((rp: any) => {
       if (rp){
                   this.responsData = rp;
                   localStorage.setItem('spon', JSON.stringify(this.responsData));
                     
                      let alert = this.alertCtrl.create({
                     title: 'Payment was Successful',
                     subTitle: 'Thanks for Sponsoring The Milmap Project',
                     buttons: ['OK']
                     }
                         );
                     this.loader2.dismiss();
                      this.navCtrl.push("SponsuccessPage");
                    alert.present();
                  console.log(resp);
                   }
            
                      }, (err) => {
                     this.loader2.dismiss();
                     let toast = this.toastCtrl.create({
                     message: this.signupErrorString,
                     duration: 3000,
                       position: 'top'
                                    });
                       toast.present();
                        let alert = this.alertCtrl.create({
                         title: 'Payment Was Successful',
                          subTitle: 'Here is transaction ref: '+resp.reference,
                             buttons: ['OK']
                               });
                             alert.present();
                            });

  }

  don(resp){
 
    let arr = this.res
    arr.reference = resp.reference;
this.user.pay(arr).subscribe((rp: any) => {
  if (rp){
    this.responsData = rp;
    localStorage.setItem('donsuccess', JSON.stringify(this.responsData));
  
    let alert = this.alertCtrl.create({
      title: 'Payment was Successful',
      subTitle: 'Thanks for your donation to The Milmap Project',
      buttons: ['OK']
    }
);
this.loader2.dismiss();
this.navCtrl.push("DonsuccessPage");
    alert.present();
    console.log(resp);
  
  }

}, (err) => {

 // this.navCtrl.push(MainPage);

  // Unable to sign up
  this.loader2.dismiss();
  let toast = this.toastCtrl.create({
    message: this.signupErrorString,
    duration: 3000,
    position: 'top'
  });
  toast.present();
  let alert = this.alertCtrl.create({
    title: 'Payment was Successful',
    subTitle: 'Here is transaction ref: '+resp.reference,
    buttons: ['OK']
  });
  alert.present();
});


  }

  qdon(resp){

    let arr = this.res
    arr.reference = resp.reference;
  this.user.payquick(arr).subscribe((rp: any) => {
    if (rp){
      this.responsData = rp;
      localStorage.setItem('quickd', JSON.stringify(this.responsData));
    
      let alert = this.alertCtrl.create({
        title: 'Payment was Successful',
        subTitle: 'Thanks for your donation to The Milmap Project',
        buttons: ['OK']
      }
  );
  this.loader2.dismiss();
  this.navCtrl.push("QuickdPage");
      alert.present();
      console.log(resp);
    
    }

  }, (err) => {

   // this.navCtrl.push(MainPage);

    // Unable to sign up
    this.loader2.dismiss();
    let toast = this.toastCtrl.create({
      message: this.signupErrorString,
      duration: 3000,
      position: 'top'
    });
    toast.present();
    let alert = this.alertCtrl.create({
      title: 'Payment was Successful',
      subTitle: 'Here is transaction ref: '+resp.reference,
      buttons: ['OK']
    });
    alert.present();
  });          


  }


  
whatsPaystack(){
  const browser = this.iab.create('https://paystack.com/what-is-paystack');
  browser.insertCSS({code:"body{color:#ff0000;}"});

}

close(){

  this.viewCtrl.dismiss();

}

}