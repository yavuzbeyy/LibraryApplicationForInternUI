import { Component } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { UserCreateModel } from '../../Shared/Models/UserCreateModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: UserCreateModel = new UserCreateModel(); 
  errorMessage: string = ''; 

  constructor(private dataService: DataService,private router: Router) {}

  createUser() {
    this.dataService.createUser(this.user).subscribe(
      response => {
        console.log(response.message, response);
        this.router.navigate(['/login'])
      },
      error => {
        console.error(error.message, error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyiniz.';
        }
      }
    );
  }
}
