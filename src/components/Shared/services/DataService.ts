import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../Models/CategoryModel';
import { AuthorModel } from '../Models/AuthorModel';
import { BookModel } from '../Models/BookModel';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseApi = "https://localhost:7107/";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseApi}api/User/Login`;
    return this.http.post<any>(url, { username, password });
  }
  
    // fetch requestlerim
  fetchData(): Observable<any[]> {
    const apiUrl = this.baseApi + 'api/Book/ListAll';
    return this.http.get<any[]>(apiUrl);
  }

  fetchImages(filekey: string): Observable<Blob> {
    const imageUrl = `${this.baseApi}file/GetImageByFotokey?filekey=${filekey}`;
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

  // Delete Requestlerim
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
    // add requestler
    createCategory(category: CategoryModel): Observable<any> {
      const url = `${this.baseApi}api/Category/Create`;
      return this.http.post(url, category);
    }

    createAuthor(author: AuthorModel): Observable<any> {
      const url = `${this.baseApi}api/Author/Create`;
      return this.http.post(url, author);
    }

    createBook(book: BookModel): Observable<any> {
      const url = `${this.baseApi}api/Book/Create`;
      return this.http.post(url, book);
    }

    fetchBooksByCategoryId(categoryId: number): Observable<any[]> {
      const apiUrl = `${this.baseApi}api/Book/ListBooksByCategoryId?categoryId=${categoryId}`;
      return this.http.get<any[]>(apiUrl);
    }

    fetchBooksByAuthorId(authorId: number): Observable<any[]> {
      const apiUrl = `${this.baseApi}api/Book/ListBooksByAuthorId?authorId=${authorId}`;
      return this.http.get<any[]>(apiUrl);
    }

    uploadImage(file: File): Observable<any> {
      const url = `${this.baseApi}file/Upload`;
      const formData = new FormData();
      formData.append('imageFile', file);
  
      const options = {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };
  
      return this.http.post(url, formData, options);
    }
}
