import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';
/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Post {
  postData: any;
  detail: any;
  constructor(public http: HttpClient, public api: Api) {
    console.log('Hello PostProvider Provider');
  }
  
  getPosts(){
   
    let seq = this.api.get('posts', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.postData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }
  query(params?: any) {
    let seq = this.api.get('posts/'+params,  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.detail=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  addComment(data: any, params: any) {
    let seq = this.api.post('comments',  {token: JSON.parse(window.localStorage.getItem('token')),  post_id: params, comment: {body: data.comment}}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  getComments( params: any) {
    let seq = this.api.get('post_comments',  {token: JSON.parse(window.localStorage.getItem('token')),  post_id: params});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  add(threat: any) {
  }

  delete(threat: any) {
  }


  

}
