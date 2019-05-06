import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PaymenthistoryPage } from './paymenthistory';
import { SuperTabsModule } from 'ionic2-super-tabs';
@NgModule({
  declarations: [
    PaymenthistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymenthistoryPage),
    TranslateModule.forChild(),
    SuperTabsModule 
  ],
})
export class PaymenthistoryPageModule {}
