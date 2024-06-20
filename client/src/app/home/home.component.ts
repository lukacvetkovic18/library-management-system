import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { DataTransferService } from '../services/data-transfer.service';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('notificationDialog') notificationDialog!: TemplateRef<any>;

  user!: User;
  books: Book[] | null = null;
  categories: string[] = [];
  formats: string[] = [];
  skip = 0;
  take = 50;
  nameQuery = "";
  authorQuery = "";
  selectedFormats: string[] = [];
  selectedCategories: string[] = [];
  sort = "";
  pageNumber = 1;
  isSidebarHidden = false;
  isScrolled = false;
  nameSuggestions: string[] = [];
  isNameInputFocused = false;
  authorSuggestions: string[] = [];
  isAuthorInputFocused = false;
  notifications: Notification[] = [];
  showNotifications = false;
  showNotificationPopup = false;
  // selectedNotification: Notification | null = null;
  dialogRef!: MatDialogRef<any>;
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
    private dataTransferService: DataTransferService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadBooks();
    this.loadBookCategories();
    this.loadBookFormats();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadUser(): void {
    this.userService.getUserInfo().subscribe((data) => {
      this.user = data;
      this.loadNotifications();
    })
  }
  
  loadBooks(): void {
    this.bookService.getBooks(0, 50).subscribe((data) => {
      this.books = data;
      console.log(this.books)
    });
  }
  
  loadBookCategories(): void {
    this.bookService.getBookCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  
  loadBookFormats(): void {
    this.bookService.getBookFormats().subscribe((data) => {
      this.formats = data;
    });
  }

  loadNotifications(): void {
    this.notificationService.getUsersNotifications().subscribe((data) => {
      this.notifications = data.slice(0, 5);
      this.unreadNotificationsNumber = data.filter((notification: any) => !notification.isRead).length;
    });
  }

  setSelectedFormats() {
    var checkboxes = document.querySelectorAll('#format-dropdown input[type="checkbox"]');
    this.selectedFormats = [];
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.selectedFormats.push(checkbox.value);
      }
    });
  }

  setSelectedCategories() {
    var checkboxes = document.querySelectorAll('#category-dropdown input[type="checkbox"]');
    this.selectedCategories = [];
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.selectedCategories.push(checkbox.value);
      }
    });
  }
  
  searchBooks(): void {
    this.setSelectedFormats();
    this.setSelectedCategories();
    this.bookService.getBooks(this.skip, this.take, this.selectedCategories, this.selectedFormats, this.nameQuery, this.authorQuery, this.sort).subscribe((data) => {
      this.books = data;
    });
  }

  nextPage(): void {
    this.pageNumber++;
    this.skip += this.take;
    this.searchBooks();
  }

  previousPage(): void {
    if (this.skip > 0) {
      this.pageNumber--;
      this.skip -= this.take;
      this.searchBooks();
    }
  }

  resetPage(): void {
    this.pageNumber = 1;
    this.skip = 0;
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    this.isScrolled = window.scrollY > threshold;
  }

  getBookSuggestions(namePart: string): void {
    if (namePart.length > 2) {
        of(namePart).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => this.bookService.getBookSuggestions(term)),
            catchError(error => {
                console.error(error);
                return of([]);
            })
        ).subscribe(suggestions => this.nameSuggestions = suggestions);
    } else {
        this.nameSuggestions = [];
    }
  }

  getAuthorSuggestions(namePart: string): void {
    if (namePart.length > 2) {
        of(namePart).pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term => this.bookService.getAuthorSuggestions(term)),
            catchError(error => {
                console.error(error);
                return of([]);
            })
        ).subscribe(suggestions => this.authorSuggestions = suggestions);
    } else {
        this.authorSuggestions = [];
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const isNameInputClicked = !!target.closest('.name-input-group');
    const isAuthorInputClicked = !!target.closest('.author-input-group');
    const isNotificationsDropdownClicked = !!target.closest('#notificationsDropdown');
    const isNotificationButtonClicked = !!target.closest('.notification-btn');
    
    if (!isNameInputClicked) {
      this.isNameInputFocused = false;
      this.nameSuggestions = [];
    }

    if (!isAuthorInputClicked) {
      this.isAuthorInputFocused = false;
      this.authorSuggestions = [];
    }


    if (!isNotificationsDropdownClicked && !isNotificationButtonClicked) {
      this.showNotifications = false;
    }
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  viewBookDetails(bookId: number): void {
    this.dataTransferService.setBookId(bookId);
    this.router.navigate(['/book-details']);
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
