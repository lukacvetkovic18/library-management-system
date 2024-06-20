import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private token = localStorage.getItem('token'); // Retrieve the token from localStorage
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,  // Use Bearer authentication scheme
    'Content-Type': 'application/json'
  });
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Admin routes
  getAllNotifications(skip?: number, take?: number): Observable<any> {
    let params = new HttpParams();

    if (skip !== undefined) {
      params = params.append('skip', skip.toString());
    }
    if (take !== undefined) {
      params = params.append('take', take.toString());
    }

    return this.http.get<any>(`${this.apiUrl}/admin/notifications`, { headers: this.headers, params: params });
  }

  getNotificationById(notificationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/notifications/${notificationId}`, { headers: this.headers });
  }

  addNotification(notification: { userId: number, notificationDate: number, title: string, content: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/notifications`, notification, { headers: this.headers });
  }

  removeNotification(notificationId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/notifications/${notificationId}`, { headers: this.headers });
  }

  updateNotification(notification: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/admin/notifications`, notification, { headers: this.headers });
  }

  //User routes
  getUsersNotifications(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notifications`, { headers: this.headers });
  }

  getUsersNotificationById(notificationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notifications/${notificationId}`, { headers: this.headers });
  }

  readNotification(notificationId: number ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/notifications/read`, { notificationId }, { headers: this.headers });
  }
}
