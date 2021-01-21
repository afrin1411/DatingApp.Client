import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from '../model/User';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode =false;
  users:User;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  registerToggle() {
    this.registerMode=!this.registerMode;
  }

  cancelRegisterEvent(event:boolean) {
    console.log('event:' +event)
    this.registerMode=event;
  }

}
