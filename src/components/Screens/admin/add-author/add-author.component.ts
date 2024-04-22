import { Component } from '@angular/core';
import { DataService } from '../../../Shared/services/DataService';
import { AuthorModel } from '../../../Shared/Models/AuthorModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss']
})
export class AddAuthorComponent {
  author: AuthorModel = new AuthorModel();

  constructor(private dataService: DataService, private toastr: ToastrService) {}

  submitForm() {
    this.dataService.createAuthor(this.author).subscribe(
      (response) => {
        console.log('Author added successfully!', response);
        this.toastr.success('Author added successfully!', 'Success');
        // Başka bir işlem yapabilirsiniz (örneğin başka bir sayfaya yönlendirme)
      },
      (error) => {
        console.error('Error adding author:', error);
        this.toastr.error('Error adding author. Please try again.', 'Error');
        // Hata durumunda kullanıcıya bildirim gösterilebilir
      }
    );
  }
}
