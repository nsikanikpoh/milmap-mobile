import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationviewPage } from './donationview';

@NgModule({
  declarations: [
    DonationviewPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationviewPage),
  ],
})
export class DonationviewPageModule {}
