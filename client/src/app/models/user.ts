export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone: string | null;
    address: string | null;
    registrationDate: Date;
    imagePath: string | null;
    isAdmin: boolean;
    loansLeft: number;
  }