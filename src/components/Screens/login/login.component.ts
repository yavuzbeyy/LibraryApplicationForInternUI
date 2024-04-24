import { Component } from '@angular/core';
import { DataService } from '../../Shared/services/DataService'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  onSubmit(): void {
    if (this.username && this.password) {
      this.dataService.login(this.username, this.password).subscribe(
        response => {
          console.log(response.message);
          if (response.success) {
            
            const token = response.message; // Tokeni alma
            console.log(token);
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', token)
            }
            this.router.navigate(['/book']).then(() => {
              window.location.reload(); // navbarı güncellemek için sayfayı yenile
            });
          } else {
            this.errorMessage = 'Kullanıcı adı veya şifre yanlış.';
          }
        },
        error => {
          this.errorMessage = 'Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.';
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'Lütfen kullanıcı adı ve şifreyi girin.';
    }
  }
}
