import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickDonationPage } from './quick-donation';

@NgModule({
  declarations: [
    QuickDonationPage,
  ],
  imports: [
    IonicPageModule.forChild(QuickDonationPage),
  ],
})
export class QuickDonationPageModule {}
