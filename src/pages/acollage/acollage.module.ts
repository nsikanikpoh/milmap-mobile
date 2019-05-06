import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcollagePage } from './acollage';
import {NgxGalleryModule, NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@NgModule({
  declarations: [
    AcollagePage
  ],
  imports: [
    IonicPageModule.forChild(AcollagePage),NgxGalleryModule
  ]
   
})


export class AcollagePageModule {}
