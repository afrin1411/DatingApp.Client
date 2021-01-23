import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/model/member';
import { User } from 'src/app/model/User';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;
  @ViewChild('editForm') editForm : NgForm;

  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any) {
    if(this.editForm.dirty) {
      $event.returnValue=true;
    }
  }

  constructor(private accountService:AccountService,private membersService: MembersService
    ,private toastr:ToastrService) {
    accountService.currentUser$.pipe(take(1)).subscribe(
      resp=>this.user=resp
    )
   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    this.membersService.getMember(this.user.userName).subscribe(
      member=>this.member=member
    );
  }

  updateMember()
  {
   // console.log(this.editForm);
   console.log('test');
   this.membersService.updateUser(this.member).subscribe(()=>{
    this.toastr.success("saved successfully")
    this.editForm.reset(this.member);
   }
     
   )
 
  }

}
