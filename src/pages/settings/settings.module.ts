import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';
import { SuperTabsModule } from 'ionic2-super-tabs';
@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule.forChild(),
    SuperTabsModule
  ],
  exports: [
    SettingsPage
  ]
})
export class SettingsPageModule { }
