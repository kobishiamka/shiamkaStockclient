
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Stock, protfolio, history } from './model/stock';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  // static buyStockViaServer(arg0: any): any {
  //   throw new Error("Method not implemented.");
  // }


  stocks: Array<Stock>;
  stocks$: BehaviorSubject<Array<Stock>> = new BehaviorSubject<Array<Stock>>([]);
  stocksProtfolio$: BehaviorSubject<Array<protfolio>> = new BehaviorSubject<Array<protfolio>>([]);

  stocksInPortfolio: Array<protfolio>;
  stocksInPortfolio$: BehaviorSubject<Array<protfolio>> = new BehaviorSubject<Array<protfolio>>([]);

  stocksHistory: Array<history>;
  stocksHistory$: BehaviorSubject<Array<history>> = new BehaviorSubject<Array<history>>([]);

  private getAllStocksFromServer(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>("http://localhost:3001/stock")
  }

  getProtfolioFromServer(): Observable<Array<protfolio>> {
    return this.http.get<Array<protfolio>>("http://localhost:3001/protfolio");
  }

  getHistoryFromServer(): Observable<Array<history>> {
    return this.http.get<Array<history>>("http://localhost:3001/history");
  }



  buyStockViaServer(sName, quantity, currentPrice, log) {
    const url = "http://localhost:3001/buy/?format=json";
    const tempJson = { sName: sName, quantity: quantity, currentPrice: currentPrice, log: log }
    let result = this.http.post<any>(url, JSON.stringify(tempJson)).toPromise().then(() => {
      this.getHistoryFromServer().subscribe(x => {
        this.stocksHistory = x
        this.stocksHistory$.next(x)
      })
    })
    return result
  }

  sellStockViaServer(sName, quantity, currentPrice, log) {
    const url = "http://localhost:3001/sell/?format=json";
    const tempJson = { sName: sName, quantity: quantity, currentPrice: currentPrice, log: log }
    let result = this.http.post<any>(url, JSON.stringify(tempJson)).toPromise().then(() => {
      this.getHistoryFromServer().subscribe(x => {
        this.stocksHistory = x
        this.stocksHistory$.next(x)
      })
    })
    return result
  }
  constructor(private http: HttpClient, private socket: Socket) {
    this.getAllStocksFromServer();
    this.socket.fromEvent("price-update").subscribe((data: Stock[]) => {

      this.stocks = data;
      this.stocks$.next(data);
    })

    this.socket.fromEvent("protfolio-update").subscribe((data: protfolio[]) => {

      this.stocksInPortfolio = data;
      this.stocksInPortfolio$.next(data);
    })

    this.socket.fromEvent("history-update").subscribe((data: history[]) => {

      this.stocksHistory = data;
      this.stocksHistory$.next(data);
    })

    this.getHistoryFromServer().subscribe(x => {
      this.stocksHistory = x;
      this.stocksHistory$.next(x);
    })
    this.getAllStocksFromServer().subscribe(x => {
      this.stocks = x;
      this.stocks$.next(x);

    });

    this.getProtfolioFromServer().subscribe(x => {
      this.stocksInPortfolio = x;
      this.stocksInPortfolio$.next(x);

    });
  }
}