import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private token = localStorage.getItem('token'); // Retrieve the token from localStorage
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,  // Use Bearer authentication scheme
    'Content-Type': 'application/json'
  });
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Admin routes
  getAllLoans(skip?: number, take?: number, namePart?: string, loanStatus?: string, sort?: string): Observable<any> {
    let params = new HttpParams();

    if (skip !== undefined) {
      params = params.append('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.append('take', take.toString());
    }
    if (namePart !== undefined) {
      params = params.append('namePart', namePart);
    }
    if (loanStatus !== undefined) {
      params = params.append('loanStatus', loanStatus);
    }
    if (sort !== undefined) {
      params = params.append('sort', sort);
    }

    return this.http.get<any>(`${this.apiUrl}/admin/loans`, { headers: this.headers, params: params });
  }

  getLoanById(loanId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/loans/${loanId}`, { headers: this.headers });
  }

  addLoan(loan: { userId: number, bookId: number, issueDate: number, dueDate: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/loans`, loan, { headers: this.headers });
  }

  removeLoan(loanId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/loans/${loanId}`, { headers: this.headers });
  }

  updateLoan(loan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/loans`, loan, { headers: this.headers });
  }

  changeLoanStatus(loan: { loanId: number, loanStatus: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/loans/status`, loan, { headers: this.headers });
  }

  //User routes
  getUsersLoans(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/loans`, { headers: this.headers });
  }

  getUsersLoanById(loanId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/loans/${loanId}`, { headers: this.headers });
  }

  loanBook(loan: { bookId: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/loans`, loan, { headers: this.headers });
  }

  canLoanBook(bookId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/loans/canLoan/${bookId}`, { headers: this.headers });
  }
}
