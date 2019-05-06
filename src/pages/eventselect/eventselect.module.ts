import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventselectPage } from './eventselect';

@NgModule({
  declarations: [
    EventselectPage,
  ],
  imports: [
    IonicPageModule.forChild(EventselectPage),
  ],
})
export class EventselectPageModule {}
