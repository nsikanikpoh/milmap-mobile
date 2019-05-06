import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickdPage } from './quickd';

@NgModule({
  declarations: [
    QuickdPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickdPage),
  ],
})
export class QuickdPageModule {}
