import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrl: './admin-books.component.css'
})
export class AdminBooksComponent {
  @ViewChild('bookDialog') bookDialog!: TemplateRef<any>;

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
  isScrolled = false;
  nameSuggestions: string[] = [];
  isNameInputFocused = false;
  authorSuggestions: string[] = [];
  isAuthorInputFocused = false;
  selectedBook: any = {
    id: 0,
    name: '',
    author: '',
    format: '',
    book_depository_stars: 0,
    price: 0,
    isbn: '',
    category: '',
    totalCopies: 0,
    availableCopies: 0
  };
  isEditMode = false;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private bookService: BookService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadBooks();
    this.loadBookCategories();
    this.loadBookFormats();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  loadBooks(): void {
    this.bookService.getBooks(0, 50).subscribe((data) => {
      this.books = data;
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
    
    if (!isNameInputClicked) {
      this.isNameInputFocused = false;
      this.nameSuggestions = [];
    }

    if (!isAuthorInputClicked) {
      this.isAuthorInputFocused = false;
      this.authorSuggestions = [];
    }
  }

  openBookDialog(book?: Book): void {
    if (book) {
      this.isEditMode = true;
      this.selectedBook = {
        id: book.id,
        name: book.name,
        author: book.author,
        format: book.format,
        book_depository_stars: book.book_depository_stars,
        price: book.price,
        isbn: book.isbn,
        category: book.category,
        totalCopies: book.totalCopies,
        availableCopies: book.availableCopies,
        img_paths: book.img_paths || ''
      };
    } else {
      this.isEditMode = false;
      this.selectedBook = {
        name: '',
        author: '',
        format: '',
        book_depository_stars: 0,
        price: 0,
        isbn: '',
        category: '',
        totalCopies: 0,
        availableCopies: 0,
        img_paths: ''
      };
    }
    this.dialogRef = this.dialog.open(this.bookDialog, {
      width: 'max-content'
    });
    // this.dialogRef.afterClosed().subscribe(result => {
    //   if (result === 'save') {
    //     this.saveBook();
    //   } else if (result === 'delete') {
    //     this.deleteBook();
    //   } else {
    //     this.searchBooks();
    //   }
    // });
  }

  saveBook(): void {
    this.bookService.updateBook(this.selectedBook).subscribe(() => {
      this.searchBooks();
      this.dialogRef.close();
    });
  }

  addBook(): void {
    this.bookService.addBook(this.selectedBook).subscribe(() => {
      this.searchBooks();
      this.dialogRef.close();
    });
  }

  deleteBook(): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.removeBook(this.selectedBook.id).subscribe(() => {
        this.searchBooks();
        this.dialogRef.close();
      });
    }
  }

}
