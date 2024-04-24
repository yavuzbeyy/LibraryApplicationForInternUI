import { Component } from '@angular/core';
import { DataService } from '../../Shared/services/DataService'; 
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
    private router: Router,
    private toastr: ToastrService
  ) { }

  onSubmit(): void {
    if (this.username && this.password) {
      this.dataService.login(this.username, this.password).subscribe(
        response => {
          console.log(response.message);
          if (response.success) {
            const token = response.message;

            localStorage.setItem('token', token);

            this.toastr.success("Yönlendiriliyor...", 'Başarılı', {
              positionClass: 'toast-top-right' 
            });

            setTimeout(() => {
              this.router.navigate(['/book']).then(() => {
                window.location.reload(); 
              });
            }, 1000); //1 Saniye bekletip gidelim
          } else {
            this.toastr.error("Kullanıcı adı veya şifre hatalı", 'Başarısız', {
              positionClass: 'toast-top-right' 
            });
          }
        },
        error => {
          this.errorMessage = 'Giriş yaparken bir hata oluştu. Lütfen tekrar deneyin.';
          this.toastr.error("Kullanıcı adı veya şifre hatalı", 'Başarısız', {
            positionClass: 'toast-top-right' 
          });
        }
      );
    } else {
      this.errorMessage = 'Lütfen kullanıcı adı ve şifreyi girin.';
    }
  }
}
