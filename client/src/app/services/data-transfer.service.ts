import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private bookIdSource = new BehaviorSubject<number | null>(null);
  currentBookId = this.bookIdSource.asObservable();

  constructor() { }

  setBookId(bookId: number) {
    this.bookIdSource.next(bookId);
  }

  getBookId(): number | null {
    return this.bookIdSource.value;
  }
}
