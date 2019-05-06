import {Component, Input, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { AlertController } from 'ionic-angular';
import {Layout, Gallery} from '../../providers';
import {Rect} from '../../data/rect';
import {TileEditorComponent} from '../tile-editor/tile-editor';

@Component({
  selector: 'layout-editor',
  templateUrl: 'layout-editor.html'
})

export class LayoutEditorComponent implements AfterViewInit {

    @Input('size') private size: number;
    @Input('layout') private layoutUrl: string;
    private segments: Array<Rect>;
 images:any;
 
    @ViewChildren('editors') private editors: QueryList<TileEditorComponent>;

    constructor(
        private layoutService: Layout, 
        private galleryService: Gallery,
        private alertCtrl: AlertController) {
            this.images = JSON.parse(window.localStorage.getItem('pics'));
    }

    public ngAfterViewInit(): void {
        if(this.layoutUrl != null) {
            localStorage.setItem('host', JSON.stringify(this.layoutUrl));
            this.layoutService.getLayout(this.layoutUrl).subscribe(layout => {
                this.segments = new Array<Rect>();
               
                for(let i = 0; i < layout.segments.length; ++i) {
                    let seg = layout.segments[i];
                    let rect = Rect.fromSegment(seg);
                    rect.multiply(this.size / 100);
                    rect.applyMargin(10, this.size);
                    this.segments.push(rect);
                }
            if(this.images.length > layout.segments.length){
                let offset = this.images.length - layout.segments.length;
                for(let i = 0; i < offset; ++i) {
                    let seg = layout.segments[layout.segments.length -1 ];
                    let rect = Rect.fromSegment(seg);
                    rect.multiply(this.size / 100);
                    rect.applyMargin(10, this.size);
                    this.segments.push(rect);
                }
           
            }

            });
        }
    }

    public save(): void {
        let cv = <HTMLCanvasElement>document.createElement('canvas');
        cv.width = this.size;
        cv.height = this.size;
        let context = cv.getContext('2d');
        context.fillStyle = '#fff';
        context.fillRect(0, 0, cv.width, cv.height);
        this.editors.map((tile: TileEditorComponent) => {
        let cvChild = <HTMLCanvasElement>document.getElementById(tile.canvasId);
            context.drawImage(cvChild, tile.left, tile.top, tile.width, tile.height);
        });
        let data = cv.toDataURL('image/png');
        this.galleryService.savePicture(data).subscribe(success => {
            if(success) {
                this.showSuccess();
            }
            else {
                this.showError();
            }
        });
    }

    private showSuccess(): void {
        let alert = this.alertCtrl.create({
            title: 'Save to Device',
            subTitle: 'Your collage has been saved to your device photo album. :)',
            buttons: ['OK']
        });
        alert.present();
    }

    private showError(): void {
        let alert = this.alertCtrl.create({
            title: 'Save to Device',
            subTitle: 'Something went wrong on saving your collage. Did you grant photo access to this damn fine app?',
            buttons: ['OK']
        });
        alert.present();
    }
}





