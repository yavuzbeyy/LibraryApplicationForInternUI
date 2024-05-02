import { Component } from '@angular/core';
import { DataService } from '../../../Shared/services/DataService';
import { AuthorModel } from '../../../Shared/Models/AuthorModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AlertService } from '../../../Shared/Alert/alert.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent {
  author: AuthorModel = new AuthorModel();

  constructor(
    private dataService: DataService, 
    private toastr: ToastrService,
    private router: Router,
    private alertService: AlertService
  ) {}

  submitForm() {
    // Yazar ekleme işlemini onaylamak için AlertService'den acceptOrDecline metodunu kullanalım
    this.alertService.acceptOrDecline('Yazarı Ekle', 'Bu yazarı eklemek istediğinizden emin misiniz?', 'warning')
      .then((result) => {
        if (result) {
          // Kullanıcı işlemi onayladıysa yazarı ekle
          this.dataService.createAuthor(this.author).subscribe(
            (response) => {
              this.dataService.showSuccessMessage(response);
              // this.router.navigate(['/authors']);
            },
            (error) => {
              this.dataService.showFailMessage(error);
            }
          );
        } else {
          // Kullanıcı işlemi iptal etti
          console.log('Yazar ekleme işlemi iptal edildi.');
        }
      });
  }
}
