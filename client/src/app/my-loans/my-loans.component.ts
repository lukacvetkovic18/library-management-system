import { Component } from '@angular/core';
import { DataTransferService } from '../services/data-transfer.service';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoanService } from '../services/loan.service';
import { Loan } from '../models/loan';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.css'
})
export class MyLoansComponent {
  loans: Loan[] = [];
  isSidebarHidden = false;

  constructor(
    private loanService: LoanService,
    private dataTransferService: DataTransferService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUserLoans();
  }

  loadUserLoans(): void {
    this.loanService.getUsersLoans().subscribe(
      (data) => {
        data.forEach((loan: any) => {
          this.loans.push({
            id: loan.id,
            userId: loan.user.id,
            bookId: loan.book.id,
            name: loan.book.name,
            author: loan.book.author,
            img_paths: loan.book.img_paths,
            username: loan.user.username,
            issueDate: new Date(loan.issueDate),
            dueDate: new Date(loan.dueDate),
            returnDate: loan.returnDate === 0 ? null : new Date(loan.returnDate),
            loanStatus: loan.loanStatus
          })
        });
        console.log(this.loans)
      },
      (error) => {
        console.error('Error fetching user loans:', error);
      }
    );
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  viewBookDetails(bookId: number): void {
    this.dataTransferService.setBookId(bookId);
    this.router.navigate(['/book-details']);
  }

  transformDate(date: Date) {
    console.log(date)
    if (!date) {
      return '';
    }
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if necessary
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1
    const year = date.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return '#379e23';
      case 'completed':
        return '#ccc';
      case 'canceled':
        return '#8a4b13';
      case 'overdue':
        return '#a11a1a';
      default:
        return '##333';
    }
  }
}
