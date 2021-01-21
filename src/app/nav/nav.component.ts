import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any;
  loggedIn: boolean;
  loginForm: FormGroup;

  constructor(public accountService: AccountService, private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this. initializeForm();
    //this.getCurrentUser(); //using aync pipe so commenting this
  }

  initializeForm() {
    this.loginForm=new FormGroup ({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  login()
  {
    this.model=this.loginForm.value;
    this.accountService.login(this.model).subscribe(
      response=>{
        this.loggedIn=true;
        this.router.navigateByUrl('/members');
      },
     error=>{
       console.log(error);
      //  this.toastr.error(error.error);
     }      
    )
  }

  lougout()
  {
    this.accountService.logout();
    this.loggedIn=false
    this.router.navigateByUrl('/');
  }

  //using aync pipe so commenting this
  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe(user =>{
  //     this.loggedIn=!!user;
  //   }, error=>{
  //     console.log(error);
  //   })
  // }

}
