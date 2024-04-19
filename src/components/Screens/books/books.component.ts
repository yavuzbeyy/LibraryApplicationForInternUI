import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';

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
          // Örnek olarak bir değişken ataması
          this.degisken = this.books[0]; // Örnek olarak ikinci kitabı alıyoruz
          
          console.log(data); // Tüm veriyi görmek için
          console.log("sınıfa atanmış data :", this.books); // Atanmış kitapları görmek için
          console.log("degisken :", this.degisken); // Örnek değişkeni görmek için
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
