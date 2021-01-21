import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model:any={};
  registerForm:FormGroup;
  @Output() cancelRegister=new EventEmitter();

  constructor(private accountService:AccountService, private toastr: ToastrService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this. initializeForm();
  }

  // initializeForm() {
  //   this.registerForm=new FormGroup ({
  //     userName: new FormControl('',Validators.required),
  //     password: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.minLength(6)]),
  //     confirmPassword: new FormControl('',[Validators.required,this.matchValues('password')])
  //   });
  // }

  initializeForm() {
   this.registerForm=this.fb.group({
    userName:['',Validators.required],
    password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    confirmPassword: ['',[Validators.required,this.matchValues('password')]],
    gender:['',Validators.required],
    knownAs:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    dob:['',Validators.required],
    city:['',Validators.required],
    country:['',Validators.required]
   })
  }

  register()
  {
    this.model=this.registerForm.value;
    this.accountService.register(this.model).subscribe(
      response=>{
          console.log(response);
          this.cancel();
      }, error=>{
        console.log(error);
        this.toastr.error(error.error);
      }
    )
  }

  cancel() {
    console.log('cancel');
    this.cancelRegister.emit(false);
  }

  matchValues(matchTo:string) {
    return (control:AbstractControl)=> {
      return control?.value===control?.parent?.controls[matchTo].value?
      null: {isMatching:true}
    }
  }


}
