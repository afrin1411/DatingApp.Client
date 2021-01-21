import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/model/member';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member:Member;

  constructor(private memberService: MembersService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember()
  {
    let userName= this.activateRoute.snapshot.paramMap.get('userName');
    this.memberService.getMember(userName)
    .subscribe(member => this.member=member)

    console.log(this.member);
  }

}
