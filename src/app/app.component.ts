import { Component, OnInit } from '@angular/core';
import { User } from './model/User';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dating-app-client';
  users:any;

  constructor(private accountService: AccountService){}
  ngOnInit(): void {
    this.getUsers();
    this.setCurrentuser();
  }

  setCurrentuser() {
    const user : User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  getUsers()
  {
    this.accountService.getUsers().subscribe(response=>{
      this.users=response;
      console.log('appuser',this.users);
    }),
    error=> {
      console.log(error)
    }
  }
}
