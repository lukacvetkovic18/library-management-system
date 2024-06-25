import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { ProfileComponent } from './profile/profile.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ContactComponent } from './contact/contact.component';
import { AdminLoansComponent } from './admin/admin-loans/admin-loans.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'home', component: HomeComponent },
  { path: 'book-details', component: BookDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'my-loans', component: MyLoansComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin/loans', component: AdminLoansComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'admin/books', component: AdminBooksComponent },
  { path: 'admin/reviews', component: AdminReviewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
