import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { Book } from '../models/book';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { DataTransferService } from '../services/data-transfer.service';
import { LoanService } from '../services/loan.service';
import { Review } from '../models/review';
import { ReviewService } from '../services/review.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {
  @ViewChild('reviewDialog') reviewDialog!: TemplateRef<any>;
  @ViewChild('notificationDialog') notificationDialog!: TemplateRef<any>;

  user!: User;
  book!: Book;
  isSidebarHidden = false;
  reviews: Review[] = [];
  userReview: Review | null | undefined = null;
  selectedReview = {
    id: 0,
    bookId: 0,
    reviewDate: 0,
    rating: 0,
    comment: ''
  };
  ratings = [1, 2, 3, 4, 5];
  dialogRef!: MatDialogRef<any>;
  canReview: { flag: boolean, message: string } | null = null;
  canLoan: { flag: boolean, message: string } | null = null;
  notifications: Notification[] = [];
  showNotifications = false;
  showNotificationPopup = false;
  selectedNotification = {
    id: 0,
    userId: 0,
    username: '',
    notificationDate: new Date(),
    title: '',
    content: '',
    isRead: false
  };
  unreadNotificationsNumber = 0;

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private loanService: LoanService,
    private dataTransferService: DataTransferService,
    private reviewService: ReviewService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
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
      this.loadBook();
      this.loadNotifications();
    })
  }
  
  loadBook(): void {
    const bookId = this.dataTransferService.getBookId();
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((data) => {
        this.book = data;
        this.loadReviews();
      });
    } else {
      this.router.navigate(['/home']);
    }
  }

  loadReviews(): void {
    this.reviewService.getReviewsOfBook(this.book.id).subscribe(
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
        this.userReview = this.reviews.find(((review: any) => review.userId === this.user.id))
        this.reviews = this.reviews.filter(review => review.userId !== this.user.id)
        this.canReviewBook();
      },
      (error) => {
        console.error('Error fetching book reviews:', error);
      }
    );
  }

  loadNotifications(): void {
    this.notificationService.getUsersNotifications().subscribe((data) => {
      this.notifications = data.slice(0, 5);
      this.unreadNotificationsNumber = data.filter((notification: any) => !notification.isRead).length;
    });
  }


  canReviewBook(): void {
    this.reviewService.canReviewBook(this.book.id).subscribe((data) => {
      this.canReview = data;
      this.canLoanBook();
    })
  }

  canLoanBook(): void {
    this.loanService.canLoanBook(this.book.id).subscribe((data) => {
      this.canLoan = data;
    })
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  loanBook(): void {
    const confirmation = window.confirm('Are you sure you want to loan this book?');
    if (confirmation) {
      const loan = { bookId: this.book.id };
      this.loanService.loanBook(loan).subscribe({
        next: (response) => {
          alert('Book loaned successfully!');
          this.canReviewBook();
        },
        error: (error) => {
          alert('Failed to loan the book.');
        }
      });
    }
  }

  transformDate(date: Date) {
    if (!date) {
      return '';
    }
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if necessary
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  openReviewDialog(review: Review | null = null): void {
    if (review) {
    this.selectedReview = {
      id: review.id,
      bookId: 0,
      reviewDate: Date.now(),
      rating: review.rating,
      comment: review.comment
     };
    } else {
      this.selectedReview = {
        id: 0,
        bookId: this.book.id,
        reviewDate: Date.now(),
        rating: 0,
        comment: ''
      };
    }
    this.dialogRef = this.dialog.open(this.reviewDialog, {
      width: '500px'
    });
  }

  saveReview(): void {
    if (this.selectedReview.id) {
      this.reviewService.editBookReview(this.selectedReview).subscribe(() => {
        this.loadReviews();
        this.dialogRef.close();
      });
    } else {
      const res = {
        bookId: this.selectedReview.bookId,
        rating: this.selectedReview.rating,
        comment: this.selectedReview.comment
      }
      this.reviewService.reviewBook(res).subscribe(() => {
        this.loadReviews();
        this.dialogRef.close();
      });
    }
  }

  cancelReview(): void {
    this.dialogRef.close();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const isNotificationsDropdownClicked = !!target.closest('#notificationsDropdown');
    const isNotificationButtonClicked = !!target.closest('.notification-btn');

    if (!isNotificationsDropdownClicked && !isNotificationButtonClicked) {
      this.showNotifications = false;
    }
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  openNotificationDialog(notification: Notification): void {
    this.selectedNotification = {
      id: notification.id,
      userId: notification.userId,
      username: notification.username,
      notificationDate: new Date(),
      title: notification.title,
      content: notification.content,
      isRead: notification.isRead
    };
    this.showNotifications = false;
    this.dialogRef = this.dialog.open(this.notificationDialog, {
      width: 'match-content',
      maxWidth: '500px'
    });
  }

  exitNotification(): void {
    this.dialogRef.close();
  }

  readNotification(notificationId: number): void {
    this.notificationService.readNotification(notificationId).subscribe((data) => {
      this.loadNotifications();
    })
  }
}
