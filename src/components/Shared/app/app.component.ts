import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../Screens/Auth/AuthService';
import { HubConnection, HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public Editor: any; 
  username: string = '';
  decodedToken: any = null; 
  role: number | null = null;
  isAdmin: boolean = false;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private hubConnection: HubConnection
  ) 
  {
    this.startSignalRConnection(); // buradan kaynaklı giriş yapmış kullanıcının çıkış yapma butonlarını vs.görüyor orayı düzelt
  }

  ngOnInit(): void {
    
    if (this.authService.username){
      this.startSignalRConnection();
    }

    const token = localStorage.getItem('token');
    if (token) {
      this.authService.login();
      this.decodeToken(token);
      this.isAdmin = this.authService.isAdmin(token);
    } else {
      console.log('Token not found');
      this.router.navigate(['/login']);
    }
  }

  startSignalRConnection() {
    const connectionOptions = {
      withUrl: 'http://localhost:5062/connectServerHub',
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    };

  
    const startConnection = () => {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(connectionOptions.withUrl, { ...connectionOptions })
        .build();
  
      this.hubConnection.start()
        .then(() => {
          console.log("SignalR Bağlantısı Kuruldu");
          this.hubConnection.invoke("BroadcastMessageToAllClient", "Merhabalar !");
          this.hubConnection.invoke("sendWelcomeMessage");
        })
        .then(() => {
          console.log("Mesaj sunucuya gönderildi.");
        })
        .catch(error => {
          console.error("Error while establishing connection or invoking method:", error);
          setTimeout(startConnection, 5000); 
        });
  
     this.hubConnection.on("ReceiveMesasgesForAllClients", (message) => {
        console.log("Gelen Mesaj : " + message);
        this.showReceivedMessage(message);
      })
      this.hubConnection.on("WelcomeMessage", (message) => {
        console.log("Hoşgeldin Mesajı : " + message);
        this.showReceivedMessage(message);
      })
      this.hubConnection.on("MessageSentFromClient", (message) => {
        console.log("Hoşgeldin Mesajı : " + message);
        this.showReceivedMessage(message);
      })
    };
    startConnection(); 
  }


  // startSignalRConnection() {
  //   const connectionOptions = {
  //     withUrl: 'http://localhost:5062/connectServerHub',
  //     skipNegotiation: true,
  //     transport: HttpTransportType.WebSockets
  //   };

  
  //   const startConnection = () => {
  //     this.hubConnection = new HubConnectionBuilder()
  //       .withUrl(connectionOptions.withUrl, { ...connectionOptions })
  //       .build();
  
  //     this.hubConnection.start()
  //       .then(() => {
  //         console.log("SignalR Bağlantısı Kuruldu");
  //         this.hubConnection.invoke("BroadcastMessageToAllClient", "Merhabalar !");
  //         this.hubConnection.invoke("sendWelcomeMessage");
  //       })
  //       .then(() => {
  //         console.log("Mesaj sunucuya gönderildi.");
  //       })
  //       .catch(error => {
  //         console.error("Error while establishing connection or invoking method:", error);
  //         setTimeout(startConnection, 5000); 
  //       });
  
  //    this.hubConnection.on("ReceiveMesasgesForAllClients", (message) => {
  //       console.log("Gelen Mesaj : " + message);
  //       this.showReceivedMessage(message);
  //     })
  //     this.hubConnection.on("WelcomeMessage", (message) => {
  //       console.log("Hoşgeldin Mesajı : " + message);
  //       this.showReceivedMessage(message);
  //     })
  //     this.hubConnection.on("MessageSentFromClient", (message) => {
  //       console.log("Hoşgeldin Mesajı : " + message);
  //       this.showReceivedMessage(message);
  //     })
  //   };
  //   startConnection(); 
  // }

  showReceivedMessage(message: string): void {
    const chatElement = document.getElementById('liveChatMessages');
    if (chatElement) {
      const chatMessageElement = document.createElement('div');
      chatMessageElement.classList.add('chat-message', 'p-3');
      chatMessageElement.innerHTML = `
        <img src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30">
        <div class="message-content">${message}</div>`;
      chatElement.appendChild(chatMessageElement);
    }
  }

  sendChatMessage(message: string): void {
    const chatElement = document.getElementById('liveChatMessages');
    if (chatElement) {
      console.log("Kullanıcıdan Gelen Mesaj : ",message)
      const chatMessageElement = document.createElement('div');
      chatMessageElement.classList.add('chat-message', 'p-3');
      chatMessageElement.innerHTML = `
        <img src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png" width="30" height="30">
        <div class="message-content">${message}</div>`;
      chatElement.appendChild(chatMessageElement);
    }
  
    // SignalR üzerinden mesajı gönder
    this.hubConnection.invoke("SendChatMessage", message)
      .then(() => {
        console.log("Mesaj gönderildi:", message);
      })
      .catch(error => {
        console.error("Error while sending message:", error);
      });
  }
  

  decodeToken(token: string): void {
    try {
      this.decodedToken = jwtDecode(token);
      this.username = this.decodedToken.username;
      this.role = this.decodedToken.roles;
      this.router.navigate(['/book']);
    } catch (error) {
      console.error('Error decoding token:', error);
      this.router.navigate(['/login']);
    }

    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
