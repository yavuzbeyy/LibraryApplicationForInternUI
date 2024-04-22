import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from '../../Screens/books/books.component';
import { DataService } from '../services/DataService';
import { AuthorComponent } from '../../Screens/author/author.component';
import { CategoryComponent } from '../../Screens/category/category.component';
import { AddCategoryComponent } from '../../Screens/admin/add-category/add-category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAuthorComponent } from '../../Screens/admin/add-author/add-author.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorComponent,
    CategoryComponent,
    AddCategoryComponent,
    AddAuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right' // Sağ üst köşe konumu
    }),
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration(),
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
