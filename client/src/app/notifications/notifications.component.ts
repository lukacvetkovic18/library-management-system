import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Notification } from '../models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  @ViewChild('notificationDialog') notificationDialog!: TemplateRef<any>;

  notifications: Notification[] = [];
  isSidebarHidden = false;
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
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadNotifications();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadNotifications(): void {
    this.notificationService.getUsersNotifications().subscribe((data) => {
      this.notifications = data;
      this.unreadNotificationsNumber = this.notifications.filter(notification => !notification.isRead).length;
    });
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
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
