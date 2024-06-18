import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private token = localStorage.getItem('token'); // Retrieve the token from localStorage
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,  // Use Bearer authentication scheme
    'Content-Type': 'application/json'
  });
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Admin routes
  getAllReviews(skip?: number, take?: number): Observable<any> {
    let params = new HttpParams();

    if (skip !== undefined) {
      params = params.append('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.append('take', take.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/admin/reviews`, { headers: this.headers, params: params });
  }

  getReviewById(reviewId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/reviews/${reviewId}`, { headers: this.headers });
  }

  addReview(review: { userId: number, bookId: number, rating: number, comment: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/reviews`, review, { headers: this.headers });
  }

  removeReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/reviews/${reviewId}`, { headers: this.headers });
  }

  updateReview(review: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/reviews`, review, { headers: this.headers });
  }

  //User routes
  getUsersReviews(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reviews`, { headers: this.headers });
  }

  getUsersReviewById(reviewId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reviews/${reviewId}`, { headers: this.headers });
  }

  reviewBook(review: { bookId: number, rating: number, comment: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reviews`, review, { headers: this.headers });
  }

  editBookReview(review: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reviews`, review, { headers: this.headers });
  }

  removeBookReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reviews/${reviewId}`, { headers: this.headers });
  }

  getReviewsOfBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reviews/book/${bookId}`, { headers: this.headers });
  }

  canReviewBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reviews/canReview/${bookId}`, { headers: this.headers });
  }
}
