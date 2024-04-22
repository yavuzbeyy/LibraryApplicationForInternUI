import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];
  selectedCategoryId: number | null = null;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.dataService.fetchCategories().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.categories = data.data;
          console.log(this.categories); // Gelen kategori verileri
        } else {
          console.error('Error fetching categories: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  deleteCategory(categoryId: number) {
    this.dataService.deleteCategory(categoryId).subscribe(
      (response) => {
        console.log('Category deleted successfully.');
        this.categories = this.categories.filter(c => c.id !== categoryId);
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

  showCategoryBooks(categoryId: number) {
    this.selectedCategoryId = categoryId; // Seçilen kategori ID'sini ayarla
  }
}
