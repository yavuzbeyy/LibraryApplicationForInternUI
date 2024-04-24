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

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.username && this.password) {
      this.dataService.login(this.username, this.password).subscribe(
        response => {
          console.log(response.message);
          if (response.success) {
            const token = response.message;

            localStorage.setItem('token', token);

            this.dataService.showSuccessMessage(response);

            setTimeout(() => {
              this.router.navigate(['/book']).then(() => {
                window.location.reload(); 
              });
            }, 1000); //1 Saniye bekletip gidelim
          } else {
            this.dataService.showFailMessage(response);
          }
        },
        error => {
          this.errorMessage = 'Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.';
          this.dataService.showFailMessage(error);
        }
      );
    } else {
      this.errorMessage = 'Lütfen kullanıcı adı ve şifreyi girin.';
    }
  }
}
