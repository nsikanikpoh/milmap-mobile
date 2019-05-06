import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundRaiserPage } from './fund-raiser';

@NgModule({
  declarations: [
    FundRaiserPage,
  ],
  imports: [
    IonicPageModule.forChild(FundRaiserPage),
  ],
})
export class FundRaiserPageModule {}
