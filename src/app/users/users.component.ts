import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(
    private _authService: AuthService
  ) {}

  users: any

  getUsers() {
    this._authService.getAll().subscribe({
      next: (res) => {
        this.users = res
      },
      error: (err) => {

      }
    })
  }
}
