import { Component, OnInit } from '@angular/core';
import { Stock } from '../model/stock';
import { StocksService } from '../service.service';
import { Observable } from '../../../node_modules/rxjs';
import { Router } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  list: Observable<Array<Stock>>;
  text: string = '';
  bStock: Stock;
  calcRatio(l: Stock) {
    return ((l.currentPrice - l.openPrice) / l.openPrice)
  }
  butStock(bStock: Stock) {
    this.router.navigate(['/', 'Action', bStock.sName, bStock.currentPrice, 0, true])
  }
  constructor(private stockDataService: StocksService, private router: Router) {
    this.list = stockDataService.stocks$;
    stockDataService.stocks$.subscribe(data => {
      this.text = ''
      data.forEach(element => {
        if (element)
          this.text += '  STOCK NAME: ' + element.sName + ' ' + 'OPEN PRICE: ' + element.openPrice + '  ' + 'CURRENT PRICE: ' + element.currentPrice + ' || ';
      });
    })
  }

  ngOnInit() {
  }

}
