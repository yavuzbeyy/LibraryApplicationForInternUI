import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'] // 'styleUrls' olarak düzeltilmiş
  
})
export class BooksComponent implements OnInit {
  books: any[] = []; // Kitapların tutulacağı dizi
  degisken: any; // Örnek bir değişken

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
}
