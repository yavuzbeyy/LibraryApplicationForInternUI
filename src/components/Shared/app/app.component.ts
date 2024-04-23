import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.decodeToken(token);
    } else {
      console.log('Token not found');
      this.router.navigate(['/login']);
    }
  }

  decodeToken(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token); // Token'i çöz
      this.username = decodedToken.username;
  
      console.log('Decoded Token:', decodedToken);
  
      this.router.navigate(['/book']); // Örnek bir yönlendirme
    } catch (error) {
      console.error('Error decoding token:', error);
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
