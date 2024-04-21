import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from '../../Screens/books/books.component';
import { DataService } from '../services/DataService';
import { AuthorComponent } from '../../Screens/author/author.component';
import { CategoryComponent } from '../../Screens/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    provideClientHydration(),
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
