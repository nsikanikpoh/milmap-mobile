import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateProspectPage } from './create-prospect';

@NgModule({
  declarations: [
    CreateProspectPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProspectPage),
  ],
})
export class CreateProspectPageModule {}
