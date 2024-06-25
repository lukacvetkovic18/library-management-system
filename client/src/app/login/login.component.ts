import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.userService.login(this.credentials).subscribe({
      next: (response) => {
        console.log(response)
        localStorage.setItem('token', response.token);
        if(response.isAdmin) {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => alert(error.error.message)
    });
  }

}
