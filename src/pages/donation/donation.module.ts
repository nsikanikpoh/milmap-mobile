import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { DonationPage } from './donation';
import { SuperTabsModule } from 'ionic2-super-tabs';
@NgModule({
  declarations: [
    DonationPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationPage),
    TranslateModule.forChild(),
    SuperTabsModule
  ],
})
export class DonationPageModule {}
