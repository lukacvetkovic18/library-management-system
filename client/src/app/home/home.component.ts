import { Component, HostListener } from '@angular/core';
import { Book } from '../models/book';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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

  constructor(
    private userService: UserService,
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadBooks();
    this.loadBookCategories();
    this.loadBookFormats();
  }

  loadUser(): void {
    this.userService.getUserInfo().subscribe((data) => {
      this.user = data;
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

  setSelectedFormats() {
    var checkboxes = document.querySelectorAll('#format-dropdown input[type="checkbox"]');
    this.selectedFormats = [];
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.selectedFormats.push(checkbox.value);
      }
    });
    // console.log(this.selectedFormats)
  }

  setSelectedCategories() {
    var checkboxes = document.querySelectorAll('#category-dropdown input[type="checkbox"]');
    this.selectedCategories = [];
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked) {
        this.selectedCategories.push(checkbox.value);
      }
    });
    // console.log(this.selectedCategories)
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
    const threshold = 100; // Set threshold for shrinking effect
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
    
    if (!isNameInputClicked) {
      this.isNameInputFocused = false;
      this.nameSuggestions = [];
    }

    if (!isAuthorInputClicked) {
      this.isAuthorInputFocused = false;
      this.authorSuggestions = [];
    }
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
