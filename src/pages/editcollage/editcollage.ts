import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import {LayoutEditorComponent} from '../../components/layout-editor/layout-editor';


/**
 * Generated class for the EditcollagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editcollage',
  templateUrl: 'editcollage.html',
})
export class EditcollagePage {
  private selectedLayout: string;
  private layoutWidth: number;

  @ViewChild('layoutEditor') layoutEditor: LayoutEditorComponent;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.layoutWidth = Math.floor(window.innerWidth * 0.9);
    this.selectedLayout = navParams.get("layoutUrl");
  }

  private onSave(): void {
    this.layoutEditor.save();
  }

}
