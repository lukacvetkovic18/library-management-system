import { Component, HostListener } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  user!: any;
  isScrolled = false;
  isEditing: { [key: string]: boolean } = {};
  originalUser: Partial<any> = {};
  isEditingPassword = false;
  passwordVisible = false;
  newPassword = '';
  fieldLabels: { [key: string]: string } = {
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email',
    phone: 'Phone Number',
    address: 'Address'
  };

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadUser(): void {
    this.userService.getUserInfo().subscribe((data) => {
      this.user = data;
    })
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    this.isScrolled = window.scrollY > threshold;
  }

  editField(field: string): void {
    this.originalUser[field] = this.user[field];
    this.isEditing[field] = true;
  }

  saveField(field: string): void {
    if (!this.user[field] && field !== "phone" && field !== "address") {
      alert(`${this.fieldLabels[field]} cannot be empty!`);
      return;
    }
    this.userService.updateUserInfo({ [field]: this.user[field] }).subscribe(() => {
      this.isEditing[field] = false;
      delete this.originalUser[field];
    });
  }

  cancelEdit(field: string): void {
    this.user[field] = this.originalUser[field];
    delete this.originalUser[field];
    this.isEditing[field] = false;
  }

  editPassword(): void {
    this.isEditingPassword = true;
  }

  savePassword(): void {
    if (!this.newPassword) {
      alert('Password cannot be empty!');
      return;
    }
    this.userService.updateUserInfo({ password: this.newPassword }).subscribe(() => {
      this.isEditingPassword = false;
      this.newPassword = '';
    });
  }

  cancelEditPassword(): void {
    this.isEditingPassword = false;
    this.newPassword = '';
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  isAnyFieldBeingEdited(): boolean {
    return Object.values(this.isEditing).includes(true) || this.isEditingPassword;
  }

  onProfilePicClick(): void {
    document.querySelector<HTMLInputElement>('#fileInput')!.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = (e.target as FileReader).result as string;
        this.userService.updateProfilePicture(base64Image).subscribe((response) => {
          this.user.imagePath = response.imagePath;
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfilePicture(): void {
    this.userService.updateProfilePicture("").subscribe(() => {
      this.user.imagePath = "";
    });
  }

}
