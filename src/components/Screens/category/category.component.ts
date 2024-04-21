import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any[] = [];

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
}
