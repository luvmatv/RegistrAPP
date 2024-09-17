import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userEmail!: string;

  constructor() {}

  login(email: string, password: string): boolean {
    if (email === 'admin' && password === '123') {
      this.userEmail = email; 
      return true;
    }
    return false;
  }

  getUserEmail(): string {
    return this.userEmail;  
  }
}