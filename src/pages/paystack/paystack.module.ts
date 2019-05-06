import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaystackPage } from './paystack';

@NgModule({
  declarations: [
    PaystackPage,
  ],
  imports: [
    IonicPageModule.forChild(PaystackPage),
  ],
})
export class PaystackPageModule {}
