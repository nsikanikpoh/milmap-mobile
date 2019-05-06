import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NcollagePage } from './ncollage';

@NgModule({
  declarations: [
    NcollagePage,
  ],
  imports: [
    IonicPageModule.forChild(NcollagePage),
  ],
})
export class NcollagePageModule {}
