import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'] 
  
})
export class BooksComponent implements OnInit {
  books: any[] = []; 
  degisken: any; 

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.dataService.fetchData().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          
          // API'den gelen veriyi 'books' dizisine atama
          this.books = data.data;
          this.loadBookImages();
          console.log(this.books);
        } else {
          console.error('Error fetching books: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  loadBookImages() {
    this.books.forEach(book => {
      this.dataService.fetchBookImage(book.id).subscribe(
        (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            const imageDataUrl = reader.result as string;
            book.imageUrl = imageDataUrl; 
            console.log("Books : " + this.books)
          };
          reader.readAsDataURL(imageBlob);
        },
        (error) => {
          console.error(`Error loading image for book ${book.id}:`, error);
        }
      );
    });
  }

  deleteBook(bookId: number) {
    this.dataService.deleteBook(bookId).subscribe(
      (response) => {
        this.books = this.books.filter(b => b.id !== bookId);
        this.fetchBooks();
      },
      (error) => {
        console.error('Error deleting category:', error);
      }
    );
  }

}
