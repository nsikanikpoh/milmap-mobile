import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditcollagePage } from './editcollage';
import {LayoutEditorComponent} from '../../components/layout-editor/layout-editor';
import {TileEditorComponent} from '../../components/tile-editor/tile-editor';
@NgModule({
  declarations: [
    EditcollagePage,
    LayoutEditorComponent,
    TileEditorComponent,
  ],
  imports: [
    IonicPageModule.forChild(EditcollagePage),
  ],
  exports: [
    LayoutEditorComponent,
    TileEditorComponent,
  ],
})
export class EditcollagePageModule {}
