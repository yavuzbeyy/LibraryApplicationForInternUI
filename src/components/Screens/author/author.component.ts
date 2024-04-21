import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  authors: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.fetchAuthors();
  }

  fetchAuthors() {
    this.dataService.fetchAuthors().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.authors = data.data;
          console.log(this.authors); // Gelen yazar verileri
        } else {
          console.error('Error fetching authors: Invalid data format');
        }
      },
      (error) => {
        console.error('Error fetching authors:', error);
      }
    );
  }
}
