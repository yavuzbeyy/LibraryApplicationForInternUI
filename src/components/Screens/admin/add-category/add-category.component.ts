import { Component } from '@angular/core';
import { DataService } from '../../../Shared/services/DataService';
import { CategoryModel } from '../../../Shared/Models/CategoryModel';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  category: CategoryModel = new CategoryModel();

  constructor(private dataService: DataService) {}

  submitForm() {
    this.dataService.createCategory(this.category).subscribe(
      (response) => {
        this.dataService.showSuccessMessage(response);
      },
      (error) => {
        this.dataService.showFailMessage(error);     
      }
    );
  }
}
