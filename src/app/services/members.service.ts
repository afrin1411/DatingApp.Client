import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../model/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiurl;
 
  //  httpOptions= {
  //   headers:new HttpHeaders({
  //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  //   })
  // }

  constructor(private http:HttpClient) { }

  getMembers() {
    // return this.http.get<Member[]>(this.baseUrl+'users',this.httpOptions);
    return this.http.get<Member[]>(this.baseUrl+'users');
  }

  getMember(userrName: string)
  {
    // return this.http.get<Member>(`${this.baseUrl}users`,this.httpOptions);
    return this.http.get<Member>(`${this.baseUrl}users/${userrName}`);
  }
}
