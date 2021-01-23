import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { MatchesGuard } from './guard/matches.guard';
import { PreventUnsaveChangesGuard } from './guard/prevent-unsave-changes.guard';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailsComponent } from './member/member-details/member-details.component';
import { MemberEditComponent } from './member/member-edit/member-edit.component';
import { MemberListsComponent } from './member/member-lists/member-lists.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[AuthGuard],
    children:[
      {path:'members',component:MemberListsComponent},
      {path:'members/:userName',component:MemberDetailsComponent,canActivate:[MatchesGuard]},
      {path:'member/edit',component:MemberEditComponent,canDeactivate:[PreventUnsaveChangesGuard]},
      {path:'messages',component:MessagesComponent},
      {path:'lists',component:ListsComponent},      
    ],
  },
  {path:'not-found',component:NotFoundComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
