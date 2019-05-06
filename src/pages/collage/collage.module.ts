import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollagePage } from './collage';
import {LayoutPreviewComponent} from '../../components/layout-preview/layout-preview';


@NgModule({
  declarations: [
    
    CollagePage,
    LayoutPreviewComponent,
  ],
  imports: [
    IonicPageModule.forChild(CollagePage),
  ],
  exports: [
    LayoutPreviewComponent
  ]
})
export class CollagePageModule {}
