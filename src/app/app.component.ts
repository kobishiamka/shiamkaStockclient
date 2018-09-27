import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';
import { StocksService } from './service.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'period';
    arr = [
    {value: '1000', viewValue: 'PERIOD_S1'},
    {value: '3000', viewValue: 'PERIOD_S3'},
    {value: '5000', viewValue: 'PERIOD_S5'},
    {value: '7000', viewValue: 'PERIOD_S7'},
    {value: '10000', viewValue: 'PERIOD_S10'}
  ];

  constructor( private router: Router ,private stockDataService: StocksService ,private socket:Socket){

  }
  goToHistory(){
    this.router.navigate(['/','History']);
    }
  goToProtfolio(){
    this.router.navigate(['/','Protfolio']);
  }
   onClick(newInte) {
    this.socket.emit('change-interval',newInte)
   }

}
