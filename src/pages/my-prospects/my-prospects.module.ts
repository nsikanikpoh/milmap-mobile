import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProspectsPage } from './my-prospects';

@NgModule({
  declarations: [
    MyProspectsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyProspectsPage),
  ],
})
export class MyProspectsPageModule {}
