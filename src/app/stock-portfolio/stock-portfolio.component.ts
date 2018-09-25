import { Component, OnInit } from '@angular/core';
import { protfolio, Stock } from '../model/stock';
import { StocksService } from '../service.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-stock-portfolio',
  templateUrl: './stock-portfolio.component.html',
  styleUrls: ['./stock-portfolio.component.css']
})
export class StockPortfolioComponent implements OnInit {

  sStock: protfolio ;
  list: Array<protfolio>=[];
  
  sellStock(sStock: protfolio){
    this.router.navigate(['/','Action',sStock.sName,sStock.currentPrice,sStock.quantity ,false])
  }
  
  constructor(private stockDataService: StocksService, private router:Router) { 
    stockDataService.stocksInPortfolio$.subscribe(data=>{
      this.list=data;
    })
    this.stockDataService.getProtfolioFromServer().subscribe(data=>{
      this.list=data;
    })
  }

  ngOnInit() {
  }

}
