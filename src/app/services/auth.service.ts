import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userName: string | null = null;
  private userEmail: string | null = null;

  constructor(private storageService: StorageService) {}

  // Método de login
  async login(email: string, password: string): Promise<boolean> {
    const storedEmail = await this.storageService.get('userEmail');
    const storedPassword = await this.storageService.get('userPassword');

    if (email === storedEmail && password === storedPassword) {
      this.userEmail = email; 
      this.userName = await this.storageService.get('userName');  
      // Guardar en Storage para persistencia en futuras sesiones
      await this.storageService.set('userEmail', email);
      await this.storageService.set('userName', this.userName);
      return true;
    }
    return false;
  }

  // Obtener correo del usuario
  getUserEmail(): string | null {
    return this.userEmail;  
  }

  // Obtener nombre del usuario
  getUserName(): string | null {
    return this.userName;  
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return this.userEmail !== null; 
  }

  // Método para cerrar sesión
  async logout() {
    this.userEmail = null;
    this.userName = null;
    await this.storageService.remove('userEmail');
    await this.storageService.remove('userName');
  }
}
