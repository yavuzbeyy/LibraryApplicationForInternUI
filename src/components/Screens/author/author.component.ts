import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authors: any[] = [];
  selectedAuthorId: number | null = null;

  constructor(private dataService: DataService,private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    this.dataService.fetchAuthors().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.authors = data.data;
        } else {
          console.error('Error fetching authors: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }

  deleteAuthor(authorId: number) {
    this.dataService.deleteAuthor(authorId).subscribe(
      (response) => {
        this.authors = this.authors.filter(a => a.id !== authorId);
        this.fetchAuthors();
        this.dataService.showSuccessMessage(response);
      },
      (error) => {
        this.dataService.showFailMessage(error);
      }
    );
  }

  showAuthorBooks(authorId: number) {
    this.selectedAuthorId = authorId; 
  }

}
