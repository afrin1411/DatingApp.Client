import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  baseUrl=environment.apiurl;
  private currentUserSource= new ReplaySubject<User>(1);
  currentUser$=this.currentUserSource.asObservable();

  getUsers()
  {
    return this.http.get(this.baseUrl+'users').pipe(
      map((response:User)=>response)
    );
  }

  login(model:any)
  {
    return this.http.post(this.baseUrl+'account/Login',model).pipe(
      map((response: User)=> {
        const user=response;
        if(user) {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user:User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model:any)
  {
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((response: User)=> {
        if(response) {
          localStorage.setItem('user',JSON.stringify(response));
          this.currentUserSource.next(response);
        }
      })
    )
  }
}
