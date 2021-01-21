import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastr : ToastrService,private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   
    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          switch(error.status) {
            case 400:
              if(error.error.errors) {
                const modalStateerror=[];
                for(let key in error.error.errors) {
                  if(error.error.errors[key])
                  modalStateerror.push(error.error.errors[key]);
                }
                console.log(modalStateerror.flat());
                throw modalStateerror;
              }
              else {
                this.toastr.error(error.error,error.status);
              }
              break;

              case 401:
                this.toastr.error(error.statusText,error.status);
                break;

              case 404:
                this.router.navigateByUrl('/not-found');
                break;

              case 500:
                console.log(error)
                const navigationExtras: NavigationExtras={state:{error:error}};
                this.router.navigateByUrl('/server-error',navigationExtras);
                break;

              default:
                this.toastr.error('unexpected error occured');
                break;
          }
        }

        return catchError(error);
       
      })
    )
  }
}
