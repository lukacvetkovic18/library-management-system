import { Component, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { DataTransferService } from '../services/data-transfer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  user!: any;
  isSidebarHidden = false;
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
  reviews: Review[] = [];
  selectedReview = {
    id: 0,
    reviewDate: 0,
    rating: 0,
    comment: ''
  };
  ratings = [1, 2, 3, 4, 5];
  dialogRef!: MatDialogRef<any>;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private reviewService: ReviewService,
    private dataTransferService: DataTransferService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadReviews();
  }

  loadUser(): void {
    this.userService.getUserInfo().subscribe((data) => {
      this.user = data;
    })
  }

  loadReviews(): void {
    this.reviewService.getUsersReviews().subscribe(
      (data) => {
        this.reviews = data.map((review: any) => ({
          id: review.id,
          userId: review.user.id,
          bookId: review.book.id,
          bookName: review.book.name,
          bookAuthor: review.book.author,
          bookImage: review.book.img_paths,
          username: review.user.username,
          userImage: review.user.imagePath,
          reviewDate: new Date(review.reviewDate),
          rating: review.rating,
          comment: review.comment
        }));
      },
      (error) => {
        console.error('Error fetching user reviews:', error);
      }
    );
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
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

  viewBookDetails(bookId: number): void {
    this.dataTransferService.setBookId(bookId);
    this.router.navigate(['/book-details']);
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

  openEditReviewDialog(review: Review): void {
    this.selectedReview = {
      id: review.id,
      reviewDate: Date.now(),
      rating: review.rating,
      comment: review.comment
     };
    this.dialogRef = this.dialog.open(this.editDialog, {
      width: '500px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result === 'save') {
        this.updateReview(this.selectedReview);
      } else if (result === 'delete') {
        this.deleteReview(this.selectedReview.id);
      }
    });
  }

  onSave(): void {
    this.dialogRef.close('save');
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }

  onDelete(): void {
    this.dialogRef.close('delete');
  }

  updateReview(review: any): void {
    review.reviewDate = 
    this.reviewService.editBookReview(review).subscribe(
      () => this.loadReviews(),
      error => console.error('Error updating review:', error)
    );
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.removeBookReview(reviewId).subscribe(
        () => this.loadReviews(),
        error => console.error('Error deleting review:', error)
      );
    }
  }
}
