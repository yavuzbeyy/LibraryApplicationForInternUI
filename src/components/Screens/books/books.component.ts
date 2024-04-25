import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // NgbModal'ı ekleyin
import { DataService } from '../../Shared/services/DataService';
import { AuthService } from '../Auth/AuthService';
import { Router } from '@angular/router';
import { BookDetailsModalComponent } from './book-details-modal/book-details-modal.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  isAdmin: boolean = false;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
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
        } else {
          console.error('Error fetching books: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  openBookDetailsModal(book: any) {
    const modalRef = this.modalService.open(BookDetailsModalComponent, { centered: true });
    modalRef.componentInstance.book = book;
    console.log(book)
  }

  loadBookImages() {
    this.books.forEach(book => {
      this.dataService.fetchImages(book.filekey).subscribe(
        (imageBlob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            const imageDataUrl = reader.result as string;
            book.imageUrl = imageDataUrl;
          };
          reader.readAsDataURL(imageBlob);
        },
        (error) => {
          console.error(`Error loading image for book ${book.id}:`, error);
        }
      );
    });
  }

  goToUpdateBook(bookId: number) {
    this.router.navigate(['/update-book', bookId]);
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
