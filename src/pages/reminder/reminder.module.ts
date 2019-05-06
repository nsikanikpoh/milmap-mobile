import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReminderPage } from './reminder';

@NgModule({
  declarations: [
    ReminderPage,
  ],
  imports: [
    IonicPageModule.forChild(ReminderPage),
  ],
})
export class ReminderPageModule {}
