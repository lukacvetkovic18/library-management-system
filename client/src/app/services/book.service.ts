import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private token = localStorage.getItem('token'); // Retrieve the token from localStorage
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,  // Use Bearer authentication scheme
    'Content-Type': 'application/json'
  });
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getBooks(skip?: number, take?: number, categories?: string[], formats?: string[], namePart?: string, authorPart?: string, sort?: string): Observable<any> {
    let params = new HttpParams();

    if (skip !== undefined) {
      params = params.append('skip', skip);
    }
    if (take !== undefined) {
      params = params.append('take', take);
    }
    if (categories && categories.length > 0) {
      categories.forEach(category => {
        params = params.append('categories', category);
      });
    }
    if (categories && categories.length > 0) {
      categories.forEach(category => {
        params = params.append('categories', category);
      });
    }
    if (formats && formats.length > 0) {
      formats.forEach(format => {
        params = params.append('formats', format);
      });
    }
    if (namePart) {
      params = params.append('namePart', namePart);
    }
    if (authorPart) {
      params = params.append('authorPart', authorPart);
    }
    if (sort) {
      params = params.append('sort', sort);
    }

    return this.http.get<any>(`${this.apiUrl}/books`, { headers: this.headers, params: params });
  }

  getBookSuggestions(namePart: string): Observable<string[]> {
    let params = new HttpParams().set('namePart', namePart);
    return this.http.get<string[]>(`${this.apiUrl}/books/name-suggestions`, { headers: this.headers, params: params });
  }

  getAuthorSuggestions(namePart: string): Observable<string[]> {
    let params = new HttpParams().set('namePart', namePart);
    return this.http.get<string[]>(`${this.apiUrl}/books/author-suggestions`, { headers: this.headers, params: params });
  }

  getBookById(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books/${bookId}`, { headers: this.headers });
  }

  // Admin routes
  addBook(book: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/books`, book, { headers: this.headers });
  }

  removeBook(bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/books/${bookId}`, { headers: this.headers });
  }

  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/books`, book, { headers: this.headers });
  }

  getBookFormats(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books/formats`, { headers: this.headers });
  }

  getBookCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books/categories`, { headers: this.headers });
  }

}
