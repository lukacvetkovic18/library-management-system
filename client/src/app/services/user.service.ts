import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token = localStorage.getItem('token'); // Retrieve the token from localStorage
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,  // Use Bearer authentication scheme
    'Content-Type': 'application/json'
  });
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  register(user: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    address: string
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/logout`, {}, {
      withCredentials: true
    });
  }

  // Admin routes
  getAllUsers(skip?: number, take?: number, firstNamePart?: string, lastNamePart?: string, usernamePart?: string): Observable<any> {
    let params = new HttpParams();

    if (skip !== undefined) {
      params = params.append('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.append('take', take.toString());
    }
    if (firstNamePart !== undefined) {
      params = params.append('firstNamePart', firstNamePart);
    }
    if (lastNamePart !== undefined) {
      params = params.append('lastNamePart', lastNamePart);
    }
    if (usernamePart !== undefined) {
      params = params.append('usernamePart', usernamePart);
    }

    return this.http.get<any>(`${this.apiUrl}/admin/users`, { headers: this.headers, params: params });
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/users/${userId}`, { headers: this.headers });
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/users`, user, { headers: this.headers });
  }

  removeUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/users/${userId}`, { headers: this.headers });
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/users`, user, { headers: this.headers });
  }

  updateUserPassword(user: { id: number, password: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/users/password`, user, { headers: this.headers });
  }

  // User routes
  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  selfDeleteUser(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users`, { headers: this.headers });
  }

  updateUserInfo(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users`, user , { headers: this.headers });
  }

  updateProfilePicture(imagePath: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/profilePicture`, {imagePath}, { headers: this.headers });
  }

  contactAdmin(emailData: { subject: string, text: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/contact`, emailData, { headers: this.headers });
  }
}
