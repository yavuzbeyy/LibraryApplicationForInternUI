import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../Shared/services/DataService';
import { BookModel } from '../../../Shared/Models/BookModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  book: BookModel = new BookModel();
  authors: any[] = [];
  categories: any[] = [];

  constructor(private dataService: DataService, private toastr: ToastrService) {}

  ngOnInit() {
    this.fetchAuthors();
    this.fetchCategories();
  }

  fetchAuthors() {
    this.dataService.fetchAuthors().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.authors = data.data;
        } else {
          console.error('Error fetching authors: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }
  fetchCategories() {
    this.dataService.fetchCategories().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.categories = data.data;
        } else {
          console.error('Error fetching categories: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  submitForm() {
    const selectedAuthor = this.authors.find((author) => author.name === this.book.authorName);
    const selectedCategory = this.categories.find((category) => category.name === this.book.categoryName);

    if (selectedAuthor && selectedCategory) {
      this.book.authorId = selectedAuthor.id;
      this.book.categoryId = selectedCategory.id;

      this.dataService.createBook(this.book).subscribe(
        (response) => {
          this.toastr.success(response.message, 'Success');
        },
        (error) => {
          this.toastr.error(error.message, 'Error');
        }
      );
    } else {
      this.toastr.error('Invalid author or category selected.', 'Error');
    }
  }
}
