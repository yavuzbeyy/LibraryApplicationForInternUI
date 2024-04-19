import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from '../components/Screens/books/books.component';
import { AuthorComponent } from '../components/Screens/author/author.component';
import { CategoryComponent } from '../components/Screens/category/category.component';
import { AdminComponent } from '../components/Screens/admin/admin.component';
import { LoginComponent } from '../components/Screens/login/login.component';
import { RegisterComponent } from '../components/Screens/register/register.component';

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
