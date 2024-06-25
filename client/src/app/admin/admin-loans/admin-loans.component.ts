import { Component, HostListener } from '@angular/core';
import { Loan } from '../../models/loan';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-loans',
  templateUrl: './admin-loans.component.html',
  styleUrl: './admin-loans.component.css'
})
export class AdminLoansComponent {
  loans: Loan[] = [];
  sort = "";
  loanStatusFilter = "";
  usernameFilter = "";
  isScrolled = false;

  constructor(
    private loanService: LoanService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadLoans();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loadLoans(): void {
    this.loanService.getAllLoans(0, 50).subscribe(
      (data) => {
        this.loans = [];
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
  
  searchLoans(): void {
    this.loanService.getAllLoans(0, 50, this.usernameFilter, this.loanStatusFilter, this.sort).subscribe(
      (data) => {
        this.loans = [];
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
      },
      (error) => {
        console.error('Error fetching user loans:', error);
      }
    );
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

  shouldMarkAsOverdue(loan: Loan): boolean {
    return (loan.dueDate < new Date()) && (loan.loanStatus === "active");
  }

  changeLoanStatus(loanId: number, loanStatus: string) {
    const loanData = {
      loanId: loanId,
      loanStatus: loanStatus
    }
    if (confirm('Are you sure you want to change the status of this loan?')) {
      this.loanService.changeLoanStatus(loanData).subscribe(
        (data) => {
          this.searchLoans();
        },
        (error) => {
          console.error('Error updating loans status:', error);
        }
      );
    }
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshold = 100;
    this.isScrolled = window.scrollY > threshold;
  }

}