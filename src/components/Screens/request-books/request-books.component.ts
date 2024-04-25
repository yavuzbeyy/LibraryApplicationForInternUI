import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

interface BookRequest {
  id: number;
  createdDate: string;
  bookId: number; 
  userId: number;
  requestDate: string;
  returnDate: string;
  isApproved: boolean;
  bookTitle?: string; 
  userName?: string; 
}

@Component({
  selector: 'app-request-books',
  templateUrl: './request-books.component.html',
  styleUrls: ['./request-books.component.scss'],
  providers: [DatePipe]
})
export class RequestBooksComponent implements OnInit {
  bookRequests: BookRequest[] = []; 

  constructor(private dataService: DataService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchBookRequests();
  }

  fetchBookRequests(): void {
    this.dataService.fetchBookRequests().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.bookRequests = data.data.map((request: any) => ({
            id: request.id,
            createdDate: this.formatDate(request.createdDate),
            bookId: request.bookId,
            userId: request.userId,
            requestDate: this.formatDate(request.requestDate),
            returnDate: this.formatDate(request.returnDate),
            isApproved: request.isApproved
          }));

          this.bookRequests.forEach((request: BookRequest) => {
            this.fetchBookById(request.bookId).subscribe((bookData: any) => {
              if (bookData && bookData.data && bookData.data.length > 0) {
                request.bookTitle = bookData.data[0].title; 
              }
            });

            this.fetchUserById(request.userId).subscribe((userData: any) => {
              if (userData && userData.data && userData.data.length > 0) {
              //  request.userName = userData.data[0].name + ' ' + userData.data[0].surname; 
              request.userName = userData.data[0].username; 
              }
            });
          });
        }
      },
      (error) => {
        console.error('Error fetching book requests:', error);
      }
    );
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(new Date(dateString), 'dd/MM/yyyy') || ''; 
  }

  fetchBookById(bookId: number): Observable<any> {
    return this.dataService.getBookById(bookId);
  }

  fetchUserById(userId: number): Observable<any> {
    return this.dataService.getUserById(userId);
  }

  deleteRequest(requestId: number): void {
    this.dataService.deleteRequest(requestId).subscribe(
      (response) => {
        this.bookRequests = this.bookRequests.filter((request) => request.id !== requestId);
        this.dataService.showSuccessMessage(response);
      },
      (error) => {
        console.error('Error deleting request:', error);
        this.dataService.showFailMessage(error);
      }
    );
  }

}
