// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
    // Burada giriş işlemleri yapılabilir: API çağrısı, token yönetimi vs.
  }

  logout() {
    this.isLoggedIn = false;
    // Oturumu kapatma işlemleri
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
