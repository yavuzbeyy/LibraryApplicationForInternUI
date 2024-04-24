import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../Shared/services/DataService';
import { UpdateCategoryModel } from '../../../Shared/Models/UpdateCategoryModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  categoryId!: number;
  category: UpdateCategoryModel = new UpdateCategoryModel();

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      if (this.categoryId) {
        this.loadCategoryDetails();
      }
    });
  }

  loadCategoryDetails() {
    this.dataService.getCategoryById(this.categoryId).subscribe(
      (data: any) => {
        console.log(data)
        if (data && Array.isArray(data.data)) {
          const categoryData = data.data[0]; 
          this.category.id = categoryData.id;
          this.category.name = categoryData.name;
          this.category.description = categoryData.description;
        } else {
          console.error('Category details not found.');
        }
      },
      (error) => {
        console.error('Error fetching category details:', error);
        //this.toastr.error('Error fetching category details.');
      }
    );
  }

  updateCategory() {
    this.dataService.updateCategory(this.category).subscribe(
      (response) => {
        this.dataService.showSuccessMessage(response);
      },
      (error) => {
        console.error('Error updating category:', error);
        this.dataService.showFailMessage(error);
      }
    );
  }
}
