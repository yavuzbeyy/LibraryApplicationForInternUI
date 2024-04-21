import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from '../../Screens/books/books.component';
import { AuthorComponent } from '../../Screens/author/author.component';
import { CategoryComponent } from '../../Screens/category/category.component';
import { LoginComponent } from '../../Screens/login/login.component';
import { RegisterComponent } from '../../Screens/register/register.component';
import { AddAuthorComponent } from '../../Screens/admin/add-author/add-author.component';
import { AddBookComponent } from '../../Screens/admin/add-book/add-book.component';
import { AddCategoryComponent } from '../../Screens/admin/add-category/add-category.component';

const routes: Routes = [
 
  { path: 'book', component: BooksComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'add-author', component: AddAuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
