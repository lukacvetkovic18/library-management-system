import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  };
  confirmPassword: string = "";

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    if (this.user.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    this.userService.register(this.user).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => alert(error.error.message)
    });
  }

}
