import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../member/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsaveChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    // component: unknown,
    // currentRoute: ActivatedRouteSnapshot,
    // currentState: RouterStateSnapshot,
    // nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      component: MemberEditComponent): boolean { 

        if(component.editForm.dirty)
        {
          return confirm('Are you sure you want to continue? Any unsaved changes will be lost')
        }
    return true;
  }
  
}
