import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProspectPage } from './prospect';

@NgModule({
  declarations: [
    ProspectPage,
  ],
  imports: [
    IonicPageModule.forChild(ProspectPage),
  ],
})
export class ProspectPageModule {}
