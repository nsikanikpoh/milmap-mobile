import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumnPage } from './forumn';

@NgModule({
  declarations: [
    ForumnPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumnPage),
  ],
})
export class ForumnPageModule {}
