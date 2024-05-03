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
  groups: any[] = []; // Grupları tutacak değişken
  adminSentToHim : string = '';

  constructor(private dataService: DataService, public appComponent:AppComponent) { }

  ngOnInit(): void {
    this.groupApiRequest()
  }

  // Grupları yükleme işlevi
  loadGroups() {
    this.dataService.getAllGroups().subscribe(
      (data: any) => {
        if (data && data.data && Array.isArray(data.data)) {
          this.groups = data.data;
          console.log(this.groups)
        }
      },
      error => {
        console.error('Grup bilgilerini alma hatası:', error);
      }
    );
  }

  // Yeni grup ekleme işlevi
  addNewGroup() {
    const groupName = prompt("Yeni grup adını girin:");
    if (groupName) {
      this.dataService.createGroup(groupName).subscribe(
        (response: any) => {
          this.loadGroups(); // Gruplar yeniden yüklensin
          console.log('Yeni grup oluşturuldu:', response);
        },
        error => {
          console.error('Yeni grup oluşturma hatası:', error);
        }
      );
    }
  }

  // Grup silme işlevi
  deleteGroup(groupId: number) {
    if (confirm("Bu grubu silmek istediğinizden emin misiniz?")) {
      this.dataService.deleteGroupRequest(groupId).subscribe(
        (response: any) => {
          this.loadGroups(); // Gruplar yeniden yüklensin
          console.log('Grup silindi:', response);
        },
        error => {
          console.error('Grup silme hatası:', error);
        }
      );
    }
  }

  selectedUser(selectedUser: string) {
    console.log("selected user : " , selectedUser)
  }

  addUserToGroup(groupId: number) {
    const username = prompt("Kullanıcı adını girin:");
    if (username) {
      this.dataService.addUserToGroup(username, groupId).subscribe(
        (response: any) => {
          console.log('Kullanıcı gruba eklendi:', response);
          // İşlem başarılı ise grupları yeniden yükleyebiliriz
          this.loadGroups();
        },
        error => {
          console.error('Kullanıcı ekleme hatası:', error);
        }
      );
    }
  }

  groupApiRequest(){
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
    this.loadGroups(); 
  }
  
}
