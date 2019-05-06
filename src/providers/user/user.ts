import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {
  user: any;
  paymentData: any;
 logoutres:any;

  constructor(public api: Api) { }
  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(data: any) {
    let seq = this.api.post('sessions', {email:data.email,
      password:data.password
    }).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
        this.loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  resetpassword(data: any) {
    let seq = this.api.post('passwords', {email:data.email}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
        this.loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  logout() {
    let seq = this.api.delete('sessions', {token: JSON.parse(window.localStorage.getItem('token'))
    }).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
        this.logoutres = res;
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */

  signup(data: any) {
    let seq = this.api.post('members', {member:{name:data.name,email:data.email,
      password:data.password,
      password_confirmation:data.password_confirmation,
      phone:data.phone,
      location:data.location,
      gender:data.gender,
      address:data.address,
      state:data.state
    }}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  profileupdate(data: any) {
  let user_id = JSON.parse(window.localStorage.getItem('userData'))
  let params = user_id.id
    let seq = this.api.patch('users/'+params+'', {token: JSON.parse(window.localStorage.getItem('token')), user:{name:data.name,
      phone:data.phone,
      location:data.location,
      state:data.state,
      image:data.image
    }}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }



  myDonations(){
   
    let seq = this.api.get('donation_history', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  interests(){
   
    let seq = this.api.get('interest_lines', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  myInterest(){
   
    let seq = this.api.get('myinterest', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }


  addinterest(params?: any){
   
    let seq = this.api.get('interest_lines/'+params+'/addinterest', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  mySponsorships(){
   
    let seq = this.api.get('sponsorship_history', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }


  fundTotal(){
   
    let seq = this.api.get('amount_raised', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  query(params?: any) {
    let seq = this.api.get('users/'+params,  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
       // this.detail=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    
    return seq;
  }

  profilequery(params?: any) {
    let seq = this.api.get('users/'+params+'/profile',  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
       // this.detail=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    
    return seq;
  }


  myDashboard(){
    let seq = this.api.get('dashboard', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
        this.paymentData=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  addComment(data: any, params: any) {
    let seq = this.api.post('conversations',  {token: JSON.parse(window.localStorage.getItem('token')),  pros_id: params, conversation: {body: data.comment}}).share();
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
    let seq = this.api.get('prospect_comments',  {token: JSON.parse(window.localStorage.getItem('token')),  pros_id: params});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  prospectopportunity(params?: any) {
    let seq = this.api.get('prospects/'+params+'/opportunity',  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
       // this.detail=res;
      }
    }, err => {
      console.error('ERROR', err);
    });
    
    return seq;
  }


  queryprospect(params?: any) {
    let seq = this.api.get('prospects/'+params,  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  querydonation(params?: any) {
    let seq = this.api.get('donations/'+params,  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }


  querySponsorship(params?: any) {
    let seq = this.api.get('sponsorships/'+params,  {token: JSON.parse(window.localStorage.getItem('token'))});
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 200) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }


  myProspects(){
   
    let seq = this.api.get('my_prospects', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }


  interest_lines(){
   
    let seq = this.api.get('interest_lines', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }



  donatedP(){
   
    let seq = this.api.get('donated', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }

  opportunityP(){
   
    let seq = this.api.get('opportunities', {token: JSON.parse(window.localStorage.getItem('token'))}).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
      }
    }, err => {
      console.error('ERROR', err);
    });
    

    return seq;
  }



  fundup(data: any) {
    let seq = this.api.post('fund_raisers', {fund_raiser:{name:data.name,email:data.email,
      password:data.password,
      password_confirmation:data.password_confirmation,
      phone:data.phone,
      location:data.location,
      gender:data.gender,
      address:data.address,
      state:data.state
    }}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  newProspect(data: any) {
    let seq = this.api.post('prospects', {token: JSON.parse(window.localStorage.getItem('token')), prospect:{name:data.name,email:data.email,
      
      phone:data.phone,
      location:data.location,
      gender:data.gender,
      address:data.address,
      state:data.state
    }}).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        this.loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

 

  /**
   * Process a login/signup response to store user data
   */
  loggedIn(resp) {
    this.user = resp;
  }

  pay(data: any){
    let seq = this.api.post('donations', {token: JSON.parse(window.localStorage.getItem('token')), donation:{reference:data.reference, amount:data.amount, line:data.line
    }}, ).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        console.error(res.status);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }

  sponsor(data: any){
    let seq = this.api.post('sponsorships', {token: JSON.parse(window.localStorage.getItem('token')), donation:{reference:data.reference, amount:data.amount, interest_line_id:data.interest_line_id
    }}, ).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        console.error(res.status);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }

  payquick(data: any){
    let seq = this.api.post('quick_donations', {token: JSON.parse(window.localStorage.getItem('token')), donation:{reference:data.reference, amount:data.amount, line:data.line
    }}, ).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        console.error(res.status);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }


  fundpay(data: any){
    let seq = this.api.post('fundraiser_donate', {token: JSON.parse(window.localStorage.getItem('token')), donation:{reference:data.reference, donator_id:data.donator_id, amount:data.amount, line:data.line
    }}, ).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 201) {
        console.error(res.status);
      }
    }, err => {
      console.error('ERROR', err);
    });
    return seq;

  }
}
