import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  @ViewChild('userEditDialog') userEditDialog!: TemplateRef<any>;
  @ViewChild('changePasswordDialog') changePasswordDialog!: TemplateRef<any>;

  users: User[] = [];
  firstNameFilter = "";
  lastNameFilter = "";
  usernameFilter = "";
  isScrolled = false;

  selectedUser: any = {};
  // selectedUser = {
  //   id: 0,
  //   firstName: '',
  //   lastName: '',
  //   username: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   imagePath: ''
  // };
  passwordVisible = false;
  newPassword = '';
  fieldLabels: { [key: string]: string } = {
    firstName: 'First Name',
    lastName: 'Last Name',
    username: 'Username',
    email: 'Email',
    phone: 'Phone',
    address: 'Address'
  };
  dialogRef!: MatDialogRef<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  loadUsers(): void {
    this.userService.getAllUsers(0, 50).subscribe((data) => {
      console.log(data)
      this.users = data.filter((user: any) => user.isAdmin === false);
    });
  }
  
  searchUsers(): void {
    this.userService.getAllUsers(0, 50, this.firstNameFilter, this.lastNameFilter, this.usernameFilter).subscribe((data) => {
      this.users = data.filter((user: any) => user.isAdmin === false);
    });
  }

  transformDate(date: Date) {
    console.log(date)
    if (!date) {
      return '';
    }
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if necessary
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  openUserDialog(user: User): void {
    this.selectedUser.id = user.id;
    this.selectedUser.firstName = user.firstName;
    this.selectedUser.lastName = user.lastName;
    this.selectedUser.username = user.username;
    this.selectedUser.email = user.email;
    this.selectedUser.imagePath = user.imagePath;
    if(user.phone) this.selectedUser.phone = user.phone;
    if(user.address) this.selectedUser.address = user.address;
    this.dialogRef = this.dialog.open(this.userEditDialog, {
      width: 'max-content'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.saveUser();
      } else if (result === 'delete') {
        this.deleteUser();
      } else {
        this.searchUsers();
      }
    });
  }

  openChangePasswordDialog(user: User): void {
    this.selectedUser = { ...user };
    this.dialogRef = this.dialog.open(this.changePasswordDialog, {
      width: 'max-content'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.changeUserPassword();
      }
    });
  }

  changeUserPassword(): void {
    if (this.newPassword) {
      const user = {
        id: this.selectedUser.id,
        password: this.newPassword
      }
      this.userService.updateUserPassword(user).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  saveUser(): void {
    this.userService.updateUser(this.selectedUser).subscribe(() => {
      this.searchUsers();
      this.dialogRef.close();
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.removeUser(this.selectedUser.id).subscribe(() => {
        this.searchUsers();
        this.dialogRef.close();
      });
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
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
        this.selectedUser.imagePath = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfilePicture(): void {
    this.selectedUser.imagePath = '';
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    this.isScrolled = window.scrollY > threshold;
  }
}
