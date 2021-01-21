import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
//import {BsDatepickerModule} from 'ngx-bootstrap/datepicker'
import {TabsModule} from 'ngx-bootstrap/tabs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(
      {
        positionClass:'toastr-bottom-right'
      }      
    ),
    TabsModule.forRoot()
    // BsDatepickerModule.forRoot()
  ],

  exports: [
    ToastrModule,
    TabsModule
  ]
})
export class SharedModule { }
