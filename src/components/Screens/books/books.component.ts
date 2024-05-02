import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // NgbModal'ı ekleyin
import { DataService } from '../../Shared/services/DataService';
import { AuthService } from '../Auth/AuthService';
import { Router } from '@angular/router';
import { BookDetailsModalComponent } from './book-details-modal/book-details-modal.component';
import { AlertService } from '../../Shared/Alert/alert.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  isAdmin: boolean = false;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router, private modalService: NgbModal,private alertService: AlertService) 
  {
    console.log("book kurucusunda girisYaptimi : " , this.authService.userIsLogin())
   }

  ngOnInit() {

    const token = localStorage.getItem('token');
  
    if (token) {
      this.isAdmin = this.authService.isAdmin(token);
      console.log("book sayfası için : ", this.authService.userIsLogin())
    
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
    this.alertService.acceptOrDecline('Kitabı Sil', 'Bu kitabı silmek istediğinizden emin misiniz?', 'warning')
      .then((result) => {
        if (result) {
          // Kullanıcı işlemi onayladıysa kitabı sil
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
        } else {
          console.log('Kitap silme işlemi iptal edildi.');
        }
      });
  }
}


