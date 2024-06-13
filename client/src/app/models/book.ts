export interface Book {
  id: number;
  name: string;
  author: string;
  format: string;
  book_depository_stars: number;
  price: number;
  isbn: string;
  category: string;
  img_paths: string;
  totalCopies: number;
  availableCopies: number;
}

export interface BookCategory {
  id: number;
  name: string;
  isChecked: boolean;
}

export interface BookFormat {
  id: number;
  name: string;
  isChecked: boolean;
}