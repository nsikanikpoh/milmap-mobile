import { Component, OnInit, ViewChild, Renderer, QueryList} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import {Gallery} from '../../providers';
import domtoimage from 'dom-to-image';
import { Diagnostic } from '@ionic-native/diagnostic';

/**
 * Generated class for the AcollagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-acollage',
  templateUrl: 'acollage.html',
})
export class AcollagePage implements OnInit {
    @ViewChild('collage') collage;
    
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  images:any;
  
   items:any;
   arr=[];
   arr2=[];

  constructor( public platform : Platform, private diagnostic: Diagnostic, public navCtrl: NavController, public galleryService: Gallery, public navParams: NavParams,  private alertCtrl: AlertController) {
    this.items = JSON.parse(window.localStorage.getItem('pics'));
      this.items.forEach((element) => {
        let imageSource = "https://milmap.actionaid-ngr.org:3443/" + element.picture.url;
               this.arr.push(imageSource);
            }); 

            this.arr.forEach((element) => {
                this.arr2.push({small:element, medium:element, big:element});
                    }); 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcollagePage');
  }

  ngOnInit(): void {

    this.galleryOptions = [
        {
            thumbnailsColumns: 3, thumbnailsRows: 2, thumbnailsPercent: 40, imagePercent: 60, thumbnailMargin: 2, thumbnailsMargin: 2, imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        {
            breakpoint: 500,
            width: '280px',
            height: '280px',
            thumbnailsColumns: 3
        },
        // max-width 400
        {
            breakpoint: 2800,
             width: '100%',
             height: '150px', 
             thumbnailsColumns: 2
        }
    ];

  
        this.galleryImages = this.arr2;

   
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
      var node = window.document.getElementById('mynode');
    
      domtoimage.toPng(node)
          .then(function (dataUrl) {
              let base64Data = dataUrl;
              cordova.base64ToGallery(
                  base64Data,
                  {
                      prefix: 'img_',
                      mediaScanner: true
                  },
           
                  function(path) {
                      console.log(path);
                  
                    alert('Your collage has been saved to:'+path);
                   
                  },
           
                  function(err) {
                      console.error(err);
                  
                     alert('Something went wrong on saving your collage.'+err);
                    
                  }
              );

              
  
          })
          .catch(function (error) {
              console.error('oops, something went wrong!', error);
          });
    }



}
