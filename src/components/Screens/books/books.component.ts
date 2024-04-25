import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { NgModule } from '@angular/core';
import { AuthService } from '../Auth/AuthService';
import { Router } from '@angular/router';
/*import ClassicEditor from '@ckeditor/ckeditor5-build-classic'


const editorPlaceholder = document.querySelector( '#editor' ) as HTMLElement;

ClassicEditor.create( editorPlaceholder ).catch( error => {
    console.error( error );
} );*/

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'] 
  
})
export class BooksComponent implements OnInit {
  books: any[] = []; 
  degisken: any; 
  isAdmin : boolean = false;

  constructor(private dataService: DataService,private authService: AuthService,private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){ 
      this.isAdmin = this.authService.isAdmin(token);
    }
    this.fetchBooks();
  }

  fetchBooks() {
    this.dataService.fetchData().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          
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

  goToUpdateBook(bookId: number) {
    this.router.navigate(['/update-book', bookId]); // Router üzerinden yönlendirme
  }

  loadBookImages() {
    this.books.forEach(book => {
      this.dataService.fetchImages(book.filekey).subscribe(
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
        this.dataService.showSuccessMessage(response);
      },
      (error) => {
        this.dataService.showFailMessage(error);
      }
    );
  }

}
