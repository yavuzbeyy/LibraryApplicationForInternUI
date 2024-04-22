import { Component } from '@angular/core';
import { DataService } from '../../../Shared/services/DataService';
import { CategoryModel } from '../../../Shared/Models/CategoryModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  category: CategoryModel = new CategoryModel();

  constructor(private dataService: DataService, private toastr: ToastrService) {}

  submitForm() {
    this.dataService.createCategory(this.category).subscribe(
      (response) => {
        console.log(response.message, response);
        this.toastr.success(response.message, 'Success', {
          positionClass: 'toast-top-right' 
        });
  
      },
      (error) => {
        console.error(error.message, error);
        this.toastr.error(error.message, 'Error', {
          positionClass: 'toast-top-right' 
        });
       
      }
    );
  }
}
