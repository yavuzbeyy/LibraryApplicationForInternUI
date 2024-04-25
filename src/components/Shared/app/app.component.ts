import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../Screens/Auth/AuthService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public Editor: any; 
  username: string | null = null;
  decodedToken: any = null; 
  role: number | null = null;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: any 
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.login();
      this.decodeToken(token);
      this.isAdmin = this.authService.isAdmin(token);
    } else {
      console.log('Token not found');
      this.router.navigate(['/login']);
    }

    // Load CKEditor only on the browser
    if (isPlatformBrowser(this.platformId)) {
      import('@ckeditor/ckeditor5-build-classic').then(ClassicEditor => {
        this.Editor = ClassicEditor.default;
      }).catch(error => {
        console.error('Error loading CKEditor:', error);
      });
    }
  }

  decodeToken(token: string): void {
    try {
      this.decodedToken = jwtDecode(token);
      this.username = this.decodedToken.username;
      this.role = this.decodedToken.roles;
      this.router.navigate(['/book']);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
