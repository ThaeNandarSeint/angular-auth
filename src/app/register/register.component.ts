import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private _builder:FormBuilder,
    private _toastr:ToastrService,
    private _authService: AuthService,
    private _router: Router
  ) {
    
  }

  registerForm = this._builder.group({    
    name: this._builder.control('', Validators.required),
    email: this._builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this._builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    gender: this._builder.control('male'),
    role: this._builder.control(''),
    isactive: this._builder.control(false)
  })

  proceedRegister(){
    if(this.registerForm.valid){
      this._authService.proceedRegister(this.registerForm.value).subscribe({
        next: (res) => {
          this._toastr.success("Please contact admin for enable access", "Registered Successfully!")
          this._router.navigate(['login'])
        },
        error: (err) => {

        }
      })
    }else{
      this._toastr.warning("Please enter valid data!")
    }
  }
}
