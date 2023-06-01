import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private _builder: FormBuilder,
    private _toastr: ToastrService,
    private _authService: AuthService,
    private _router: Router
  ) {

  }

  loginForm = this._builder.group({
    id: this._builder.control('', Validators.required),
    password: this._builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
  })

  user: any

  proceedLogin() {
    if (this.loginForm.valid) {
      // this._authService.proceedRegister(this.loginForm.value).subscribe({
      //   next: (res) => {
      //     this._toastr.success("", "Login Successfully!")
      //     this._router.navigate([''])
      //   },
      //   error: (err) => {

      //   }
      // })

      this._authService.getById(this.loginForm.value.id).subscribe({
        next: (res) => {
          this.user = res

          if (this.user.password === this.loginForm.value.password) {

            if (this.user.isactive) {

              sessionStorage.setItem('id', this.user.id)
              sessionStorage.setItem('role', this.user.role)
              this._router.navigate([""])

            } else {
              this._toastr.error("You are not active user")
            }

          } else {
            this._toastr.error("Wrong Credential")
          }

        },
        error: (err) => {
          console.log(err);
        }
      })

    } else {
      this._toastr.warning("Please enter valid data!")
    }
  }
}
