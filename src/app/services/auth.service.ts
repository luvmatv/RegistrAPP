import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName: string | null = null;
  private userEmail: string | null = null;

  constructor(private storageService: StorageService) {}

  async login(email: string, password: string): Promise<boolean> {
    const storedEmail = await this.storageService.get('userEmail');
    const storedPassword = await this.storageService.get('userPassword');

    if (email === storedEmail && password === storedPassword) {
      this.userEmail = email; 
      this.userName = await this.storageService.get('userName');  
      return true;
    }
    return false;
  }

  getUserEmail(): string | null {
    return this.userEmail;  
  }

  getUserName(): string | null {
    return this.userName;  
  }
}
