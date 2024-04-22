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
        console.log('Category added successfully!', response);
        this.toastr.success('Category added successfully!', 'Success', {
          positionClass: 'toast-top-right' 
        });
  
      },
      (error) => {
        console.error('Error adding category:', error);
        this.toastr.error('Error adding category. Please try again.', 'Error', {
          positionClass: 'toast-top-right' 
        });
       
      }
    );
  }
}
