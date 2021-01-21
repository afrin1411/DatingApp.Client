import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/model/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  members: Member[];

  constructor(private MembersService:MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers()
  {
    this.MembersService.getMembers().subscribe(members=> {
      this.members=members;
    })
  }

}
