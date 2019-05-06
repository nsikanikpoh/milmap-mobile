import {Component, Input, Output, AfterViewInit, OnInit, EventEmitter} from '@angular/core';
import {Layout} from '../../providers';
import {Rect} from '../../data/rect';
import 'rxjs/add/operator/catch';

var nextLayoutCanvasId = 0;
/**
 * Generated class for the LayoutPreviewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'layout-preview',
  templateUrl: 'layout-preview.html'
})
 export class LayoutPreviewComponent implements AfterViewInit {
    @Input('layout') layoutUrl: string;
    @Input('size') size: number = 100;
    @Output() layoutSelect = new EventEmitter();
    private layoutMargin = 4;
    private canvasId: string = `layout-preview-cv-${nextLayoutCanvasId++}`;
    private rects: Array<Rect>;
    private img: HTMLImageElement = null;
    images:any;
    constructor(private layoutService: Layout) {
        this.images = JSON.parse(window.localStorage.getItem('pics'));
    }

    public ngAfterViewInit(): void {
        if(this.layoutUrl != null) {
            this.layoutService.getLayout(this.layoutUrl).subscribe(layout => {
                this.layoutMargin *= this.size / 100;
                this.createRectsFromLayout(layout);
                
                this.render();
            });
        }
    }

    private render(): void
    {
        let cv = <HTMLCanvasElement>document.getElementById(this.canvasId);
        let context = cv.getContext('2d');

        context.fillStyle = 'rgba(92, 165, 194, 0.76)';
        context.fillRect(0, 0, this.size, this.size);

        context.fillStyle = 'rgb(95, 93, 187)';
        for(let i = 0; i < this.rects.length; ++i) {
            context.fillRect(this.rects[i].left, this.rects[i].top, this.rects[i].width, this.rects[i].height);
        }
    }

    private onMouseDown(e) {
    }

    private onMouseUp() {
        this.layoutSelect.emit(this.layoutUrl);
    }


    private createRectsFromLayout(layout: any): void {
        let result = new Array<Rect>();
       
                for(let i = 0; i < layout.segments.length; ++i) {

             
                    let seg = layout.segments[i];
                    let rect = Rect.fromSegment(seg);
                    result.push(rect);
                }
            if(this.images.length > layout.segments.length){
                let offset = this.images.length - layout.segments.length;
                for(let i = 0; i < offset; ++i) {
                    let seg = layout.segments[layout.segments.length -1 ];
                    let rect = Rect.fromSegment(seg);
                    result.push(rect);
            }
           
        }

        this.convertPercentualRectsToPixelRects(result);
        this.applyMarginToRects(result);
        this.rects = result;
    }

    private convertPercentualRectsToPixelRects(rectangles: Array<Rect>): void {
        rectangles.map(r => {
            r.multiply(this.size / 100);
        });
    }

    private applyMarginToRects(rectangles: Array<Rect>): void {
        rectangles.map(r => {
            r.applyMargin(this.layoutMargin, this.size);
        });
    }
}
