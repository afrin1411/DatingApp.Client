import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../model/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiurl;
  members: Member[]=[];
 
  //  httpOptions= {
  //   headers:new HttpHeaders({
  //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  //   })
  // }

  constructor(private http:HttpClient) { }

  getMembers() {

    if(this.members.length>0) return of(this.members);
    // return this.http.get<Member[]>(this.baseUrl+'users',this.httpOptions);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      map(resp=>{
        this.members=resp;
        return resp;
      })
    )
  }

  getMember(userrName: string)
  {
    
    const member=  this.members.find(x=>x.userName==userrName);
    if(member!=undefined) return of(member);
    // return this.http.get<Member>(`${this.baseUrl}users`,this.httpOptions);
    return this.http.get<Member>(`${this.baseUrl}users/${userrName}`);
  }

  updateUser(member:Member)
  {
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>{
        const index= this.members.indexOf(member);
        this.members[index]=member;
      })
    )
  }
}
