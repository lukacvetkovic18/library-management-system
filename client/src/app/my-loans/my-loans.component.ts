import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { DataTransferService } from '../services/data-transfer.service';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import { Loan } from '../models/loan';
import { NotificationService } from '../services/notification.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.css'
})
export class MyLoansComponent {
  @ViewChild('notificationDialog') notificationDialog!: TemplateRef<any>;

  loans: Loan[] = [];
  isSidebarHidden = false;
  dialogRef!: MatDialogRef<any>;
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
    private loanService: LoanService,
    private dataTransferService: DataTransferService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUserLoans();
    this.loadNotifications();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadUserLoans(): void {
    this.loanService.getUsersLoans().subscribe(
      (data) => {
        data.forEach((loan: any) => {
          this.loans.push({
            id: loan.id,
            userId: loan.user.id,
            bookId: loan.book.id,
            name: loan.book.name,
            author: loan.book.author,
            img_paths: loan.book.img_paths,
            username: loan.user.username,
            issueDate: new Date(loan.issueDate),
            dueDate: new Date(loan.dueDate),
            returnDate: loan.returnDate === 0 ? null : new Date(loan.returnDate),
            loanStatus: loan.loanStatus
          })
        });
        console.log(this.loans)
      },
      (error) => {
        console.error('Error fetching user loans:', error);
      }
    );
  }

  loadNotifications(): void {
    this.notificationService.getUsersNotifications().subscribe((data) => {
      this.notifications = data.slice(0, 5);
      this.unreadNotificationsNumber = data.filter((notification: any) => !notification.isRead).length;
    });
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
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

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return '#379e23';
      case 'completed':
        return '#ccc';
      case 'canceled':
        return '#8a4b13';
      case 'overdue':
        return '#a11a1a';
      default:
        return '##333';
    }
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
