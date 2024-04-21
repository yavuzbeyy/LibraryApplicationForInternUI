import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApi = "https://localhost:7107/";

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any[]> {
    const apiUrl = this.baseApi + 'api/Book/ListAll';
    return this.http.get<any[]>(apiUrl);
  }

  fetchBookImage(bookId: number): Observable<Blob> {
    const imageUrl = `${this.baseApi}file/GetImageByBookId?bookId=${bookId}`;
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  fetchAuthors(): Observable<any[]> {
    const url = `${this.baseApi}api/Author/ListAll`;
    return this.http.get<any[]>(url);
  }

  fetchCategories(): Observable<any[]> {
    const url = `${this.baseApi}api/Category/ListAll`;
    return this.http.get<any[]>(url);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const url = `${this.baseApi}api/Category/Delete?id=${categoryId}`;
    return this.http.delete(url);
  }

  deleteAuthor(authorId: number): Observable<any> {
    const url = `${this.baseApi}api/Author/Delete?id=${authorId}`;
    return this.http.delete(url);
  }

  deleteBook(bookId: number): Observable<any> {
    const url = `${this.baseApi}api/Book/Delete?id=${bookId}`;
    return this.http.delete(url);
  }
}
