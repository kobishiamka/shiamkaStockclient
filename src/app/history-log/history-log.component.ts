import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { history } from '../model/stock';
import { ServiceActionService } from '../service-action.service';

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.css']
})
export class ShistoryLogComponent implements OnInit {

  list: Observable<Array<history>>;
  constructor(private stockDataService: ServiceActionService) { 
    this.list = stockDataService.stocksHistory$
  }
  ngOnInit() {
  }

}
