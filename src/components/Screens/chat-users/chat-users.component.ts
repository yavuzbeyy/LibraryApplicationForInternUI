import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../../Shared/services/DataService';
import { AppComponent } from '../../Shared/app/app.component';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  users: any[] = [];
  adminSentToHim : string = '';

  constructor(private dataService: DataService,public appComponent:AppComponent) { }

  ngOnInit(): void {
    this.dataService.getAllUser().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.users = data.data;
        }
      },
      error => {
        console.error('Kullanıcı bilgilerini alma hatası:', error);
      }
    );
  }

  selectedUser(selectedUser: string) {
    console.log("selected user : " , selectedUser)
  }


}
