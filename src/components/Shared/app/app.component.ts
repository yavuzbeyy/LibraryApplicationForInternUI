import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../Screens/Auth/AuthService';
import { HubConnection, HubConnectionBuilder,HttpTransportType } from '@microsoft/signalr';
import { addAbortSignal } from 'stream';
import { setDataInElement } from '@ckeditor/ckeditor5-utils';
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public Editor: any; 
  username: string | null = null;
  decodedToken: any = null; 
  role: number | null = null;
  isAdmin: boolean = false;


  constructor(
    private router: Router,
    private authService: AuthService,
    private hubConnection: HubConnection
  ) 
  {
    this.startSignalRConnection();
  /* this.hubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:5062/connectServerHub',{
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets
    }) 
    .build();

 
     this.hubConnection.start()
    .then(() =>
     //  console.log('SignalR bağlantısı başarılı !')
    this.hubConnection.invoke("BroadcastMessageToAllClient","helloWorld")
  )
    .catch(err => console.error('Error while establishing connection: ' + err)); */
  }

  ngOnInit(): void {
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
          this.hubConnection.invoke("BroadcastMessageToAllClient", "Selam");
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
      })
      this.hubConnection.on("WelcomeMessage", (message) => {
        console.log("Hoşgeldin Mesajı : " + message);
      })
    };
  
    startConnection(); 
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
