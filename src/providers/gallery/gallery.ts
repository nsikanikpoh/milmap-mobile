import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

@Injectable()
export class Gallery {
  constructor(public base64ToGallery: Base64ToGallery) { }
    
  
  public savePicture(base64dataUrl: string): Observable<boolean> {
        let observable = Observable.create(observer => {8
          this.base64ToGallery.base64ToGallery(base64dataUrl, {
                prefix: 'collage_',
                mediaScanner: true
            }).then(
                res => observer.next(true),   
                err => observer.next(false)
            );
        });
        return observable;
    }
}