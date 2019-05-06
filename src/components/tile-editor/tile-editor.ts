import {Component, Input, AfterViewInit} from '@angular/core';
import {Layout} from '../../providers';
import {Rect} from '../../data/rect';
var nextTileCanvasId = 0;
declare var Hammer: any;

/**
 * Generated class for the TileEditorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'tile-editor',
  templateUrl: 'tile-editor.html'
})

export class TileEditorComponent implements AfterViewInit {

 @Input('layout') layoutUrl: string;

  items: any;  
  @Input('left') 
  public left: number;

  @Input('top') 
  public top: number;

  @Input('width') 
  public width: number;

  @Input('height') 
  public height: number;

  public canvasId: string = `tile-editor-cv-${nextTileCanvasId++}`;

  @Input('bgColor') 
  private bgColor: string = '#c0c0c0';
  @Input('size') private size: number;
  private image: HTMLImageElement = null;
  private x: number = 0;
  private y: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private scale: number = 1;
  private canvas : any = document.createElement('canvas');
  private segments: Array<Rect>;


  constructor(private layoutService: Layout) {
    this.layoutUrl = JSON.parse(window.localStorage.getItem('host'));
    this.items = JSON.parse(window.localStorage.getItem('pics'));

}


  public ngAfterViewInit() {
  
      this.render();
      this.initializeInteraction();
  }
  private render(): void {
    if(this.layoutUrl != null) {
        this.layoutService.getLayout(this.layoutUrl).subscribe(layout => {
            this.segments = new Array<Rect>();
           
            for(let i = 0; i < layout.segments.length; ++i) {
                let seg = layout.segments[i];
                let rect = Rect.fromSegment(seg);
                rect.multiply(this.size / 100);
                rect.applyMargin(10, this.size);
                this.segments.push(rect);
            }

        if(this.items.length > layout.segments.length){
            let offset = this.items.length - layout.segments.length;
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

    
    let cv = <HTMLCanvasElement>document.getElementById(this.canvasId);
    let context = cv.getContext('2d');

    context.fillStyle = this.bgColor;
    context.fillRect(0, 0, this.width, this.height);
    let size = Math.max(this.width, this.height);
    
  
   
    this.items.forEach(element => {
        let imageSource = "https://milmap.herokuapp.com/" + element.picture.url;
        let ctx = this.canvas.getContext('2d');
        let image = new Image();
        let y = this.y;
        let x = this.x;
        let scale = this.scale;
            image.onload = function() {
                ctx.drawImage(image, x, y, size / scale, size / scale);
        
                }
            image.src = imageSource;
            }); 

            context.drawImage(this.canvas, this.x, this.y, size * this.scale, size * this.scale);
                      
  }

  private onMouseDown(e) {
    this.initializeInteraction();
  }

  private onMouseUp(e) {
    this.initializeInteraction();
               
  }

  private initializeInteraction(): void {
      let hm = new Hammer(document.getElementById(this.canvasId));
      hm.get('pinch').set({ enable: true });
      hm.on('pinchstart pinchmove', e => {
          this.scale = e.scale;
          this.render();
      });

      hm.on('panstart', e => {
          this.offsetX = this.x;
          this.offsetY = this.y;
      });
      hm.on('panmove', e => {
          this.x = this.offsetX + e.deltaX;
          this.y = this.offsetY + e.deltaY;

          this.render();
      });
  }
}