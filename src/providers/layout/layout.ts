import {Injectable} from '@angular/core';
import { Api } from '../api/api';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Layout {
    constructor(private http: HttpClient, public api: Api) {
    }

  getLayout(url: string): Observable<any> {
      return this.http.get(url).map((response: Response) => response);
  }

  events(){
    let seq = this.api.get('collages', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  queryevent(params?: any) {
    let seq = this.api.get('collage_comments',  {token: JSON.parse(window.localStorage.getItem('token')),  collage_id: params});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


}
