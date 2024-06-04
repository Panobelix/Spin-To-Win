import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Bet } from '../table/table.component';
import { WebSocketService } from '../web-socket.service'; // Assurez-vous d'importer le service WebSocket

@Component({
  selector: 'app-playout',
  templateUrl: './playout.component.html',
  styleUrls: ['./playout.component.css']
})
export class PlayoutComponent implements OnInit {
  
  playerInfo: any;
  pageCharger: number = 1;
  pedro: boolean = false;
  oldCredit: number | undefined;
  tableauparie: Bet[] | undefined; // Utilisation de l'interface Bet
  private reloaderSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public reloader$: Observable<number> = this.reloaderSubject.asObservable();
  subscription: any;

  // Variables pour stocker les données WebSocket
  randomNumber: number | undefined;
  salonNumber: number | undefined;
  etatPartie: number | undefined;

  constructor(private webSocketService: WebSocketService) {} // Injection du service WebSocket

  updateReloader(num: number): void {
    this.reloaderSubject.next(num);
  }

  ngOnInit(){
    this.subscription = this.webSocketService.connect().subscribe((data: any) => {
      console.log('WebSocket message received:', data);
      // Stocker les données WebSocket dans les variables appropriées en fonction de leur nom
      this.randomNumber = data.NbAlea;
      this.salonNumber = data.salonId;
      this.etatPartie = data.etatPartie;
    });
  }
}
