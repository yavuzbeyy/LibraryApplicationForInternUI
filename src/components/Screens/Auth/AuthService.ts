// auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  username: string | null = null;
  role: string = '';

  constructor(private router: Router) {}

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUserId(): number | undefined {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.UserId;
      console.log(userId)
      return userId;
    } else {
      return undefined;
    }
  }
  

  isAdmin(token : string):boolean{
     const decodedToken: any = jwtDecode(token);
    this.role = decodedToken.roles;
    console.log("Rol :" + this.role)
    if(this.role === '1'){
        return true;
    }else{
        return false;
    }
  }

  decodeToken(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token); // Token'i çöz
      this.username = decodedToken.username;
      this.role = decodedToken.roles;
  
      console.log('Decoded Token:', decodedToken);
    
      this.router.navigate(['/book']); 
    } catch (error) {
      console.error('Error decoding token:', error);
      this.router.navigate(['/login']);
    }
  }
}
