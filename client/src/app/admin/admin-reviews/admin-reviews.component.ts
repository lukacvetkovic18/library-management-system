import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Review } from '../../models/review';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-reviews',
  templateUrl: './admin-reviews.component.html',
  styleUrl: './admin-reviews.component.css'
})
export class AdminReviewsComponent {
  @ViewChild('reviewDialog') reviewDialog!: TemplateRef<any>;

  reviews: Review[] = [];
  sort = "";
  usernameFilter = "";
  bookNameFilter = "";
  isScrolled = false;
  selectedReview = {
    id: 0,
    reviewDate: 0,
    rating: 0,
    comment: ''
  };
  ratings = [1, 2, 3, 4, 5];
  dialogRef!: MatDialogRef<any>;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadReviews();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe(
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
        console.error('Error fetching reviews:', error);
      }
    );
  }

  searchReviews(): void {
    this.reviewService.getAllReviews(0, 50, this.usernameFilter, this.bookNameFilter, this.sort).subscribe(
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
        console.error('Error fetching reviews:', error);
      }
    );
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
    this.dialogRef = this.dialog.open(this.reviewDialog, {
      width: 'max-content'
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
    this.reviewService.updateReview(review).subscribe(
      () => this.searchReviews(),
      error => console.error('Error updating review:', error)
    );
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.removeReview(reviewId).subscribe(
        () => this.searchReviews(),
        error => console.error('Error deleting review:', error)
      );
    }
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    this.isScrolled = window.scrollY > threshold;
  }

}
