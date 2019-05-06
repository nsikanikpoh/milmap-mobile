import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OprospectsPage } from './oprospects';

@NgModule({
  declarations: [
    OprospectsPage,
  ],
  imports: [
    IonicPageModule.forChild(OprospectsPage),
  ],
})
export class OprospectsPageModule {}
