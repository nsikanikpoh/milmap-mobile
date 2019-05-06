import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsnPage } from './eventsn';

@NgModule({
  declarations: [
    EventsnPage,
  ],
  imports: [
    IonicPageModule.forChild(EventsnPage),
  ],
})
export class EventsnPageModule {}
