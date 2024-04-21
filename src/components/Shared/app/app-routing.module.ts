import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from '../../Screens/books/books.component';
import { AuthorComponent } from '../../Screens/author/author.component';
import { CategoryComponent } from '../../Screens/category/category.component';
import { AdminComponent } from '../../Screens/admin/admin.component';
import { LoginComponent } from '../../Screens/login/login.component';
import { RegisterComponent } from '../../Screens/register/register.component';

const routes: Routes = [
 
  { path: 'book', component: BooksComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
