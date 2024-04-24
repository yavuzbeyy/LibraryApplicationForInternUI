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
        this.dataService.showSuccessMessage(response);
      },
      (error) => {
        this.dataService.showFailMessage(error);
      }
    );
  }
}
