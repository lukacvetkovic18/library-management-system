import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  subject = "";
  text = "";
  isSidebarHidden = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  sendEmail(): void {
    if(this.subject !== '' && this.text !== '') {
      const emailData = {
        subject: this.subject,
        text: this.text
      }
      this.userService.contactAdmin(emailData).subscribe(response => {
        alert(response.message);
        console.log(response);
      }, error => {
        alert(error.error.message);
        // console.error('Error sending message to server', error);
      });
    }
    else {
      alert("Please fill in both subject and text fields.");
    }
  }

}
