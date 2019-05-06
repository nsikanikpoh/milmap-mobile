import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, ActionSheetController, LoadingController, AlertController} from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MainPage } from '../';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Diagnostic } from '@ionic-native/diagnostic';
/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage implements OnInit{
  userDetails:any;
  signinform: FormGroup;
  responsData : any;
  fed:any;
  image: any = null;
  account: { name:'', phone:0, state:'', location:'', image:''}={
    name: '',
    location: '',
    phone:0,
    state:'',
    image:''
  };
  
  private loginErrorString: string = "please check your network connection";
  constructor(private diagnostic: Diagnostic, public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public user: User,
    public platform: Platform,
    public camera: Camera) {
     
      this.userDetails = JSON.parse(window.localStorage.getItem('userData'));

    }

    ngOnInit() {
    let TELPATTERN = /^[0-9\/]*$/i;
      this.signinform = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.pattern(TELPATTERN), Validators.minLength(11), Validators.maxLength(13)]),
        name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*.+[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
        location: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
      });
  
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }


  save() {
    // TODO: Save data to firebase
    let loading = this.loadingCtrl.create();
    loading.present();
    if(this.image != null){
      this.fed = this.account
      this.fed.image = this.image
    }
    else{
      this.fed = this.account
    }

    this.user.profileupdate(this.fed).subscribe((resp) => {
      if (resp){
        this.responsData = resp;
        localStorage.setItem('userData', JSON.stringify(this.responsData));
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Profile Saved',
          buttons: ['OK']
        });
        alert.present();
      
        console.log(resp);
      this.navCtrl.setRoot(MainPage);
      }


    }, (err) => {

     // this.navCtrl.push(MainPage);

      // Unable to login
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      let alert = this.alertCtrl.create({
        title: 'Profile Edit Failed',
        subTitle: 'Please Check Your Network and try again',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  selectImage() {


   

      this.actionSheetCtrl.create({
        title: 'Set Profile Picture',
        buttons: [
          {
            text: 'Take a Photo',
            handler: () => {
              this.selectImageInCamera();
            }
          },
          {
            text: 'Choose from Gallery',
            handler: () => {
              this.selectImageInGallery();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      }).present();
    
  

   
  }

  selectImageInCamera() {
    this.platform.ready().then(() => { 
    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.CAMERA).then((status) => {
      console.log(`AuthorizationStatus`);
      console.log(status);
      if (status != this.diagnostic.permissionStatus.GRANTED) {
        this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA).then((data) => {
          console.log(`getCameraAuthorizationStatus`);
          console.log(data);
        })
      } else {
        console.log("We have the permission");
        const CAMERA_OPTIONS: CameraOptions = {
          allowEdit: true,
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.CAMERA,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE
        }
    
        this.camera.getPicture(CAMERA_OPTIONS).then((imageData) => {
          this.image = 'data:image/jpeg;base64,'+imageData;
        }).catch(err => console.error(err));
      }
    }, (statusError) => {
      console.log(`statusError`);
      console.log(statusError);
    });

  });

  }

    
  

  selectImageInGallery() {


    this.diagnostic.getPermissionAuthorizationStatus(this.diagnostic.permission.CAMERA).then((status) => {
      console.log(`AuthorizationStatus`);
      console.log(status);
      if (status != this.diagnostic.permissionStatus.GRANTED) {
        this.diagnostic.requestRuntimePermission(this.diagnostic.permission.CAMERA).then((data) => {
          console.log(`getCameraAuthorizationStatus`);
          console.log(data);
          this.snap();
        })
      } else {
        console.log("We have the permission");
       this.snap();
      }
    
      
    }, (statusError) => {
      console.log(`statusError`);
      console.log(statusError);
    });
  }

snap(){
  const CAMERA_OPTIONS: CameraOptions = {
    allowEdit: true,
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE
  }
  this.camera.getPicture(CAMERA_OPTIONS).then((imageData) => {
    this.image = 'data:image/jpeg;base64,'+imageData;
  }).catch(err => console.error(err));
}
    

}
