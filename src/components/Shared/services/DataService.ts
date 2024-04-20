import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class DataService {

  
  private baseApiUrl = 'https://localhost:7107/api/Book/ListAll';
  private baseGetImageUrl = 'https://localhost:7107/file/GetImageByBookId?bookId';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseApiUrl);
  }

  fetchBookImage(bookId: number): Observable<Blob> {
    const url = `${this.baseGetImageUrl}=${bookId}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
